import { VscSearch } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import {
  SearchbarStyle,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './SearchbarStyle.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchValue: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchValue.trim() === '') {
      toast.warn('Введите корректный запрос!');
      return;
    }
    this.props.onSubmit(this.state.searchValue);
  };

  handleChange = e => {
    const { value } = e.currentTarget;

    this.setState({
      searchValue: value.toLowerCase(),
    });
  };

  render() {
    return (
      <SearchbarStyle>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <VscSearch size="20" />
          </SearchFormBtn>

          <SearchFormInput
            value={this.state.searchValue}
            onChange={this.handleChange}
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
}
