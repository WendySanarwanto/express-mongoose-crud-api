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

  // TODO: Implement Retrieve, Update & Delete methods
}

module.exports = ProductsRepository;
