import React, { useEffect, useState } from "react";
import "../Css/Profile/ProfileInfo.css";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfileInfo = () => {
  const [obj,setObj] = useState(null)

  const information = async() => {
   try {
    const res = await axios.get('https://ecommerce-backend-qotf.onrender.com/user');
    setObj(res.data);
  } catch (err) {
    setObj(null); 
  }
    
  }

  useEffect(()=>{
information()
  },[])
  
  return (
     
    <>
    { obj == null ?
<h1 style={{ color: "white",textAlign:'center',marginTop:'160px'}}><a href="/login">Please login first</a></h1>
      :
      <>
    
          <h2 className="profile-heading">My Profile</h2>

    <div className="profile-container">

      <div className="profile-card">
        <div className="profile-left">
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className="profile-img"
          />
          <button className="edit-btn">Edit Profile</button>
        </div>

        <div className="profile-right">
          <div className="info-row">
            <label>Full Name:</label>
            <span> {obj.name}</span>
          </div>
          <div className="info-row">
            <label>Email:</label>
            <span>{obj.email}</span>
          </div>
          <div className="info-row">
            <label>Phone:</label>
            <span>+91 {obj.phone}</span>
          </div>
          <div className="info-row">
            <label>Address:</label>
            <span> 123 Main Street, {obj.address}</span>
          </div>
        </div>
      </div>
    </div>
    </>
    }
    </>
  );
};

export default ProfileInfo;
