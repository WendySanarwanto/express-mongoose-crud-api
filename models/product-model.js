'use strict';

// const mongoose = require('mongoose');
const mongoose = require('../db');
const MODEL_NAME = 'Product';

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

const Product = mongoose.model(MODEL_NAME, ProductSchema);

module.exports = Product;
