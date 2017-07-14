import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks.js'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks />
        )}/>

        <Route exact path="/" render={() => (
          <ListBooks />
        )}/>
      </div>
    )
  }
}
export default BooksApp