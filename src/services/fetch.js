import axios from 'axios';

const API_KEY = '25188312-8cdfcf53729040d6ed9110eb8';
const URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;


export function fetchImages(searchValue, page) {
  return  axios.get(`${URL}?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`).then(res => res.data)
}

