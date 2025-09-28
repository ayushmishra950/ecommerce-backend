import React, { useEffect, useState } from 'react';
import { MdPerson, MdShoppingCart, MdFavorite, MdHome, MdPayment, MdSettings, MdLogout, MdFilter } from 'react-icons/md';
import "../Css/Profile/Profile.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState();
  const navigate = useNavigate();
      const[obj,setObj] = useState(null)
  
       const information = async() => {
   try {
    const res = await axios.get('http://localhost:5000/user');
    setObj(res.data);
  } catch (err) {
    setObj(null); 
  }  
  }
  useEffect(()=>{
information()
  },[])


  const ods = ()=> {
    setActiveTab('orders')
         navigate('/myorder')
  }
  const info = () => {
     setActiveTab('info')
         navigate('/info')
  }
  const wishlist = () => {
     setActiveTab('wishlist')
         navigate('/wishlist')
  }
  const filter = () => {
     setActiveTab('filter')
         navigate('/filter')
  }

  const address = () => {
     setActiveTab('addresses')
         navigate('/address')
  }

  const payments = () => {
     setActiveTab('payments')
         navigate('/PaymentMethod')
  }

  const settings = () => {
     setActiveTab('settings')
         navigate('/settings')
  }

  const logout = () => {
     setActiveTab('logout')
         navigate('/logout')
  }
  

  return (
    <>
    {/* <div className="profile-container"> */}
      <aside className=  {`profile-sidebar ${isOpen ? 'open' : ''}`}>
              <button className="close-btn" onClick={onClose}>×</button>
        <div className="profile-header">
          <img src="https://i.pravatar.cc/100" alt="User Avatar" className="profile-avatar" />
          <h3 style={{marginTop:'-8px'}}>Ayush Mishra</h3>
        </div>
        <ul>
          <li onClick={info} className={activeTab === 'info' ? 'active' : ''}><MdPerson /> Profile Info</li>
          <li onClick={ods} className={activeTab === 'orders' ? 'active' : ''}><MdShoppingCart /> My Orders</li>
          <li onClick={wishlist} className={activeTab === 'wishlist' ? 'active' : ''}><MdFavorite /> Wishlist</li>
          <li onClick={filter} className={activeTab === 'filter' ? 'active' : ''}><MdFilter /> Filter</li>
          <li onClick={address} className={activeTab === 'addresses' ? 'active' : ''}><MdHome /> Address Book</li>
          <li onClick={payments} className={activeTab === 'payments' ? 'active' : ''}><MdPayment /> Payment Methods</li>
          <li onClick={settings} className={activeTab === 'settings' ? 'active' : ''}><MdSettings /> Settings</li>
          <li onClick={logout} className={activeTab === 'logout' ? 'active' : ''} disabled={obj === null}><MdLogout /> Logout</li>

        </ul>
      </aside>
      
    {/* </div> */}
    </>
  );
};

export default Profile;