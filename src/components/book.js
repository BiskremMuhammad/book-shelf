import React from "react";
import PropTypes from "prop-types";

export const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${props.poster}")`,
        }}
      />
      <div className="book-shelf-changer">
        <select>
          <option value="move" disabled>
            Move to...
          </option>
          {props.options.map((o, i) => (
            <option
              key={i}
              value={o}
              selected={
                props.shelf.toLowerCase() ===
                o.replace(/\s/gi, "").toLowerCase()
              }
            >
              {props.shelf.toLowerCase() === o.replace(/\s/gi, "").toLowerCase()
                ? "✓\xA0\xA0\xA0"
                : "\xA0\xA0\xA0\xA0\xA0"}
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="book-title">{props.title}</div>
    {props.authors.map((a, i) => (
      <div className="book-authors" key={i}>
        {a}
      </div>
    ))}
  </div>
);

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  poster: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
