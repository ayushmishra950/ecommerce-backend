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

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer' },
  { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
];

export default function UserList() {
  return (
    <div style={containerStyle}>
      <h2>User List</h2>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            <th style={thtdStyle}>ID</th>
            <th style={thtdStyle}>Name</th>
            <th style={thtdStyle}>Email</th>
            <th style={thtdStyle}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td style={thtdStyle}>{u.id}</td>
              <td style={thtdStyle}>{u.name}</td>
              <td style={thtdStyle}>{u.email}</td>
              <td style={thtdStyle}>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
