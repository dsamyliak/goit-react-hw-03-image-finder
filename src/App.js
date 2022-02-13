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
import { toast } from "react-toastify";

export default class App extends React.Component {
  state = {
    imageData: [],
    page: 1,
    // id: "",
    // webformatURL: "",
    // largeImageURL: "",
  };

  formSubmitHandler = (searchQuery) => {
    console.log("formSubmitHandler");

    if (this.state.searchQuery === searchQuery) {
      toast.error("You enter the same word!!! Enter new one!!!");
      this.reset();
    }

    this.setState({ searchQuery: searchQuery, page: 1, imageData: [] });
  };

  fetchArray = () => {
    const { searchQuery, page } = this.state;

    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => {
        {
          this.setState({ loading: true });
        }

        if (response.ok) {
          console.log("response.json()", response);
          return response.json();
        }

        return Promise.reject(new Error(`No images with ${"newSearch"}`));
      })
      .then((data) => {
        this.setState((prevState) => ({
          imageData: [...prevState.imageData, ...data.hits],
          fetchData: data,
          arrayLength: data.hits.length,
          page: prevState.page + 1,
        }));

        // console.log(data);
      })
      .catch((error) => {
        this.setState({ error });
        toast.error(`${error}`);
      })
      .finally(() => {
        this.lastImagesInDB();
        setTimeout(() => {
          this.setState({ loading: false });
        }, 300);
      });
  };

  loadMoreImages = (searchQuery, page) => {
    this.fetchArray();
    console.log("---BUTTON+1 - this.state.page", this.state.page);
  };

  lastImagesInDB = () => {
    const arrL = this.state.arrayLength;

    console.log("this.lastImagesInDB");
    if (arrL !== 12) {
      toast.warning("No more images in DataBase!!!");
      return;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("COMPONENT DIDUPDATE");

    const oldQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;

    if (oldQuery !== newQuery) {
      console.clear();
      this.fetchArray();
    }
  }

  reset = () => {
    this.setState({
      imageData: [],
      page: 1,
      searchQuery: "",
      // id: "",
      // webformatURL: "",
      // largeImageURL: "",
    });
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

        {this.state.loading && <Loader loading={this.state.loading} />}

        {this.state.imageData && this.state.arrayLength === 12 && (
          <Button onClick={this.loadMoreImages} />
        )}

        {this.state.page && (
          <p style={{ textAlign: "center" }}>{this.state.page}</p>
        )}

        {/* <Modal /> */}

        <ToastContainer autoClose={3000} theme={"light"} />
      </div>
    );
  }
}
