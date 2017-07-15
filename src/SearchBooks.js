import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'

const SearchBooks = (props) => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link className="close-search" to="/">Close</Link>
      <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author"/>
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid">
          {props.books.map((book) => (
            <li key={book.title}>
              <Book book={book} bookshelfs={props.bookshelfs} onChangeShelf={props.onChangeShelf} />
            </li>
          ))}
      </ol>
    </div>
  </div>
)

export default SearchBooks