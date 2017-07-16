import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks.js'

class BooksApp extends React.Component {
  state = {
    booksOnShelves: [],
  }
  constructor() {
    super()
    this.bookshelves = [
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
    BooksAPI.getAll().then((books) => this.setState({ booksOnShelves: books }))
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
      booksOnShelves: state.booksOnShelves.concat([ book ])
    }))
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks 
            bookshelves={this.bookshelves}
            booksOnShelves={this.state.booksOnShelves}
            onAddBookOnShelves={(book, shelf) => this.addNewBookOnShelf(book, shelf)} />
        )}/>

        <Route exact path="/" render={() => (
          <ListBooks 
            bookshelves={this.bookshelves}
            booksOnShelves={this.state.booksOnShelves}
            onChangeShelf={(book, shelf) => this.updateShelfbook(book, shelf)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp