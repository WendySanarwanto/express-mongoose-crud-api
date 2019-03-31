"use strict";

var express = require("express");
var router = express.Router();

const BookRepository = require('../repositories/books-repository');
const MONGODB_URL = "mongodb://localhost/BookstoreDb";
const repository = new BookRepository(MONGODB_URL);

router.get('/', async(req, res, next) => {
  // const repository = new BookRepository(MONGODB_URL);
  try {
    const books = await repository.getAll();
    res.status(200).json(books);
  } catch(err) {
    res.status(err.status).send(err);
  }
});

router.post("/", async (req, res, next) => {
  // const repository = new BookRepository(MONGODB_URL);
  try {
    const createdBook = await repository.createBook(req.body);
    res.status(200).json(createdBook);
  } catch(err) {
    res.status(err.status).send(err);
  }
});

module.exports = router;
