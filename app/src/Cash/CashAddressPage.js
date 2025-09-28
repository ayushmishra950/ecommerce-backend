import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Cash/CashAddressPage.css';

const CashAddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('addresses')) || [];
    const save = ['jaipur rajasthan']
    setAddresses(save);
  }, []);

  const handleAddAddress = () => {
    if (newAddress.trim() === '') return alert("Enter an address");
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    localStorage.setItem('addresses', JSON.stringify(updated));
    setNewAddress('');
  };

  const handleContinue = () => {
    if (!selectedAddress) return alert("Please select an address");
    localStorage.setItem('address', selectedAddress);
    navigate('/summary');
  };

  return (
    <div className="address-container2">
      <h2>Select Delivery Address</h2>

      <div className="saved-addresses">
        {addresses.length > 0 ? (
          addresses.map((addr, index) => (
            <label key={index} className="address-option">
              <input
                type="radio"
                name="selectedAddress"
                value={addr}
                onChange={(e) => setSelectedAddress(e.target.value)}
              />
              {addr}
            </label>
          ))
        ) : (
          <p style={{textAlign:'center'}}>No saved addresses found.</p>
        )}
      </div>

      <div className="add-new">
        <h4>Or Add New Address:</h4>
        <textarea
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="Enter new address"
          rows="4"
          className="address-input"
        />
        <button className="add-btn" onClick={handleAddAddress} style={{marginLeft:'110px'}}>
          Add Address
        </button>
      </div>

      <button className="continue-btn" onClick={handleContinue} style={{marginLeft:'329px',marginTop:'-36px',float:'left'}}>
        Continue
      </button>
    </div>
  );
};

export default CashAddressPage;
