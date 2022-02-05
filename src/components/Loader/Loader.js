import React from "react";
import "./Loader.css";
import { TailSpin } from "react-loader-spinner";

const Loader = () => (
  <div className="loaderItem">
    <TailSpin
      heigth="50"
      width="40"
      color="#f06819"
      ariaLabel="loading"
    ></TailSpin>
  </div>
);
export default Loader;
