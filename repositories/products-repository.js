"use strict";

const Product = require(`../models/product-model`);

class ProductsRepository {
  constructor(mongodbUrl) {
    this.mongodbUrl = mongodbUrl;
  }

  /**
   * A helper method for creating Product record on mongoDB
   * @param {*} request - Request body containing JSON object which represent a new Product record to be saved.
   */
  createProduct(request) {
    return new Promise((resolve, reject) => {
      // Instantiate Product Model by specified request body
      const newProduct = new Product(request);

      // Validate the model instance and handle the validation error's response.
      const errValidation = newProduct.validateSync();
      if (errValidation) {
        console.log(`[ERROR] - <ProductsRepository.createProduct> details: \n`, errValidation);
        return reject({ error: errValidation, message: 'Unable to create a new Product.', status: 400});
      }

      // Save the Product instance into MongoDB server
      newProduct.save((err, createdProduct) => {
        // Handle error's response
        if (err) {
          console.log(`[ERROR] - <ProductsRepository.createProduct> details: \n`, err);
          return reject({ error: err, message: 'Unable to create a new Product.', status: 400});
        }

        console.log(`[INFO] - <ProductsRepository.createProduct> Returning created record.`);
        resolve(createdProduct);
      });
    });
  }

  /**
   * Get all Product records from database.
   * @param {*} filter - optional parameter that can be used to filter the records. Default value is an empty object.
   */
  getAll(filter = {}) {
    return new Promise((resolve, reject) => {      
      Product.find(filter, (err, products) => {

        if (err) {
          console.log(`[ERROR] - <ProductsRepository.getAll> Details: \n`, err);
          return reject(err);
        }

        resolve(products);
      });
    });
  }

  /**
   * Get Product record by specified ID.
   * @param {String} id - ID of record to retrieve.
   */
  get(id) {
    return new Promise((resolve, reject) => {
      Product.findById(id, (err, product) => {
        if (err) {
          console.log(`[ERROR] - <ProductsRepository.get> Details: \n`, err);
          return reject(err);
        }

        resolve(product);
      });
    });
  };

  /**
   * Update Product record by ID.
   * @param {String} id - ID of target record to update.
   * @param {*} changedData - Changed record.
   */
  update(id, changedData) {
    return new Promise((resolve, reject) => {
      // Instantiate Product Model by specified request body
      const changedProduct = new Product(changedData);

      // Validate the model instance and handle the validation error's response.
      const errValidation = changedProduct.validateSync();
      if (errValidation) {
        console.log(`[ERROR] - <ProductsRepository.update> details: \n`, errValidation);
        return reject({ error: errValidation, message: 'Unable to update a Product.', status: 400});
      }
      
      Product.findByIdAndUpdate(id, changedData, { new: true }, (err, updatedProduct) => {
        if (err) {
          console.log(`[ERROR] - <ProductsRepository.update> Details: \n`, err);
          return reject(err);
        }
        console.log(`[DEBUG] - <ProductsRepository.update> updatedProduct: \n`, updatedProduct);
        return resolve(updatedProduct);
      });
    });
  }

  /**
   * Delete Product data by specified id
   * @param {String} productId - ID of Product record to delete.
   */
  delete(productId) {
    return new Promise((resolve, reject) => {
      Product.remove( { _id: productId }, (err)=>{
        if (err) {
          console.log(`[ERROR] - <ProductsRepository.delete> Details: \n`, err);
          return reject(err);
        }

        resolve(null);
      });
    });
  }
}

module.exports = ProductsRepository;
