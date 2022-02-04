import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import { Audio } from 'react-loader-spinner';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "./components/Loader";

class App extends React.Component {
  state = {};

  render() {
    return <Loader />;
  }
}

export default App;
