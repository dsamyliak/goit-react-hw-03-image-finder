import React from "react";
import "./Searchbar.css";
import { nanoid } from "nanoid";
import propTypes from "prop-types";

class Searchbar extends React.Component {
  searchQueryId = nanoid();

  state = {
    searchQuery: "",
  };

  handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    console.log(this.state);

    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({
      searchQuery: "",
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <label htmlFor={this.searchQueryId}>
            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Cat, Architecture"
              required
              id={this.searchQueryId}
              name="searchQuery"
              value={this.state.searchQuery}
              onChange={this.handleInputChange}
              placeholder="Search images and photos"
            />
          </label>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  state: propTypes.shape({
    searchQuery: propTypes.string.isRequired,
  }),
};

export default Searchbar;
