
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware đọc JSON
app.use(express.json());

// API kiểm tra trạng thái
app.get('/health', (req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    status: connected ? 'healthy' : 'unhealthy',
    database: connected ? 'connected' : 'disconnected'
  });
});

// Routes quản lý sản phẩm
app.use('/api/products', productRoutes);

// Kết nối MongoDB và khởi động server
async function startServer() {
  try {
    if (!MONGO_URI) {
      throw new Error('MONGO_URI is not configured');
    }

    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Product API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Startup failed:', error.message);
    process.exit(1);
  }
}

startServer();
