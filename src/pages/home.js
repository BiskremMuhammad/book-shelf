import React from "react";
import PropTypes from "prop-types";
import { Book } from "../components/book";
import { Link } from "react-router-dom";

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
                        id={b.id}
                        poster={b.imageLinks.thumbnail}
                        title={b.title}
                        authors={b.authors}
                        shelf={b.shelf}
                        options={props.shelves}
                        changeShelf={props.changeShelf}
                      />
                    ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

Home.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeShelf: PropTypes.func.isRequired,
};
