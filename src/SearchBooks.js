import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {
  state = {
    searchedBooks: []
  }
  componentDidMount() {
  	this.searchCount = 0
  }
  searchBooks(query) {
  	this.searchCount++
  	const mySearchCount = this.searchCount
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
      	if (mySearchCount === this.searchCount) {
      		if (books.constructor === Array)
      			this.setState({ searchedBooks: books })
      		else this.setState({ searchedBooks: [] })
      	}
      })
	   }
    else this.setState({ searchedBooks: [] })
  }
  getBookShelf(booksOnShelf, bookSearched) {
    const bookOnShelf = booksOnShelf.filter((bookOnShelf) => bookOnShelf.id === bookSearched.id)[0]
    if (bookOnShelf) 
      return bookOnShelf.shelf
    return "none"
  }
  render() {
    const {booksOnShelf, bookshelfs, onAddBookOnShelves} = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.searchBooks(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {this.state.searchedBooks.map((bookSearched) => (
                <li key={bookSearched.id}>
                  <Book 
                    book={bookSearched}
                    bookshelfs={bookshelfs}
                    onChangeShelf={onAddBookOnShelves}
                    bookshelf={this.getBookShelf(booksOnShelf, bookSearched)}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks