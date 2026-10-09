
async function runTests() {
  const baseUrl = "http://localhost:3001";

  const response = await fetch(`${baseUrl}/health`);

  if (!response.ok) {
    throw new Error("API health test failed");
  }

  const data = await response.json();

  if (data.status !== "healthy" ||
      data.database !== "connected") {
    throw new Error("Database connection test failed");
  }

  
  const notFound = await fetch(
    `${baseUrl}/api/products/P999`
  );

  if (notFound.status !== 404) {
    throw new Error("GET product not found test failed");
  }


  console.log("CI/CD test passed");
}

runTests().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
