import React, { useEffect, useState } from 'react';
import "../Css/Profile/Settings.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [settings, setSettings] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    darkMode: false,
    notifications: true,
  });
    const [obj,setObj] = useState(null)
  const navigate = useNavigate();


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


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async() => {
     try {
            const res = await axios.post(`http://localhost:5000/changepassword`,settings);
            console.log(res);
            
            if (res.status === 200) { 
              alert(res.data.message)
            }
        }
        catch (err) {
            if (err.response && err.response.status === 409) { alert(err.response.data); }
            else { alert('Something went wrong. Please try again.'); }
        }
  };

  return (
    <>
    {
      obj == null ?
<h1 style={{ color: "white",textAlign:'center',marginTop:'160px'}}><a href="/login">Please login first</a></h1>
      :
    
    <div className={`settings-container ${settings.darkMode ? 'dark' : ''}`}>
      <h2>Account Settings</h2>


      <div className="section">
        <label>Email</label>
        <input type="email" name="email" value={settings.email} onChange={handleChange} placeholder="Enter email" />
      </div>

      <div className="section">
        <label>Old Password</label>
        <input type="password" name="oldPassword" value={settings.password} onChange={handleChange} placeholder="Enter old password" />
      </div>

      <div className="section">
        <label>New Password</label>
        <input type="password" name="newPassword" value={settings.password} onChange={handleChange} placeholder="Enter new password" />
      </div>

      <div className="section toggle">
        <label>Dark Mode</label>
        <input type="checkbox" name="darkMode" checked={settings.darkMode} onChange={handleChange} />
      </div>

      <div className="section toggle">
        <label>Enable Notifications</label>
        <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} />
      </div>

      <button className="save-btn" onClick={handleSave}>Save Changes</button>
    </div>
}
    </>
  );
};

export default Settings;
