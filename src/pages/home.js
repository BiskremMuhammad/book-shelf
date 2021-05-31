import React from "react";
import PropTypes from "prop-types";
import { Book } from "../components/book";

export const Home = (props) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {props.shelves.map((shelf, i) => (
            <div className="bookshelf" key={i}>
              <h2 className="bookshelf-title">{shelf}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {props.books
                    .filter(
                      (b) =>
                        b.shelf.toLowerCase() ===
                        shelf.replace(/\s/gi, "").toLowerCase()
                    )
                    .map((b, i) => (
                      <Book
                        key={i}
                        poster={b.imageLinks.thumbnail}
                        title={b.title}
                        authors={b.authors}
                        shelf={b.shelf}
                        options={props.shelves}
                      />
                    ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="open-search">
        <button onClick={() => this.setState({ showSearchPage: true })}>
          Add a book
        </button>
      </div>
    </div>
  );
};

Home.prototype = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.string).isRequired,
};
