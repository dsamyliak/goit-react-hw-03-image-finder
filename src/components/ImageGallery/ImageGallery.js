import React from "react";
import "./ImageGallery.css";
import propTypes from "prop-types";

const ImageGallery = ({ children }) => {
  return (
    <>
      <ul className="ImageGallery">{children}</ul>
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  children: propTypes.element,
};
