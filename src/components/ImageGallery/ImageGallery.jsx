import PropTypes from 'prop-types';

import { ImageGalleryStyle } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ pictures }) {
  return (
    <ImageGalleryStyle>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          minSrc={webformatURL}
          maxSrc={largeImageURL}
          alt={tags}
        />
      ))}
    </ImageGalleryStyle>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ),
};
