
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
    unique: true
  },

  pname: {
    type: String,
    required: false
  },

  price: {
    type: Number,
    min: 0
  },

  quantity: {
    type: Number,
    min: 0
  }
});

module.exports = mongoose.model("Product", productSchema);
