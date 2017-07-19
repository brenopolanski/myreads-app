import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks.js'

const bookshelves = [
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

class App extends React.Component {
  state = {
    booksOnShelves: [],
  }
  componentDidMount() {
    this.getAllBooks()
  }
  getAllBooks() {
    BooksAPI.getAll().then((books) => this.setState({ booksOnShelves: books }))
  }
  onChangeShelf(book, shelf) {
    const bookOnShelf = this.state.booksOnShelves.filter((myBook) => (
      myBook.id === book.id
    ))[0]
    if (bookOnShelf)
      this.updateShelfbook(bookOnShelf, shelf)
    else
      this.addNewBookOnShelf(book, shelf)
  }
  updateShelfbook(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(book)  
    })
  }
  addNewBookOnShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        booksOnShelves: state.booksOnShelves.concat([ book ])
      }))
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks 
            bookshelves={bookshelves}
            booksOnShelves={this.state.booksOnShelves}
            onChangeShelf={(book, shelf) => this.onChangeShelf(book, shelf)} />
        )}/>

        <Route exact path="/" render={() => (
          <ListBooks 
            bookshelves={bookshelves}
            booksOnShelves={this.state.booksOnShelves}
            onChangeShelf={(book, shelf) => this.onChangeShelf(book, shelf)}
          />
        )}/>
      </div>
    )
  }
}

export default App