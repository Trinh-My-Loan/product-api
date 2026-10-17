
const baseUrl = "http://localhost:3001";

// TEST 1: Kiem tra API hoat dong
async function testHealth() {
  const res = await fetch(`${baseUrl}/health`);

  if (res.status !== 200) {
    throw new Error("Health test failed");
  }

  console.log("PASS: Health");
}

// TEST 2: Kiem tra ket noi MongoDB
async function testDatabase() {
  const res = await fetch(`${baseUrl}/health`);
  const data = await res.json();

  if (data.database !== "connected") {
    throw new Error("Database test failed");
  }

  console.log("PASS: Database");
}

// TEST 3: Lay danh sach san pham
async function testGetProducts() {
  const res = await fetch(`${baseUrl}/api/products`);

  if (res.status !== 200) {
    throw new Error("GET products test failed");
  }

  console.log("PASS: GET products");
}

// TEST 4: Kiem tra san pham khong ton tai
async function testNotFound() {
  const res = await fetch(
    `${baseUrl}/api/products/P999`
  );

  if (res.status !== 404) {
    throw new Error("404 test failed");
  }

  console.log("PASS: 404 Not Found");
}
// async function testMoi() {
//   const res = await fetch(`${baseUrl}/api/products`);
//   if (res.status !== 200) throw new Error("Test failed");
//   console.log("PASS: Test moi");
// }
// CHAY TAT CA TEST
async function runTests() {
  try {
    await testHealth();
    await testDatabase();
    await testGetProducts();
    await testNotFound();

    console.log("CI/CD test passed");
  } catch (error) {
    console.error("TEST FAILED:", error.message);
    process.exitCode = 1;
  }
}

runTests();
