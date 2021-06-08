

// ===================
// DEPENDENCIES
// ===================
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const mongoose = require('mongoose')
const Book = require('./models/book.js')

// =======================
// Middleware
// =======================
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// ===================
// Database Connection
// ===================
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
// ==============================
// Database Connection Error/Success
// ==============================
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// =======================
// ROUTES
// =======================
// ========================================================
// INDUCES (index, new, delete, update, create, edit, show) 
// ========================================================
// ROOT
app.get('/', (req, res) => {
    res.send('Welcome to Booklist App')
})

// INDEX
app.get('/books', (req, res) => {
    Book.find({}, (error, allBooks) => { // {} WILL FETCH ALL THE BOOKS
        res.render('index.ejs', {
            books: allBooks,
        })
    })
})

// NEW
app.get('/books/new', (req, res) => {
    res.render('new.ejs')
})

// CREATE
app.post('/books', (req, res) => {

    if (req.body.completed === 'on') {
		//if checked, req.body.completed is set to 'on'
		req.body.completed = true;
	} else {
		//if not checked, req.body.completed is undefined
		req.body.completed = false;
	}

	Book.create(req.body, (err, createdBook) => {
        res.redirect('/books')
    });
})

// SHOW
app.get('/books/:id', (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        res.render('show.ejs', {
            book: foundBook,
        })
    })
})

// =======================
// LISTENER
// =======================
app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
})



