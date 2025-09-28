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
};

const headerStyle = {
  backgroundColor: '#f2f2f2',
};

const orders = [
  { id: 101, customer: 'John Doe', total: '$199', status: 'Shipped' },
  { id: 102, customer: 'Jane Smith', total: '$299', status: 'Processing' },
  { id: 103, customer: 'Alice Johnson', total: '$99', status: 'Delivered' },
];

export default function OrderList() {
  return (
    <div style={containerStyle}>
      <h2>Order List</h2>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            <th style={thtdStyle}>Order ID</th>
            <th style={thtdStyle}>Customer</th>
            <th style={thtdStyle}>Total</th>
            <th style={thtdStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td style={thtdStyle}>{o.id}</td>
              <td style={thtdStyle}>{o.customer}</td>
              <td style={thtdStyle}>{o.total}</td>
              <td style={thtdStyle}>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
