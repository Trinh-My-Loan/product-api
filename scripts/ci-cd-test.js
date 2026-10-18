
const baseUrl = "http://localhost:3001";

// TEST 1: Kiem tra API
async function testHealth() {
  const res = await fetch(`${baseUrl}/health`);
  if (res.status !== 200) throw new Error("Health loi");
  console.log("PASS: Health");
}

// TEST 2: Kiem tra MongoDB
async function testDatabase() {
  const res = await fetch(`${baseUrl}/health`);
  if (res.status !== 200) throw new Error("Health loi");

  const data = await res.json();
  if (data.database !== "connected") {
    throw new Error("MongoDB loi");
  }

  console.log("PASS: Database");
}

// TEST 3: Lay danh sach san pham
async function testGetProducts() {
  const res = await fetch(`${baseUrl}/api/products`);
  if (res.status !== 200) throw new Error("GET loi");
  console.log("PASS: GET products");
}

// TEST 4: Kiem tra danh sach la mang
async function testArray() {
  const res = await fetch(`${baseUrl}/api/products`);
  if (res.status !== 200) throw new Error("GET loi");

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Du lieu khong phai mang");
  }

  console.log("PASS: Array");
}

// TEST 5: Kiem tra san pham khong ton tai
async function testNotFound() {
  const res = await fetch(`${baseUrl}/api/products/P999999`);
  if (res.status !== 404) throw new Error("404 loi");
  console.log("PASS: 404 Not Found");
}

// TEST 6: Kiem tra trang thai API
async function testStatus() {
  const res = await fetch(`${baseUrl}/health`);
  if (res.status !== 200) throw new Error("Health loi");

  const data = await res.json();
  if (data.status !== "healthy") {
    throw new Error("Status loi");
  }

  console.log("PASS: Status healthy");
}

// TEST 7: Kiem tra thoi gian phan hoi
async function testSpeed() {
  const start = Date.now();
  const res = await fetch(`${baseUrl}/api/products`);
  const time = Date.now() - start;

  if (res.status !== 200 || time > 5000) {
    throw new Error("Speed loi");
  }

  console.log("PASS: Speed");
}

// TEST 8: Kiem tra du lieu san pham
async function testProductData() {
  const res = await fetch(`${baseUrl}/api/products`);
  if (res.status !== 200) throw new Error("GET loi");

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Du lieu khong hop le");
  }

  for (const product of data) {
    if (!product.pid || !product.pname) {
      throw new Error("Thieu thong tin san pham");
    }
  }

  console.log("PASS: Product data");
}

// TEST MOI:
// async function testMoi() {
//   const res = await fetch(`${baseUrl}/api/products`);
//   if (res.status !== 200) throw new Error("Test loi");
//   console.log("PASS: Test moi");
// }
async function test() {
 const res = await fetch(`${baseUrl}/api/products/P0018`);
  if (res.status !== 200) throw new Error("Test loi");
  console.log("PASS: Sam pham ton tai");
}

// CHAY TAT CA TEST
async function runTests() {
  try {
   await testHealth();
   await testDatabase();
   await testGetProducts();
   await testArray();
   await testNotFound();
   await testStatus();
   await testSpeed();
   //await testProductData();

    await test();
    console.log("CI/CD test passed");
  } catch (error) {
    console.error("TEST FAILED:", error.message);
    process.exitCode = 1;
  }
}

runTests();
