import React from "react";
import "./ImageGalleryItem.css";

const ImageGalleryItem = ({ imageData, openModal }) => {
  return (
    <>
      {imageData.map(({ webformatURL, id, tags, largeImageURL }) => (
        <li className="ImageGalleryItem" key={id}>
          <img
            src={webformatURL}
            alt={tags}
            imagelargelink={largeImageURL}
            className="ImageGalleryItem-image"
            onClick={openModal}
          />
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;
