import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const debouncedSearch = debounce((text) => {
    setSearchTerm(text);
  }, 300);

  const handleSearch = (event) => {
    debouncedSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleDeleteRow = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((rowId) => rowId !== id));
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const handleSelectAllRows = () => {
    if (selectedRows.length === products.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(products.map((product) => product.id));
    }
  };

  const handleDeleteSelectedRows = () => {
    setProducts(products.filter((product) => !selectedRows.includes(product.id)));
    setSelectedRows([]);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="container">
      <h1>Product List</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="product-table">
        <thead>
          <tr>
            <th>
              <label htmlFor="selectAllCheckbox">Select All Rows</label>
              <input
                id="selectAllCheckbox"
                type="checkbox"
                checked={selectedRows.length === products.length}
                onChange={handleSelectAllRows}
              />
              {/* <input type="checkbox" checked={selectedRows.length === products.length} onChange={handleSelectAllRows} /> */}
            </th>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id} className={selectedRows.includes(product.id) ? 'selected-row' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(product.id)}
                  onChange={() => handleSelectRow(product.id)}
                />
              </td>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.brand}</td>
              <td>
                <button onClick={() => handleDeleteRow(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handleDeleteSelectedRows}>Delete Selected</button>
        <button onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}>Previous</button>
        <span> Page {currentPage} </span>
        <button onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(products.length / 10)))}>
          Next
        </button>
      </div>
      <div>Rows selected: {selectedRows.length}</div>
    </div>
  );
}

export default App;
