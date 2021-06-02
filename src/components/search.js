import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Book } from "./book";
import * as BooksAPI from "../BooksAPI";

export const Search = (props) => {
  const [term, setTerm] = useState("");
  const [books, setBooks] = useState([]);

  const onChangeTerm = async (ev) => {
    const val = ev.target.value;
    setTerm(val);
    if (!val || !val.length) {
      setBooks([]);
      return;
    }
    const books = await BooksAPI.search(val);
    setBooks(books);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={term}
            onChange={onChangeTerm}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((b, i) => (
            <Book
              key={i}
              id={b.id}
              poster={b.imageLinks.thumbnail}
              title={b.title}
              authors={b.authors && b.authors.length ? b.authors : []}
              shelf={b.shelf ? b.shelf : "None"}
              options={props.shelves}
              changeShelf={props.changeShelf}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

Search.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeShelf: PropTypes.func.isRequired,
};
