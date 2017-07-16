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
    this.getAllBooks()
  }
  getAllBooks() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }
  updateShelfbook(book, shelf) {
    BooksAPI.update(book, shelf)
    book.shelf = shelf
    this.setState(book)
  }
  addNewBookOnShelf(book, shelf) {
    BooksAPI.update(book, shelf)
    book.shelf = shelf
    this.setState(state => ({
      books: state.books.concat([ book ])
    }))
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks 
            bookshelfs={this.state.bookshelfs}
            booksOnShelf={this.state.books}
            onAddBookOnShelves={(book, shelf) => this.addNewBookOnShelf(book, shelf)} />
        )}/>

        <Route exact path="/" render={() => (
          <ListBooks 
            bookshelfs={this.state.bookshelfs}
            books={this.state.books}
            onChangeShelf={(book, shelf) => this.updateShelfbook(book, shelf)}
          />
        )}/>
      </div>
    )
  }
}
export default BooksApp