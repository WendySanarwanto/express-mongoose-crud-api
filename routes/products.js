"use strict";

var express = require("express");
var router = express.Router();
const ProductsRepository = require(`../repositories/products-repository`);

const MONGODB_URL = "mongodb://localhost/demo-express";

/**
 * Create a new Product on the database
 * HTTP Verb: POST
 * Path Endpoint: /api/products
 */
router.post("/", (req, res, next) => {
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
    res.status(200).json(products);
  });
});

/**
 * Retrieve a Product from database by specified ID.
 * HTTP Verb: GET
 * Path endpoint: /api/products/{productId}
 */
router.get("/:productId", (req, res, next) => {
  const productId = req.params.productId;
  const repository = new ProductsRepository(MONGODB_URL);
  repository.get(productId, (err, product) => {
    if (err) {
      return res.status(err.status).send(err);
    }
    res.status(200).json(product);
  });
});

/**
 * Update a Product data on the database by specified ID
 * HTTP Verb: PUT
 * Path endpoint: /api/products/{productId}
 */
router.put("/:productId", (req, res, next) => {
  doUpdate(res, req);
});

/**
 * Update a Product data on the database by specified ID
 * HTTP Verb: PATCH
 * Path endpoint: /api/products/{productId}
 */
router.patch("/:productId", (req, res, next) => {
  doUpdate(res, req);
});

/**
 * A helper to handle update data on database.
 * @param {*} res - Express Response object
 * @param {*} req - Express Request object
 */
function doUpdate(res, req) {
  const productId = req.params.productId;
  const changedProduct = req.body;
  const repository = new ProductsRepository(MONGODB_URL);
  repository.update(productId, changedProduct, (err, updatedProduct) => {
    if (err) {
      return res.status(err.status).send(err);
    }
    res.status(200).json(changedProduct);
  });
}

module.exports = router;
