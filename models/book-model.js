'use strict';

const mongoose = require('../db');
const MODEL_NAME = 'Book';

const BookSchema = mongoose.Schema({
  bookName: {
    type: String
  },
  price: {
    type: Number
  },
  category: {
    type: String
  },
  author: {
    type: String
  }
});

const Book = mongoose.model(MODEL_NAME, BookSchema);

module.exports = Book;
