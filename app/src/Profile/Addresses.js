import React, { useEffect, useState } from "react";
import "../Css/Profile/AddressBook.css";
import axios from "axios";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+91 9876543210",
      addressLine: "123 Main Street",
      city: "New Delhi",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const[obj,setObj] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
  });

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


  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.addressLine || !formData.city) {
      alert("Please fill all fields.");
      return;
    }

    const newAddress = {
      ...formData,
      id: addresses.length + 1,
    };

    setAddresses((prev) => [...prev, newAddress]);
    setFormData({ name: "", phone: "", addressLine: "", city: "" });
    setShowForm(false);
  };

  return (
    <>
    {
      obj == null ?
<h1 style={{ color: "white",textAlign:'center',marginTop:'160px'}}><a href="/login">Please login first</a></h1>

      :
    
    <div className="address-book-container">
      <h2 className="address-book-heading">My Address Book</h2>
      <button className="add-address-btn" onClick={() => setShowForm(true)}>
        + Add New Address
      </button>

      {showForm && (
        <div className="address-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="addressLine"
            placeholder="Address"
            value={formData.addressLine}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
          />
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      )}

      <div className="address-list">
        {addresses.map((addr) => (
          <div key={addr.id} className="address-card">
            <p><strong>{addr.name}</strong></p>
            <p>{addr.addressLine}, {addr.city}</p>
            <p>Phone: {addr.phone}</p>
            <div className="address-actions">
              <button className="edit-btn" onClick={() => setShowForm(true)}>Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
}
    </>
  );
};

export default AddressBook;
