import React from "react";
import "./ImageGalleryItem.css";

const ImageGalleryItem = ({ imageData }) => {
  return (
    <>
      {imageData.map(({ webformatURL, id }) => (
        <li className="ImageGalleryItem" key={id}>
          <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;
