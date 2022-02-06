import React from "react";
import "./App.css";
import { nanoid } from "nanoid";
import propTypes from "prop-types";
import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
const axios = require("axios");

export default class App extends React.Component {
  state = {
    imagesData: [],
    showLoader: false,
    searchQuery: "car",
    page: 1,
    key: "3705719-850a353db1ffe60c326d386e6",
    per_page: 12,
  };

  formSubmitHandler = (newQuery) => {
    this.setState({ searchQuery: newQuery });
  };

  async componentDidMount({ searchQuery, page, key, per_page } = this.state) {
    this.setState({ showLoader: true });
    let imagesData = [];
    await axios
      .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${per_page}`
      )
      .then(function (response) {
        console.log("response.data.hits", response.data.hits);
        imagesData = response.data.hits;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    console.log("imagesData", imagesData);

    this.setState({ imagesData: imagesData, showLoader: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.setState({ showLoader: true });
    }

    console.log("this.state = ", this.state);
    console.log("prevState = ", prevState);
  }

  render() {
    console.log(this.state);

    return (
      <div className="App">
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery />
        <Button />
        {/* <Modal /> */}
        <Loader loaderShow={this.state.showLoader} />
      </div>
    );
  }
}
