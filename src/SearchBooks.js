import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { Debounce } from 'react-throttle'
import Book from './Book.js'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {
  state = {
    searchedBooks: []
  }
  addSearchedBooks(books) {
  	this.setState({ searchedBooks: books })
  }
  removeSearchedBooks() {
  	this.setState({ searchedBooks: [] })
  }
  searchBooks(query) {
  	const mySearchCount = this.searchCount
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
      	const searchResultsNotEmpty = books.constructor === Array
      	searchResultsNotEmpty ? this.addSearchedBooks(books) : this.removeSearchedBooks()
      })
	  }
    else this.removeSearchedBooks()
  }
  getBookShelf(booksOnShelves, bookSearched) {
    const bookOnShelf = booksOnShelves.filter((bookOnShelf) => (
    	bookOnShelf.id === bookSearched.id
  	))[0]
    if (bookOnShelf) 
      return bookOnShelf.shelf
    return "none"
  }
  render() {
    const {booksOnShelves, bookshelves, onChangeShelf} = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="100" handler="onChange">
            	<input 
            		type="text"
            		placeholder="Search by title or author"
            		onChange={(e) => this.searchBooks(e.target.value)}
            	/>
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {this.state.searchedBooks.map((bookSearched) => (
                <li key={bookSearched.id}>
                  <Book 
                    book={bookSearched}
                    bookshelves={bookshelves}
                    onChangeShelf={onChangeShelf}
                    bookshelf={this.getBookShelf(booksOnShelves, bookSearched)}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
	booksOnShelves: PropTypes.array.isRequired,
	bookshelves: PropTypes.array.isRequired,
	onChangeShelf: PropTypes.func.isRequired
}

export default SearchBooks