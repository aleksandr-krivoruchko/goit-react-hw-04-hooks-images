import PropTypes from 'prop-types';

import { ButtonStyle } from './ButtonStyle.styled';

export function BtnLoadMore({ onClick }) {
  return (
    <ButtonStyle type="button" onClick={onClick}>
      Загрузить еще
    </ButtonStyle>
  );
}

BtnLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};
