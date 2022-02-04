import React from "react";
import "./Loader.css";
import { TailSpin } from "react-loader-spinner";

const Loader = () => (
  <div className="loaderItem">
    <TailSpin
      heigth="100"
      width="80"
      color="#f06819"
      ariaLabel="loading"
    ></TailSpin>
  </div>
);
export default Loader;
