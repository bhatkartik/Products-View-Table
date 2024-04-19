const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
