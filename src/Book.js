import React from 'react'

class Book extends React.Component {
	state = {
		coverWidth: 0,
		coverHeight: 0
	}
	componentDidMount() {
		this.setBookCoverSizes()
	}
	setBookCoverSizes() {
		let img = new Image();
		img.onload = (e) => this.setState({ coverWidth: e.target.width, coverHeight: e.target.height })
		img.src = this.props.book.imageLinks.thumbnail
	}
	render() {
		const {book, bookshelfs, onChangeShelf} = this.props
		return (
			<div className="book">
			  <div className="book-top">
			    <div className="book-cover"
			    	style={{
				    	width: this.state.coverWidth,
				    	height: this.state.coverHeight,
				    	backgroundSize: "cover",
				    	backgroundImage: `url(${book.imageLinks.thumbnail})`
				    }}
			    ></div>
			    <div className="book-shelf-changer">
			      <select onChange={(event) => onChangeShelf(book, event.target.value)} value={book.shelf} >
			        <option value="none" disabled>Move to...</option>
			        {bookshelfs.map((bookshelf) => (
			        	<option key={"opt-"+bookshelf.key} value={bookshelf.key} >{bookshelf.title}</option>
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

export default Book