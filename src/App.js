import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import { getAll, update } from "./BooksAPI";
import { Search } from "./components/search";
import { NotFound } from "./pages/404";
import { Home } from "./pages/home";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      shelves: ["Currently Reading", "Want to Read", "Read", "None"],
    };

    // ........bind
    this.changeBookShelf = this.changeBookShelf.bind(this);
  }

  componentDidMount() {
    const fetchBooks = async () => {
      const books = await getAll();
      this.setState({ books });
    };

    fetchBooks();
  }

  async changeBookShelf(book, shelf) {
    await update(book, shelf);
    const books = await getAll();
    this.setState({ books });
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <Search
                shelves={this.state.shelves}
                userBooks={this.state.books}
                changeShelf={this.changeBookShelf}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <Home
                books={this.state.books}
                shelves={this.state.shelves}
                changeShelf={this.changeBookShelf}
              />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
