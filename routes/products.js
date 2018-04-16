var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const MONGODB_URL = "mongodb://localhost/demo-express";

// Define Product Schema
const ProductSchema = mongoose.Schema({
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
const Product = mongoose.model('Product', ProductSchema);

/**
 * Create a new Product on the database
 * HTTP Verb: POST
 * Path Endpoint: /api/products
 */
router.post('/', (req, res, next) => {
  // Connect to MongoDB using mongoose
  mongoose.connect(MONGODB_URL);
  const db = mongoose.connection;

  db.on(`error`, (err) => {
    console.log(`[ERROR] - details: \n`, err);
    res.status(500).send({ error: err, message: 'Unable to connect to database.'});
  });

  db.on(`open`, () => {
    const newProduct = new Product(req.body);

    // Validate the model instance and handle the validation error's response.
    const errValidation = newProduct.validateSync();
    if (errValidation) {
      console.log(`[ERROR] - details: \n`, errValidation);
      return res.status(400).send({ error: errValidation, message: 'Unable to create a new Product.'});    
    }

    // Save the Product instance into MongoDB server
    newProduct.save((err, createdProduct) => {
      db.close();

      // Handle error's response
      if (err) {
        console.log(`[ERROR] - details: \n`, err);
        return res.status(400).send({ error: err, message: 'Unable to create a new Product.'});
      }

      res.send(createdProduct);
    });
  });
});

module.exports = router;
