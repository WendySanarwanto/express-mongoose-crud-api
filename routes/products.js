var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const ProductsRepository = require("../repositories/products-repository");

const MONGODB_URL = "mongodb://localhost/demo-express";

/**
 * Create a new Product on the database
 * HTTP Verb: POST
 * Path Endpoint: /api/products
 */
router.post("/", (req, res, next) => {
  const repository = new ProductsRepository(MONGODB_URL);
  repository.create(req.body, (err, createdProduct) => {
    if (err) {
      return res.status(err.status).send(err);
    }
    res.send(createdProduct);
  });
});

module.exports = router;
