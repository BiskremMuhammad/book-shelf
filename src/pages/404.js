import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="not-found">
    <h3>404</h3>
    <div>
      <p>Seems like you're lost. Please check your url.</p>
      <p>
        <Link to="/">Go to Homepage</Link>
      </p>
    </div>
  </div>
);
