'use strict';

const mongoose = require('mongoose');
const MODEL_NAME = 'Product';

module.exports = class ProductsRepository {
  constructor(mongodbUrl) {
    this.mongodbUrl = mongodbUrl;

    // Define Product Schema
    this.ProductSchema = mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      price: { 
        amount: {
          type: Number,
          required: true
        },
        currency: {
          type: String,
          required: true
        }
      }
    });

    // Define Product Model from the Schema
    this.Product = mongoose.model(MODEL_NAME, this.ProductSchema);
  }

  /**
   * Create a new Product record into the database.
   * @param {*} newProduct - New Product object to save.
   * @param {*} callback - Callback function where 1st parameter contains error and 2nd parameter contains saved record object.
   */
  create(request, callback) {
    // Connect to MongoDB using mongoose
    mongoose.connect(this.mongodbUrl);
    const db = mongoose.connection;

    db.on(`error`, (err) => {
      console.log(`[ERROR] - <ProductsRepository.create> Details: \n`, err);
      callback({ error: err, message: 'Unable to connect to database.', status: 500});
    });

    db.on(`open`, () => {
      const Product = this.Product;
      const newProduct = new Product(request);
  
      // Validate the model instance and handle the validation error's response.
      const errValidation = newProduct.validateSync();
      if (errValidation) {
        console.log(`[ERROR] - <ProductsRepository.create> Details: \n`, errValidation);
        return callback(errValidation);
      }
  
      // Save the Product instance into MongoDB server
      newProduct.save((err, createdProduct) => {
        db.close();
  
        // Handle error's response
        if (err) {
          console.log(`[ERROR] - <ProductsRepository.create> Details: \n`, err);
          return callback(errValidation)
          return res.status(400).send({ error: err, message: 'Unable to create a new Product.'});
        }

        callback(null, createdProduct)
      });
    });
  }

  // TODO: Implement CRUD Product methods here
}
