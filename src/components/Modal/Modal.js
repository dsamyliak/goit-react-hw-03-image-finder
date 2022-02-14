import React from "react";
import "./Modal.css";

const Modal = (altimage, largeimageurl) => {
  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={largeimageurl} alt={altimage} />
      </div>
    </div>
  );
};

export default Modal;
