import React from "react";
import "./ImageGallery.css";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import Loader from "../Loader";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
const axios = require("axios");

class ImageGallery extends React.Component {
  liKey = nanoid();

  state = {
    searchData: null,
    loading: false,
    error: null,
    page: 1,
  };

  loadMoreImages = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));

    console.log("Button+1");
  };

  componentDidUpdate(prevProps, prevState) {
    const oldSearch = prevProps.searchQuery;
    const newSearch = this.props.searchQuery;

    if (oldSearch !== newSearch) {
      console.log("prevProps searchQueryInfo", prevProps.searchQuery);
      console.log("this.props searchQueryInfo", this.props.searchQuery);

      this.setState({ loading: true });
      fetch(
        `https://pixabay.com/api/?q=${newSearch}&page=${this.state.page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`No images with ${newSearch}`));
        })
        .then((searchData) => this.setState({ searchData }))
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    return (
      <>
        {this.state.loading && <Loader loading={this.state.loading} />}
        <ul className="ImageGallery">
          {this.state.searchData && (
            <ImageGalleryItem searchData={this.state.searchData.hits} />
          )}
        </ul>

        {this.state.searchData && <Button onClick={this.loadMoreImages} />}
        {this.state.error && toast.error(`${this.error.message}`)}
      </>
    );
  }
}

export default ImageGallery;
