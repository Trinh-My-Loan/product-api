const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. CREATE: Thêm sản phẩm mới (POST /api/products)
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// 2. READ ALL: Lấy danh sách sản phẩm (GET /api/products)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. READ ONE: Lấy chi tiết sản phẩm theo pid (GET /api/products/:pid)
router.get('/:pid', async (req, res) => {
  try {
    const product = await Product.findOne({ pid: req.params.pid });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// 4. UPDATE: Cập nhật sản phẩm theo pid (PUT /api/products/:pid)
router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { pid: req.params.pid },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// 5. DELETE: Xóa sản phẩm theo pid (DELETE /api/products/:pid)
router.delete('/:pid', async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ pid: req.params.pid });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;