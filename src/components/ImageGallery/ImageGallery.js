import React from "react";
import "./ImageGallery.css";
import ImageGalleryItem from "../ImageGalleryItem";
import PropTypes from "prop-types";

const ImageGallery = () => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem />
    </ul>
  );
};

export default ImageGallery;
