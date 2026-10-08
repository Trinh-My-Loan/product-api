
const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Lấy danh sách sản phẩm
router.get('/', getAllProducts);

// Lấy chi tiết sản phẩm theo pid
router.get('/:pid', getProductById);

// Thêm sản phẩm
router.post('/', createProduct);

// Cập nhật sản phẩm
router.put('/:pid', updateProduct);

// Xóa sản phẩm
router.delete('/:pid', deleteProduct);

module.exports = router;
