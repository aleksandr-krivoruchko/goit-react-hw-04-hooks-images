import { useState } from 'react';
import PropTypes from 'prop-types';

import { VscSearch } from 'react-icons/vsc';
import { toast } from 'react-toastify';

import {
  SearchbarStyle,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './SearchbarStyle.styled';

export function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (searchValue.trim() === '') {
      toast.warn('Введите корректный запрос!');
      return;
    }
    onSubmit(searchValue);
  }

  function handleChange(e) {
    const { value } = e.currentTarget;

    setSearchValue(value.toLowerCase());
  }
  return (
    <SearchbarStyle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <VscSearch size="20" />
        </SearchFormBtn>

        <SearchFormInput
          value={searchValue}
          onChange={handleChange}
          class="input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="поле поиска изображений и фотографий"
        />
      </SearchForm>
    </SearchbarStyle>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
