import { useState } from 'react';
import PropTypes from 'prop-types';

import { GalleryItem, Image } from './ImageGalleryItemStyle.styled';
import { Modal } from '../Modal/Modal';

export function ImageGalleryItem({ minSrc, maxSrc, alt }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = e => {
    if (e.target.nodeName !== 'IMG') {
      setIsOpenModal(false);
    }
  };

  const closeModalOnEsc = e => {
    if (e.code === 'Escape') {
      setIsOpenModal(false);
    }
  };

  return (
    <>
      <GalleryItem onClick={() => setIsOpenModal(true)}>
        <Image src={minSrc} alt={alt} />
      </GalleryItem>
      {isOpenModal && (
        <Modal
          src={maxSrc}
          alt={alt}
          closeModal={closeModal}
          closeModalOnEsc={closeModalOnEsc}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  minSrc: PropTypes.string.isRequired,
  maxSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
