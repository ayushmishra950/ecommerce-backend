import React from "react";
import "../Css/Admin/AdminDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { closeAdminSidebar } from "../Redux-Toolkit/mySlice";

const AdminDashboard = () => {
   const dispatch = useDispatch();
  const on = useSelector((state) => state.all.AdminSidebarOpen);
  return (
    <div className="admin-dashboard" onClick={()=>{dispatch(closeAdminSidebar())}}>
      
      <aside className={`admin-sidebar ${on ? 'right' : ''}`}>
        <h2 className="admin-logo">🛒 Admin</h2>
        <ul>
          <li>📦 Products</li>
          <li>🧑 Users</li>
          <li>🛍️ Orders</li>
          <li>📈 Analytics</li>
          <li>⚙️ Settings</li>
        </ul>
      </aside>

      <main className="admin-main">
      

        <section className="admin-content">
          <div className="admin-card">Total Orders: <strong>143</strong></div>
          <div className="admin-card">Total Users: <strong>90</strong></div>
          <div className="admin-card">Revenue: <strong>₹87,000</strong></div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
