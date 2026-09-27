const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    pid: {
      type: String,
      required: [true, 'Product ID is required.'],
      unique: true,
      trim: true,
      default: () => 'P_' + Date.now()
    },
    pname: {
      type: String,
      required: [true, 'Product name is required.'],
      minlength: [3, 'Product name must be at least 3 characters.'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Product price is required.'],
      min: [0, 'Price cannot be negative.'],
      validate: {
        validator: function (v) {
          return !isNaN(v) && v >= 0;
        },
        message: 'Price must be a valid positive number.'
      }
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required.'],
      min: [0, 'Quantity cannot be negative.'],
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && v >= 0;
        },
        message: 'Quantity must be a valid non-negative integer.'
      }
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;