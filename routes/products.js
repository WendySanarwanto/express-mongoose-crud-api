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
router.post("/", async (req, res, next) => {
  const repository = new ProductsRepository(MONGODB_URL);
  try { 
    const createdProduct = await repository.createProduct(req.body);
    res.status(200).json(createdProduct);
  } catch(err) {
    res.status(err.status).json(err);
  }
});

/**
 * Retrieve all Products from database
 * HTTP Verb: GET
 * Path endpoint: /api/products
 */
router.get("/", async (req, res, next) => {
  const repository = new ProductsRepository(MONGODB_URL);
  try {
    const products = await repository.getAll();
    res.status(200).json(products);
  } catch(err) {
    res.status(err.status).send(err);
  }
});

/**
 * Retrieve a Product from database by specified ID.
 * HTTP Verb: GET
 * Path endpoint: /api/products/{productId}
 */
router.get("/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  const repository = new ProductsRepository(MONGODB_URL);
  try {
    const product = await repository.get(productId);
    res.status(200).json(product);
  } catch(err) {
    res.status(err.status).send(err);
  }
});

/**
 * Update a Product data on the database by specified ID
 * HTTP Verb: PUT
 * Path endpoint: /api/products/{productId}
 */
router.put("/:productId", async (req, res, next) => {
  try{
    const changedProduct = await doUpdate(res, req);
    res.status(200).json(changedProduct);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

/**
 * Update a Product data on the database by specified ID
 * HTTP Verb: PATCH
 * Path endpoint: /api/products/{productId}
 */
router.patch("/:productId", async (req, res, next) => {
  try{
    const changedProduct = await doUpdate(res, req);
    res.status(200).json(changedProduct);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

/**
 * Delete an existing Product data record on the database by specified ID.
 * HTTP Verb: DELETE
 * Path endpoint: /api/products/{productId}
 */
router.delete("/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  const repository = new ProductsRepository(MONGODB_URL);
  try {
    await repository.delete(productId);
    res.status(200).json({});
  } catch(err) {
    return res.status(err.status).send(err);
  }
});

/**
 * A helper to handle update data on database.
 * @param {*} res - Express Response object
 * @param {*} req - Express Request object
 */
async function doUpdate(res, req) {
  const productId = req.params.productId;
  const changedProduct = req.body;
  const repository = new ProductsRepository(MONGODB_URL);
  return repository.update(productId, changedProduct);
}

module.exports = router;
