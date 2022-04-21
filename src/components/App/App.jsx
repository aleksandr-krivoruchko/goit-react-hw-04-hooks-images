import { useEffect, useRef, useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Scroll from 'react-scroll';
import { FcCancel } from 'react-icons/fc';

import { Searchbar } from '../SearchBar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { BtnLoadMore } from '../LoadMore/BtnLoadMore';
import { fetchImages } from '../services/fetch';
import { isLastPage } from "../services/isLastPage";

import { Icon } from './App.styled';
import { Title } from '../Loader/LoaderStyle.styled';

const PER_PAGE = 12;

function reducer(state, action) {
  switch (action.type) {
    case 'status':
      return { ...state, status: action.payload }
        
      case 'addPictures':
      return { ...state, pictures: [...state.pictures, ...action.payload] }
    
      case 'pageIncrement':
      return { ...state, page: state.page + action.payload }

      case 'resetState':
      return { ...state, page: 1, pictures: [], searchValue: action.payload}

          case 'error':
      return { ...state, error: action.payload }
  
    default:
throw new Error(`Неподдерживаемый тип действия ${action.type}`)}
}

export function App() {
  const [state, dispatch] = useReducer(reducer, {
    searchValue: "",
    pictures: [],
    error: null,
    status: 'idle',
    page: 1,
  })

  let lastPage = useRef(null);

  useEffect(() => {
    if (!state.searchValue) {
      return;
    }
    dispatch({type:"status", payload:"pending"})

    fetchImages(state.searchValue, state.page)
      .then(({ hits, totalHits }) => {

        if (hits.length === 0) {
    dispatch({type:"status", payload:"rejected"})
          return;
        }
        const images = hits.map(
          ({ id, webformatURL, largeImageURL, tags, totalHits }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
            totalHits,
          })
        );

        if (state.page === 1) {
          toast.success(`По вашему запросу найдено ${totalHits} изображений`);
        }
        lastPage.current = isLastPage(state.page, totalHits, PER_PAGE);

        if (lastPage.current && state.page !== 1) {
          toast.success(`Это последняя страница галереи`);
        }
    dispatch({type:"addPictures", payload:images})
    dispatch({type:"status", payload:"resolved"})
      })
      .catch(error => {
    dispatch({type:"error", payload:error})
    dispatch({type:"status", payload:"rejected"})
      });
  }, [state.page, state.searchValue]);

  const handleSubmit = value => {
    dispatch({type:"resetState", payload:value})
  };

  const handleBtnLoadMore = () => {
    dispatch({ type: "pageIncrement", payload: 1 });
    const scroll = Scroll.animateScroll;
    scroll.scrollToBottom({ duration: 2000 });
  };

  return (
    <>
      <ToastContainer position="top-left" autoClose={3000} />
      <Searchbar onSubmit={handleSubmit} />

      {state.status === 'idle' && <Title>Введите запрос в поле поиска</Title>}

        {state.status === 'pending' && (
        <>
          <ImageGallery pictures={state.pictures} />
          <Loader />
        </>
      )}

      {state.status === 'resolved' && (
        <>
           <ImageGallery pictures={state.pictures} />
          {lastPage.current
            ? <Icon><h3>КОНЕЦ</h3>
              <FcCancel size="100px" />
              <h3>СПИСКА</h3>
              </Icon>
            : 
            <BtnLoadMore onClick={handleBtnLoadMore} />
          }
        </>
      )}  

      {state.status === 'rejected' && <Title>По вашему запросу ничего не найдено</Title>}
    </>
  );
}
