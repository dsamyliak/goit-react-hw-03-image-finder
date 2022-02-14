import React from "react";
import "./ImageGallery.css";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ImageGallery = ({ children }) => {
  return (
    <>
      <ul className="ImageGallery">{children}</ul>
    </>
  );
};

export default ImageGallery;
