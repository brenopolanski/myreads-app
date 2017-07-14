import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks.js'

class BooksApp extends React.Component {
  state = {
    books: [
    ],
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
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(books)
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks />
        )}/>

        <Route exact path="/" render={() => (
          <ListBooks bookshelfs={this.state.bookshelfs} books={this.state.books} />
        )}/>
      </div>
    )
  }
}
export default BooksApp