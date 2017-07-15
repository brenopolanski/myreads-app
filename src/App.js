import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks.js'

class BooksApp extends React.Component {
  state = {
    books: [],
    bookshelfs: [
      {
        key: "currentlyReading",
        title: "Currently Reading"
      },
      {
        key: "wantToRead",
        title: "Want to Read"
      },
      {
        key: "read",
        title: "Read"
      }
    ]
  }
  componentDidMount() {
    this.getBooks()
  }
  getBooks() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }
  updateBook(book, shelf) {
    if (shelf !== book.shelf) {
      BooksAPI.update(book, shelf)
      book.shelf = shelf
      this.setState(book)
    }
  }
  searchBook(query) {
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks 
            bookshelfs={this.state.bookshelfs}
            books={this.state.books}
            onChangeShelf={(book, shelf) => this.updateBook(book, shelf)} />
        )}/>

        <Route exact path="/" render={() => (
          <ListBooks 
            bookshelfs={this.state.bookshelfs}
            books={this.state.books}
            onChangeShelf={(book, shelf) => this.updateBook(book, shelf)}
          />
        )}/>
      </div>
    )
  }
}
export default BooksApp