import React from 'react';

const containerStyle = {
  marginLeft: '220px',
  padding: '20px',
  marginTop: '60px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thtdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
  color : "gray"
};

const headerStyle = {
  backgroundColor: '#f2f2f2',
};

const products = [
  { id: 1, name: 'Laptop', price: '$999', stock: 10 },
  { id: 2, name: 'Smartphone', price: '$699', stock: 5 },
  { id: 3, name: 'Headphones', price: '$199', stock: 15 },
];

export default function ProductList() {
  return (
    <div style={containerStyle}>
      <h2>Product List</h2>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            <th style={thtdStyle}>ID</th>
            <th style={thtdStyle}>Name</th>
            <th style={thtdStyle}>Price</th>
            <th style={thtdStyle}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td style={thtdStyle}>{p.id}</td>
              <td style={thtdStyle}>{p.name}</td>
              <td style={thtdStyle}>{p.price}</td>
              <td style={thtdStyle}>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
