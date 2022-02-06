import React from "react";
import "./Loader.css";
import { TailSpin } from "react-loader-spinner";

const Loader = ({ loaderShow: value }) => (
  <div className="LoaderItem">
    <TailSpin
      visible={value}
      heigth="60"
      width="50"
      color="#2c8fe0"
      ariaLabel="loading"
    ></TailSpin>
  </div>
);
export default Loader;
