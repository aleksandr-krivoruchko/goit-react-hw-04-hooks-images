import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Scroll from 'react-scroll';

import { Searchbar } from './SearchBar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './LoadMore/Button';

import { Title } from './Loader/LoaderStyle.styled';

const API_KEY = '25188312-8cdfcf53729040d6ed9110eb8';
const URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

export class App extends Component {
  state = {
    searchValue: '',
    pictures: [],
    error: null,
    status: 'idle',
    page: 1,
    totalHits: 0,
  };

  fetchImages = ({ searchValue, page } = this.state) => {
    return fetch(
      `${URL}?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Нет результатов поиска по запросу ${searchValue}`)
      );
    });
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    const isSearchValueChanged = prevState.searchValue !== searchValue;
    const isPageChanged = prevState.page !== page;

    if (isSearchValueChanged || isPageChanged) {
      this.setState({ status: 'pending' });

      this.fetchImages()
        .then(({ hits, totalHits }) => {
          if (hits.length !== 0) {
            const pictures = hits.map(
              ({ id, webformatURL, largeImageURL, tags, totalHits }) => ({
                id,
                webformatURL,
                largeImageURL,
                tags,
                totalHits,
              })
            );

            if (isSearchValueChanged) {
              this.setState({
                pictures,
                totalHits,
                status: 'resolved',
              });
            }
            if (isPageChanged) {
              this.setState(prevState => ({
                pictures: [...prevState.pictures, ...pictures],
                status: 'resolved',
              }));
            }
          } else {
            this.setState({ pictures: [], status: 'resolved' });
            toast.error(`Нет результатов поиска по запросу ${searchValue}`);
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleBtnLoadMore = () => {
    this.setState(prev => {
      return { page: prev.page + 1 };
    });

    const scroll = Scroll.animateScroll;
    scroll.scrollToBottom({ duration: 2500 });
  };

  handleFormSubmit = value => {
    this.setState({ searchValue: value });
  };

  render() {
    const { pictures, error, status, page, totalHits } = this.state;
    const limit = totalHits - page * PER_PAGE + PER_PAGE;

    if (status === 'idle' || pictures.length === 0) {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Title>Введите запрос в поле поиска</Title>
          <ToastContainer position="top-left" autoClose={3000} />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery pictures={pictures} />
          <Loader />
        </>
      );
    }
    if (status === 'rejected') {
      return <Title>{error.message}</Title>;
    }
    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery pictures={pictures} />
          {limit > PER_PAGE && <Button onClick={this.handleBtnLoadMore} />}
          <ToastContainer position="top-left" autoClose={3000} />
        </>
      );
    }
  }
}
