// models.js
const mongoose = require('./db');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publishedYear: Number
});

const Book = mongoose.model('Book', BookSchema);

module.exports = { Book };