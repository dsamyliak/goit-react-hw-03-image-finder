import React from "react";
import "./App.css";
import { nanoid } from "nanoid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import propTypes from "prop-types";
import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
// const axios = require("axios");

export default class App extends React.Component {
  state = {
    searchQuery: "",
  };

  formSubmitHandler = (searchQuery) => {
    this.setState({ searchQuery });
  };

  // componentDidMount({ searchQuery, page, per_page } = this.state) {

  //   this.setState({ showLoader: true });
  //   let imagesData = [];

  //     axios.get(
  //       `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=${per_page}`
  //     )
  //       .then(function (response) {

  //         imagesData = response.data.hits;
  //         console.log(response);

  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       })

  //       .then(() => (

  //         this.setState({ imagesData: imagesData, showLoader: false })
  //         // always executed
  //       ));

  // };

  render() {
    console.log("App this.state", this.state);

    return (
      <div className="App">
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery searchQuery={this.state.searchQuery} />
        {/* <Button /> */}
        {/* <Modal /> */}
        {/* <Loader /> */}
        <ToastContainer autoClose={3000} theme={"light"} />
      </div>
    );
  }
}
