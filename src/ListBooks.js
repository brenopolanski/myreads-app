import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import Bookshelf from './Bookshelf.js'

class ListBooks extends Component {
  render() {
    const {booksOnShelves, bookshelves, onChangeShelf} = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map((bookshelf) => (
              <Bookshelf 
                key={bookshelf.key}
                bookshelfTitle={bookshelf.title}
                bookshelves={bookshelves}
                booksOnShelves={booksOnShelves.filter(book => book.shelf === bookshelf.key)}
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

ListBooks.propTypes = {
  booksOnShelves: PropTypes.array.isRequired,
  bookshelves: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
}


export default ListBooks