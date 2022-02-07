import React from "react";
import "./Loader.css";
import { TailSpin } from "react-loader-spinner";

const Loader = ({ loading }) => (
  <div className="LoaderItem">
    <TailSpin
      visible={loading}
      heigth="60"
      width="50"
      color="#2c8fe0"
      ariaLabel="loading"
    ></TailSpin>
  </div>
);
export default Loader;
