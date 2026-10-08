const baseUrl = 'http://127.0.0.1:3000';

async function request(method, path, body) {
  const response = await fetch(baseUrl + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await response.json();
  return { status: response.status, data };
}

async function main() {
  const pid = 'CI_' + Date.now();

  console.log('1. Checking API health...');
  const health = await request('GET', '/health');
  if (health.status !== 200 || health.data.status !== 'healthy') {
    throw new Error('Healthcheck failed');
  }

  console.log('2. Testing CREATE...');
  const created = await request('POST', '/api/products', {
    pid,
    pname: 'CI Test Product',
    price: 100000,
    quantity: 10
  });
  if (created.status !== 201) {
    throw new Error('CREATE failed: ' + JSON.stringify(created));
  }

  console.log('3. Testing READ...');
  const read = await request('GET', '/api/products/' + pid);
  if (read.status !== 200 || read.data.pid !== pid) {
    throw new Error('READ failed: ' + JSON.stringify(read));
  }

  console.log('4. Testing UPDATE...');
  const updated = await request('PUT', '/api/products/' + pid, {
    pname: 'Updated CI Product',
    price: 200000,
    quantity: 20
  });
  if (updated.status !== 200) {
    throw new Error('UPDATE failed: ' + JSON.stringify(updated));
  }

  const verified = await request('GET', '/api/products/' + pid);
  if (verified.data.price !== 200000 ||
      verified.data.quantity !== 20) {
    throw new Error('UPDATE verification failed');
  }

  console.log('5. Testing DELETE...');
  const deleted = await request('DELETE', '/api/products/' + pid);
  if (deleted.status !== 200) {
    throw new Error('DELETE failed: ' + JSON.stringify(deleted));
  }

  console.log('6. Verifying deletion...');
  const afterDelete = await request('GET', '/api/products/' + pid);
  if (afterDelete.status !== 404) {
    throw new Error('DELETE verification failed');
  }

  console.log('ALL CRUD TESTS PASSED!');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
