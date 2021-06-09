

// ===================
// DEPENDENCIES
// ===================
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const booksController = require('./controllers/books.js')

// =======================
// Middleware
// =======================
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.use('/books', booksController)
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
// Routes / Controllers
// ROOT
app.get('/', (req, res) => {
    res.send('Welcome to Booklist')
})

// =======================
// LISTENER
// =======================
app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
})



