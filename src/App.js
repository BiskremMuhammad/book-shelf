import React from "react";
import { Route } from "react-router";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import { Search } from "./components/search";
import { NotFound } from "./pages/404";
import { Home } from "./pages/home";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search} />
        <Route exact path="/" component={Home} />
        <Route path="/" component={NotFound} />
      </div>
    );
  }
}

export default BooksApp;
