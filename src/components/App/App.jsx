import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Scroll from 'react-scroll';
import { FcCancel } from 'react-icons/fc';

import { Searchbar } from '../SearchBar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../LoadMore/Button';
import { fetchImages } from '../services/fetch';
import { Icon } from './App.styled';

import { Title } from '../Loader/LoaderStyle.styled';

const PER_PAGE = 12;

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  let limit = useRef(null);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    setStatus('pending');

    fetchImages(searchValue, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          setStatus('resolved');
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

        if (page === 1) {
          toast.success(`По вашему запросу найдено ${totalHits} изображений`);
        }

        setPictures(state => [...state, ...images]);

        limit.current = totalHits - page * PER_PAGE + PER_PAGE;

        if (limit.current < PER_PAGE && page !== 1) {
          toast.success(`Это последняя страница галереи`);
        }

        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, searchValue]);

  const handleSubmit = value => {
    setSearchValue(value);
    setPage(1);
    setPictures([]);
  };

  const handleBtnLoadMore = () => {
    setPage(state => state + 1);

    const scroll = Scroll.animateScroll;
    scroll.scrollToBottom({ duration: 2000 });
  };

  return (
    <>
      <ToastContainer position="top-left" autoClose={3000} />
      <Searchbar onSubmit={handleSubmit} />

      {status === 'idle' && <Title>Введите запрос в поле поиска</Title>}

      {status === 'pending' && (
        <>
          <ImageGallery pictures={pictures} />
          <Loader />
        </>
      )}

      {status === 'resolved' && (
        <>
          {pictures.length !== 0 ? (
            <ImageGallery pictures={pictures} />
          ) : (
            <h1 style={{ textAlign: 'center' }}>
              По вашему запросу ничего не найдено
            </h1>
          )}
          {limit.current > PER_PAGE ? (
            <Button onClick={handleBtnLoadMore} />
          ) : (
            <Icon>
              <FcCancel size="200px" />
            </Icon>
          )}
        </>
      )}

      {status === 'rejected' && <Title>{error.message}</Title>}
    </>
  );
}
