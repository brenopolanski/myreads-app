import React from 'react'
import Book from './Book.js'

// stateless function component
const Bookshelf = (props) => (
	<div className="bookshelf">
		<h2 className="bookshelf-title">{props.bookshelfTitle}</h2>
		<div className="bookshelf-books">
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

export default Bookshelf