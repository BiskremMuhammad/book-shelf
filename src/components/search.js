import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Book } from "./book";
import * as BooksAPI from "../BooksAPI";

export const Search = (props) => {
  const [term, setTerm] = useState("");
  const [books, setBooks] = useState([]);
  const input = useRef(null);

  useEffect(() => {
    input.current.focus();
  }, []);

  const search = async (term) => {
    const books = await BooksAPI.search(term);
    setBooks(!!books && books.length && term !== "" ? books : []);
  };
  const onChangeTerm = (ev) => {
    const val = ev.target.value;
    setTerm(val);
    if (!val || !val.length) {
      setBooks([]);
      return;
    }
    search(val);
  };

  const renderedBooks = !!books && books.length && term !== "" ? books : [];

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            ref={input}
            placeholder="Search by title or author"
            value={term}
            onChange={onChangeTerm}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {!!renderedBooks &&
            renderedBooks.map((b, i) => (
              <Book
                key={i}
                id={b.id}
                poster={b.imageLinks ? b.imageLinks.thumbnail : ""}
                title={b.title}
                authors={b.authors && b.authors.length ? b.authors : []}
                shelf={
                  b.shelf
                    ? b.shelf
                    : props.userBooks &&
                      props.userBooks.find((book) => book.id === b.id)
                    ? props.userBooks.find((book) => book.id === b.id).shelf
                    : "None"
                }
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
  userBooks: PropTypes.array.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeShelf: PropTypes.func.isRequired,
};
