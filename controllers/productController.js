
const Product = require('../models/Product');

// 1. Lấy danh sách tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Lấy chi tiết sản phẩm theo pid
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ pid: req.params.pid });

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Thêm sản phẩm
exports.createProduct = async (req, res) => {
  try {
    const { pid, pname, price, quantity } = req.body;

    const product = new Product({
      pid,
      pname,
      price,
      quantity
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Product ID already exists'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// 4. Cập nhật sản phẩm theo pid
exports.updateProduct = async (req, res) => {
  try {
    const { pid, ...updateData } = req.body;

    const product = await Product.findOneAndUpdate(
      { pid: req.params.pid },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json(product);
  } catch (error) {
    if (error.name === 'ValidationError' ||
        error.name === 'CastError') {
      return res.status(400).json({
        message: error.message
      });
    }

    res.status(500).json({ message: error.message });
  }
};

// 5. Xóa sản phẩm theo pid
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      pid: req.params.pid
    });

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
