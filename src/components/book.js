import React, { useState } from "react";
import PropTypes from "prop-types";

export const Book = (props) => {
  const [shelf, setShelf] = useState(props.shelf);

  const onChangeShelf = (target) => {
    let val = target.value;
    setShelf(val);
    if (val.toLowerCase() === "none") {
      val = "";
    }
    val = val
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.substr(1))
      .join("");
    val = val.charAt(0).toLowerCase() + val.substr(1);
    props.changeShelf({ id: props.id }, val);
  };

  return (
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
          <select onChange={(e) => onChangeShelf(e.target)}>
            <option value="move" disabled>
              Move to...
            </option>
            {props.options.map((o, i) => (
              <option
                key={i}
                value={o}
                selected={
                  shelf.toLowerCase() === o.replace(/\s/gi, "").toLowerCase()
                }
              >
                {shelf.toLowerCase() === o.replace(/\s/gi, "").toLowerCase()
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
};

Book.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  poster: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeShelf: PropTypes.func.isRequired,
};
