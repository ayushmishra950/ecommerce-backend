import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { openAdminSidebar } from "../Redux-Toolkit/mySlice";

const sidebarStyle = {
  width: '220px',
  height: '100vh',
   backgroundColor: 'black',
  color: '#ecf0f1',
  padding: '20px',
  boxSizing: 'border-box',
  position: 'fixed',
  top: 0,
  left: 0,
};

const linkStyle = {
  display: 'block',
  padding: '10px 0',
  color: '#ecf0f1',
  textDecoration: 'none',
  cursor: 'pointer',
};

export default function AdminSidebar({ onNavigate }) {
      const dispatch = useDispatch();

 const submit = () => {
   
 console.log('hiii...');
    dispatch(openAdminSidebar());
    onNavigate('dashboard') 
  };

  return (
    <div style={sidebarStyle}>
      <h2>Admin Panel</h2>
      <nav>
        <a style={linkStyle} onClick={submit}>Dashboard</a>
        <a style={linkStyle} onClick={() => onNavigate('products')}>Products</a>
        <a style={linkStyle} onClick={() => onNavigate('orders')}>Orders</a>
        <a style={linkStyle} onClick={() => onNavigate('users')}>Users</a>
      </nav>
    </div>
  );
}
