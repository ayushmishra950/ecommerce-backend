import React, { useState, useEffect } from 'react';
import '../Css/Profile/SavedPaymentMethods.css';
import axios from 'axios';

const SavedPaymentMethods = () => {
  const [methods, setMethods] = useState([]);
  const [newMethod, setNewMethod] = useState('');
  const [obj,setObj] = useState(null)

  useEffect(() => {
    const save = JSON.parse(localStorage.getItem('savedPaymentMethods')) || [];
    const saved = ['Card ending 1234','UPI - ayush@upi','SBI Account ending 6789'];
    setMethods(saved);
  }, []);


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


  const handleAdd = () => {
    if (newMethod.trim() === '') return;
    const updated = [...methods, newMethod];
    setMethods(updated);
    localStorage.setItem('savedPaymentMethods', JSON.stringify(updated));
    setNewMethod('');
  };

  const handleRemove = (index) => {
    const updated = methods.filter((_, i) => i !== index);
    setMethods(updated);
    localStorage.setItem('savedPaymentMethods', JSON.stringify(updated));
  };

  return (
    <>
    {
      obj == null ?
<h1 style={{ color: "white",textAlign:'center',marginTop:'160px'}}><a href="/login">Please login first</a></h1>
      :

    <div className="saved-methods-container">
      <h2>Saved Payment Methods</h2>

      {methods.length === 0 ? (
        <p>No payment methods saved.</p>
      ) : (
        <ul className="method-list">
          {methods.map((method, index) => (
            <li key={index}>
              {method}
              <button onClick={() => handleRemove(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <div className="add-method">
        <input
          type="text"
          value={newMethod}
          onChange={(e) => setNewMethod(e.target.value)}
          placeholder="Enter new method (e.g. Card ending 1234)"
        />
        <button onClick={handleAdd}>Add Method</button>
      </div>
    </div>
}
    </>
  );
};

export default SavedPaymentMethods;
