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

/**
 * Retrieve all Products from database
 * HTTP Verb: GET
 * Path endpoint: /api/products
 */
router.get("/", (req, res, next) => {
  const repository = new ProductsRepository(MONGODB_URL);
  repository.getAll((err, products) => {
    if (err) {
      return res.status(err.status).send(err);
    }
    res.send(products);
  });  
});

module.exports = router;
