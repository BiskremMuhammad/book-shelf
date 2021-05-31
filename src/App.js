import React from "react";
import { Route } from "react-router";
import "./App.css";
import { getAll } from "./BooksAPI";
import { Search } from "./components/search";
import { NotFound } from "./pages/404";
import { Home } from "./pages/home";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      shelves: ["Currently Reading", "Want to Read", "read", "None"],
    };
  }

  componentDidMount() {
    const fetchBooks = async () => {
      const books = await getAll();
      this.setState({ books });
    };

    fetchBooks();
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" component={Search} />
        <Route
          exact
          path="/"
          render={() => (
            <Home books={this.state.books} shelves={this.state.shelves} />
          )}
        />
        <Route path="/" component={NotFound} />
      </div>
    );
  }
}

export default BooksApp;
