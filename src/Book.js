import React from 'react'
import { PropTypes } from 'prop-types'

class Book extends React.Component {
	state = {
		coverWidth: 0,
		coverHeight: 0
	}
	componentDidMount() {
		this.setBookCoverSizes()
	}
	setBookCoverSizes() {
		const imageLinks = this.props.book.imageLinks
		if (imageLinks) {
			let img = new Image();
			img.onload = (e) => this.setState({ coverWidth: e.target.width, coverHeight: e.target.height })
			img.src = this.props.book.imageLinks.thumbnail
		}
	}
	render() {
		const {book, bookshelves, onChangeShelf, bookshelf} = this.props
		return (
			<div className="book">
			  <div className="book-top">
			    <div className="book-cover"
			    	style={{
				    	width: this.state.coverWidth,
				    	height: this.state.coverHeight,
				    	backgroundSize: "cover",
				    	backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
				    }}
			    ></div>
			    <div className="book-shelf-changer">
			      <select
			      	onChange={(event) => onChangeShelf(book, event.target.value)} 
			      	value={bookshelf}
			      >
			        <option value="disabled" disabled>Move to...</option>
			        {bookshelves.map((bookshelf) => (
			        	<option key={bookshelf.key} value={bookshelf.key} >
			        		{bookshelf.title}
			        	</option>
			        ))}
			        <option value="none">None</option>
			      </select>
			    </div>
			  </div>
			  <div className="book-title">{book.title}</div>
			  <div className="book-authors">{book.authors}</div>
			</div>
		)
	}
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	bookshelves: PropTypes.array.isRequired,
	onChangeShelf: PropTypes.func.isRequired,
	bookshelf: PropTypes.string.isRequired
}

export default Book