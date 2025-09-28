import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import ProductList from './ProductList';
import OrderList from './OrderList';
import UserList from './UserList';


export default function AdminRouting() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('dashboard');
 

  

  // Uncomment this in production
  // if (!loggedIn) {
  //   return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  // }

  let content;
  let title = '';

  switch (page) {
    case 'dashboard':
      title = 'Dashboard';
      content = <AdminDashboard />;
      break;
    case 'products':
      title = 'Product List';
      content = <ProductList />;
      break;
    case 'orders':
      title = 'Order List';
      content = <OrderList />;
      break;
    case 'users':
      title = 'User List';
      content = <UserList />;
      break;
    default:
      title = 'Dashboard';
      content = <AdminDashboard />;
  }

  return (
    <>
      <AdminSidebar onNavigate={setPage} />
      <AdminHeader
        title={title}
      
      />
      {content}
    </>
  );
}
