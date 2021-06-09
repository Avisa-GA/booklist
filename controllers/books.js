
// REQUIRE AND SET UP DEPENDENCIES
const express = require('express')
const booksRouter = express.Router() 
const Book = require('../models/book')
// SEED
const bookSeed = require('../models/bookSeed.js')
// Seed
booksRouter.get('/seed', (req, res) => {

    Book.deleteMany({}, (err, allBooks) => {})
    Book.create(bookSeed, (err, data) => {
        res.redirect('/books')
    })
      
});


// INDEX
booksRouter.get('/', (req, res) => {
    Book.find({}, (error, allBooks) => { // {} WILL FETCH ALL THE BOOKS
        res.render('index.ejs', {
            books: allBooks,
        })
    })
})

// NEW
booksRouter.get('/new', (req, res) => {
    res.render('new.ejs')
})

// DELETE
booksRouter.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, deletedBook) => {
           res.redirect('/books')
    })
})

// UPDATE
booksRouter.put('/:id', (req, res) => {
    // reformat the completed property
    if (req.body.completed === 'on') {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    // step 2: find the book in mongodb and update it with req.body
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedBook) => {
        res.redirect(`/books/${req.params.id}`)
    })
    
})

// CREATE
booksRouter.post('/', (req, res) => {

    if (req.body.completed === 'on') {
		//if checked, req.body.completed is set to 'on'
		req.body.completed = true;
	} else {
		//if not checked, req.body.completed is undefined
		req.body.completed = false;
	}

	Book.create(req.body, (err, createdBook) => {
        res.redirect(`/${createdBook._id}`)
    });
})

// EDIT
booksRouter.get('/:id/edit', (req, res) => {
    // We need to find the book We are editing
    // We need to insert the book into template
    Book.findById(req.params.id, (err, foundBook) => {
        res.render('edit.ejs', { /* Context Object */
            book: foundBook
        })
    })
})

// SHOW
booksRouter.get('/:id', (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        res.render('show.ejs', {
            book: foundBook,
        })
    })
})

// EXPORT FUNCTIOANLITY
module.exports = booksRouter
