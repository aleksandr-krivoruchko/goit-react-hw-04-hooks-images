export   const isLastPage = (currentPage, totalImages, numImgOnPage) => {
    const limit = totalImages - currentPage * numImgOnPage + numImgOnPage;
    return limit <= numImgOnPage ? true : false;
  }
