
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pid: {
    type: String,
    required: [true, 'Product ID is required'],
    unique: true,
    trim: true
  },

  pname: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },

  price: {
    type: Number,
    required: false,
    min: [0, 'Price cannot be negative']
  },

  quantity: {
    type: Number,
    required: false,
    min: [0, 'Quantity cannot be negative'],
    validate: {
      validator: v => v == null || Number.isInteger(v),
      message: 'Quantity must be an integer'
    }
  }
});

module.exports = mongoose.model('Product', productSchema);
