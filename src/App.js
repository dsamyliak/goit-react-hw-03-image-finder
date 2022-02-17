import React from "react";
import "./App.css";

import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
// const axios = require("axios");
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import propTypes from "prop-types";

export default class App extends React.Component {
  state = {
    searchQuery: "",
    imageData: [],
    page: 1,
    error: null,
    id: "",
    webformatURL: "",
    largeImageURL: "",
    showModal: false,
  };

  componentDidMount() {
    console.log("App DidMount");

    window.addEventListener("keydown", this.handleAltSpaceDown);
  }

  componentWillUnmount() {
    console.log("App WillUnMount");
    window.removeEventListener("keydown", this.handleAltSpaceDown);
  }

  handleAltSpaceDown = (e) => {
    console.log("keydown e.code ", e.code);

    if (this.state.searchQuery !== "") {
      if (e.altKey && e.code === "Space") {
        console.log("MetaLeft pressed");
        this.loadMoreImages();
      }
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

  formSubmitHandler = (searchQuery) => {
    console.log("formSubmitHandler");

    if (this.state.searchQuery === searchQuery) {
      toast.error("You enter the same word!!! Enter new one!!!", {
        theme: "colored",
        position: "top-center",
      });
      this.reset();
    }

    this.setState({
      searchQuery: searchQuery,
      page: 1,
      imageData: [],
      error: null,
      showModal: false,
    });
  };

  fetchArray = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => {
        if (response.ok) {
          // console.log("response.json()", response);
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
        toast.error(`${error}`, {
          theme: "colored",
          position: "top-center",
        });
      })
      .finally(() => {
        this.lastImagesInDB();

        this.setState({ loading: false });
      });
  };

  loadMoreImages = () => {
    this.fetchArray();
    console.log("BUTTON+1 ", this.state.page);
  };

  toggleModal = (e) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  imgInfo = (e) => {
    // console.log("e.currentTarget", e.currentTarget);
    // console.log("e.target", e.target);

    const altImg = e.currentTarget.getAttribute("alt");
    const largeImg = e.currentTarget.getAttribute("largeimageurl");

    this.setState({
      largeImageURL: largeImg,
      alt: altImg,
    });
  };

  lastImagesInDB = () => {
    const arrL = this.state.arrayLength;

    if (arrL !== 12) {
      toast.info("No more images in DataBase!!!", {
        theme: "colored",
        icon: "🚀",
        position: "top-center",
      });
      console.log("this.lastImagesInDB");
      return;
    }
  };

  reset = () => {
    this.setState({
      imageData: [],
      page: 1,
      searchQuery: "",
      error: null,
      // id: "",
      // webformatURL: "",
      // largeImageURL: "",
    });
  };

  render() {
    console.log("App this.state", this.state);
    const { showModal, largeImageURL, alt, imageData, loading, arrayLength } =
      this.state;

    return (
      <div className="App">
        {showModal && (
          <Modal showModal={this.toggleModal}>
            <img src={largeImageURL} alt={alt} />
          </Modal>
        )}

        <Searchbar onSubmit={this.formSubmitHandler} />

        {imageData && (
          <ImageGallery>
            <ImageGalleryItem
              imageData={imageData}
              showModal={this.toggleModal}
              imgInfo={this.imgInfo}
            ></ImageGalleryItem>
          </ImageGallery>
        )}

        {loading && <Loader loading={loading} />}

        {imageData && arrayLength === 12 && (
          <Button onClick={this.loadMoreImages} />
        )}

        <ToastContainer
          autoClose={3000}
          theme="colored"
          position="top-center"
          icon="🚀"
        />
      </div>
    );
  }
}

App.propTypes = {
  state: propTypes.shape({
    searchQuery: propTypes.string,
    imageData: propTypes.array,
    error: propTypes.bool,
    id: propTypes.string,
    webformatURL: propTypes.string,
    largeImageURL: propTypes.string,
    showModal: propTypes.bool,
  }),
};
