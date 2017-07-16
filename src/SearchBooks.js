import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import Book from './Book.js'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {
  state = {
    searchedBooks: []
  }
  constructor() {
  	super()
  	this.searchCount = 0
  }
  addSearchedBooks(books) {
  	this.setState({ searchedBooks: books })
  }
  removeSearchedBooks() {
  	this.setState({ searchedBooks: [] })
  }
  searchBooks(query) {
  	this.searchCount++
  	const mySearchCount = this.searchCount
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
      	if (mySearchCount === this.searchCount) {
      		const searchResultsNotEmpty = books.constructor === Array
      		if (searchResultsNotEmpty)
      			this.addSearchedBooks(books)
      		else this.removeSearchedBooks()
      	}
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
    const {booksOnShelves, bookshelves, onAddBookOnShelves} = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
            	type="text"
            	placeholder="Search by title or author"
            	onChange={(e) => this.searchBooks(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {this.state.searchedBooks.map((bookSearched) => (
                <li key={bookSearched.id}>
                  <Book 
                    book={bookSearched}
                    bookshelves={bookshelves}
                    onChangeShelf={onAddBookOnShelves}
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
	onAddBookOnShelves: PropTypes.func.isRequired
}

export default SearchBooks