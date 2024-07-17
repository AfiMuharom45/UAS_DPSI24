const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    publishedDate: {
        type: Date
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
