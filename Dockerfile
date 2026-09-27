# 1. Sử dụng image Node.js bản alpine để dung lượng nhỏ nhẹ và bảo mật
FROM node:18-alpine

# 2. Tạo và chỉ định thư mục làm việc bên trong container
WORKDIR /usr/src/app

# 3. Copy package.json và package-lock.json để cache layer cài thư viện
COPY package*.json ./

# 4. Cài đặt các thư viện phụ thuộc (chỉ cài dependencies cần thiết)
RUN npm install --omit=dev

# 5. Copy toàn bộ mã nguồn của dự án vào container
COPY . .

# 6. Khai báo cổng ứng dụng lắng nghe
EXPOSE 3000

# 7. Lệnh khởi chạy server (trỏ đúng file app.js trong thư mục src)
CMD ["node", "src/app.js"]