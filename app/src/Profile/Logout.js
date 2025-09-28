import React, { useEffect } from 'react';
import "../Css/Profile/Logout.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      localStorage.clear();
      const store = await axios.get('https://ecommerce-backend-qotf.onrender.com/logout')
      alert(store.data.message);
      navigate('/')
      window.location.reload();
    }

    else {
      navigate('/')

    }

  };

  useEffect(() => {
    handleLogout()
  }, [])



  return (
    <></>
    // <div className="logout-container">
    //   <div className="logout-box">
    //     <h2>Are you sure you want to logout?</h2>
    //     <div className="logout-buttons">
    //       <button className="confirm" onClick={handleLogout}>Yes, Logout</button>
    //       <button className="cancel" onClick={handleCancel}>Cancel</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Logout;
