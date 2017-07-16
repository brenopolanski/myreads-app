import React from 'react'
import { PropTypes } from 'prop-types'
import Book from './Book.js'

const Bookshelf = (props) => (
	<div className="bookshelf">
		<h2 className="bookshelf-title">{props.bookshelfTitle}</h2>
		<div className="bookshelf-books">
				<ol className="books-grid">
					{props.booksOnShelves.map((book) => (
						<li key={book.id}>
							<Book 
								book={book}
								bookshelves={props.bookshelves}
								onChangeShelf={props.onChangeShelf} 
								bookshelf={book.shelf} />
						</li>
					))}
				</ol>
		</div>
	</div>
)

Bookshelf.propTypes = {
	booksOnShelves: PropTypes.array.isRequired,
	bookshelves: PropTypes.array.isRequired,
	onChangeShelf: PropTypes.func.isRequired,
	bookshelfTitle: PropTypes.string.isRequired
}

export default Bookshelf