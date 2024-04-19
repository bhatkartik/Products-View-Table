const request = require('supertest');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/products', (req, res) => {
  try {
    const productsData = fs.readFileSync('product.json', 'utf8');
    const products = JSON.parse(productsData);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

describe('GET /products', () => {
  it('should return an array of products', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should handle errors and return 500 status', async () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('Mocked error');
    });

    const response = await request(app).get('/products');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal Server Error' });
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

afterAll(() => {
  server.close();
});
