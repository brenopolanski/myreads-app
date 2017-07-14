import React from 'react'

const Book = (props) => (
	<div className="book">
	  <div className="book-top">
	    <div 
	    	className="book-cover"
	    	style={{
		    	width: 128,
		    	height: 170,
		    	backgroundImage: `url(${props.book.imageLinks.thumbnail})`
		    }}
	    ></div>
	    <div className="book-shelf-changer">
	      <select>
	        <option value="none" disabled>Move to...</option>
	        {props.bookshelfs.map((bookshelf) => (
	        	<option key={"opt-"+bookshelf.key} value={bookshelf.key}>{bookshelf.title}</option>
	        ))}
	        <option value="none">None</option>
	      </select>
	    </div>
	  </div>
	  <div className="book-title">{props.book.title}</div>
	  <div className="book-authors">{props.book.authors}</div>
	</div>
)

// stateless function component
const Bookshelf = (props) => (
	<div className="bookshelf">
		<h2 className="bookshelf-title">{props.bookshelfTitle}</h2>
		<div className="bookshelf-books">
		    <ol className="books-grid">
			    {props.books.map((book) => (
				    <li key={book.title}>
				    	<Book book={book} bookshelfs={props.bookshelfs} />
				    </li>
			    ))}
		    </ol>
		</div>
	</div>
)

export default Bookshelf