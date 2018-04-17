"use strict"

var express = require('express');
var router = express.Router();
const ProductsRepository = require(`../repositories/products-repository`);

const MONGODB_URL = "mongodb://localhost/demo-express";

/**
 * Create a new Product on the database
 * HTTP Verb: POST
 * Path Endpoint: /api/products
 */
router.post('/', (req, res, next) => {
  const repository = new ProductsRepository(MONGODB_URL);
  repository.createProduct(req.body, (err, newProduct) => {
    if (err) {
      return res.status(err.status).json(err);
    }
    res.status(200).json(newProduct);
  });
});

module.exports = router;
