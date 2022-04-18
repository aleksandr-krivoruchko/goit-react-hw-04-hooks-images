import { Component } from 'react';
import PropTypes from 'prop-types';

import { GalleryItem, Image } from './ImageGalleryItemStyle.styled';
import { Modal } from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  static propTypes = {
    minSrc: PropTypes.string.isRequired,
    maxSrc: PropTypes.string.isRequired,
    alt: PropTypes.string,
  };

  state = {
    isOpenModal: false,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.closeModalOnEsc);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModalOnEsc);
  }

  openModal = () => {
    this.setState({ isOpenModal: true });
  };

  closeModal = e => {
    if (e.target.nodeName !== 'IMG') {
      this.setState({ isOpenModal: false });
    }
  };

  closeModalOnEsc = e => {
    if (e.code === 'Escape') {
      this.setState({ isOpenModal: false });
    }
  };

  render() {
    const { minSrc, maxSrc, alt } = this.props;
    const { isOpenModal } = this.state;

    return (
      <>
        <GalleryItem onClick={this.openModal}>
          <Image src={minSrc} alt={alt} />
        </GalleryItem>
        {isOpenModal && (
          <Modal src={maxSrc} alt={alt} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
