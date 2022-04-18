import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalStyle } from './Modal.styled';

export const Modal = ({ src, alt, closeModal }) => {
  return ReactDOM.createPortal(
    <Overlay class="overlay" onClick={closeModal}>
      <ModalStyle class="modal">
        <img src={src} alt={alt} />
      </ModalStyle>
    </Overlay>,

    document.getElementById('popup-root')
  );
};

Modal.propTypes = {
 
      closeModal: PropTypes.func.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }

