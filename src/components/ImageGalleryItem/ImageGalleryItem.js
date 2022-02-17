import React from "react";
import "./ImageGalleryItem.css";
import { nanoid } from "nanoid";
import propTypes from "prop-types";

const ImageGalleryItem = ({ imageData, showModal, imgInfo }) => {
  return (
    <>
      {imageData.map(({ webformatURL, tags, largeImageURL }) => (
        <li
          className="ImageGalleryItem"
          key={nanoid()}
          id={nanoid()}
          onClick={showModal}
        >
          <img
            src={webformatURL}
            alt={tags}
            largeimageurl={largeImageURL}
            className="ImageGalleryItem-image"
            onClick={imgInfo}
          />
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  imageData: propTypes.array,
  showModal: propTypes.func,
  imgInfo: propTypes.func,
};
