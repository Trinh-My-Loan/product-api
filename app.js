const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

// Endpoint kiểm tra sức khỏe dịch vụ
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

// Định tuyến API cho Product
app.use("/api/products", productRoutes);

// Bắt lỗi các route không tồn tại (404)
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint không tồn tại" });
});

module.exports = app;