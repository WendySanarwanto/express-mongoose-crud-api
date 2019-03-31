"use strict";

const Book = require(`../models/book-model`);

class BookRepository {
  constructor(mongodbUrl) {
    this.mongodbUrl = mongodbUrl;
  }

  /**
   * Get all Book records from database
   * @param {*} filter - optional parameter that can be used to filter the records. Default value is an empty object.
   */
  getAll(filter = {}) {
    return Book.find(filter).exec();
  }

  createBook(request) {
    const newBook = new Book(request);
    return newBook.save();
  }
}

module.exports = BookRepository;