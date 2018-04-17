"use strict";

const mongoose = require('mongoose');
const Product = require(`../models/product-model`);

class ProductsRepository {
  constructor(mongodbUrl) {
    this.mongodbUrl = mongodbUrl;
  }

  /**
   * A helper method for creating Product record on mongoDB
   * @param {*} request - Request body containing JSON object which represent a new Product record to be saved.
   * @param {*} callback - Callback function whose 1st argument is containing error and the 2nd argument contains the saved record.
   */
  createProduct(request, callback) {
    // Instantiate Product Model by specified request body
    const newProduct = new Product(request);

    // Validate the model instance and handle the validation error's response.
    const errValidation = newProduct.validateSync();
    if (errValidation) {
      console.log(`[ERROR] - details: \n`, errValidation);
      return callback({ error: errValidation, message: 'Unable to create a new Product.', status: 400});
    }

    // Connect to MongoDB using mongoose
    mongoose.connect(this.mongodbUrl);
    const db = mongoose.connection;

    db.on(`error`, (err) => {
      console.log(`[ERROR] - details: \n`, err);
      callback({ error: err, message: 'Unable to connect to database.', status: 500});
    });

    // Save the Product instance into MongoDB server
    newProduct.save((err, createdProduct) => {
      // Disconnect from mongoDB
      mongoose.disconnect();

      // Handle error's response
      if (err) {
        console.log(`[ERROR] - details: \n`, err);
        return callback({ error: err, message: 'Unable to create a new Product.', status: 400});
      }

      console.log(`[INFO] - Returning created record.`);
      callback(null, createdProduct);
    });
  }

  /**
   * Get all Product records from database.
   * @param {*} callback - Callback function where 1st parameter contains error and 2nd parameter contains saved record object. 
   * @param {*} filter - optional parameter that can be used to filter the records. Default value is an empty object.
   */
  getAll(callback, filter = {}) {
    // Connect to MongoDB using mongoose
    mongoose.connect(this.mongodbUrl);
    const db = mongoose.connection;

    db.on(`error`, (err) => {
      console.log(`[ERROR] - <ProductsRepository.getAll> Details: \n`, err);
      callback({ error: err, message: 'Unable to connect to database.', status: 500});
    });
    
    Product.find(filter, (err, products) => {
      // Disconnect from mongoDB
      mongoose.disconnect();

      if (err) {
        console.log(`[ERROR] - <ProductsRepository.getAll> Details: \n`, err);
        return callback(err);
      }

      callback(null, products);
    });
  }

  /**
   * Get Product record by specified ID.
   * @param {*} id - ID of record to retrieve.
   * @param {*} callback - Callback function where 1st parameter contains error and 2nd parameter contains retrieved record object.
   */
  get(id, callback) {
    // Connect to MongoDB using mongoose
    mongoose.connect(this.mongodbUrl);
    const db = mongoose.connection;

    db.on(`error`, (err) => {
      console.log(`[ERROR] - <ProductsRepository.get> Details: \n`, err);
      callback({ error: err, message: 'Unable to connect to database.', status: 500});
    });

    Product.findById(id, (err, product) => {
      // Disconnect from mongoDB
      mongoose.disconnect();

      if (err) {
        console.log(`[ERROR] - <ProductsRepository.get> Details: \n`, err);
        return callback(err);
      }

      callback(null, product);
    });
  };

  // TODO: Implement Update & Delete methods
}

module.exports = ProductsRepository;
