
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {

    title: {
        type: String,
        required: true
    }, // WHEN YOU WANT DEFINE MORE CONDITION WRAP IT IN CURLY BRACES

    author: {
        type: String,
        required: true
    },

    completed: Boolean,
});

const Book = mongoose.model('Book', bookSchema); // MONGO WILL CREATE 'BOOKS' ON MONGO DB, IS IN IT GREAT?🔎
module.exports = Book;