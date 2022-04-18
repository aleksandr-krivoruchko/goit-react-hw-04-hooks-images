import PropTypes from 'prop-types';

import { ButtonStyle } from './ButtonStyle.styled';

export function Button({ onClick }) {
  return (
    <ButtonStyle type="button" onClick={onClick}>
      Загрузить еще
    </ButtonStyle>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
