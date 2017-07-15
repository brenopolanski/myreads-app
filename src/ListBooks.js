import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf.js'

class ListBooks extends Component {
  render() {
    const {books, bookshelfs, onChangeShelf} = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelfs.map((bookshelf) => (
              <Bookshelf 
                key={bookshelf.key}
                bookshelfTitle={bookshelf.title}
                bookshelfs={bookshelfs}
                books={books.filter(book => book.shelf === bookshelf.key)}
                onChangeShelf={onChangeShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks