import React from "react";
import "./App.css";
import { nanoid } from "nanoid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import propTypes from "prop-types";
import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
// const axios = require("axios");

export default class App extends React.Component {
  state = {
    id: "",
    webformatURL: "",
    largeImageURL: "",
  };

  formSubmitHandler = (searchQuery, page) => {
    console.log("formSubmitHandler");
    this.setState({ searchQuery });
    this.setState({ page: 1 });
    this.setState(this.fetchArray(searchQuery, page));
  };

  fetchArray = (searchQuery, page) => {
    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`No images with ${"newSearch"}`));
      })
      .then((data) => {
        this.setState({ imageData: data.hits });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  loadMoreImages = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));

    console.log("Button+1");
  };

  render() {
    console.log("App this.state", this.state);

    return (
      <div className="App">
        <Searchbar onSubmit={this.formSubmitHandler} />

        {this.state.imageData && (
          <ImageGallery>
            <ImageGalleryItem
              imageData={this.state.imageData}
            ></ImageGalleryItem>
          </ImageGallery>
        )}
        {this.state.imageData && <Button onClick={this.loadMoreImages} />}
        {/* <Modal /> */}
        {/* <Loader /> */}
        <ToastContainer autoClose={3000} theme={"light"} />
      </div>
    );
  }
}
