import React, { useState } from 'react';
import '../Css/Shoper/ShippingAddress.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShippingAddress = () => {
  const navigate = useNavigate();

  const [obj, setObj] = useState({
    name: '',
    country: '',
    state: '',
    city: '',
    pin: '',
    phone: '',
    AddressLine: ''
  });

  const [errors, setErrors] = useState({});

  const InputValue = (e) => {
    const { name, value } = e.target;
    setObj({ ...obj, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!obj.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (obj.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!obj.country.trim()) newErrors.country = 'Country is required';
    if (!obj.state.trim()) newErrors.state = 'State is required';
    if (!obj.city.trim()) newErrors.city = 'City is required';

    if (!obj.pin.trim()) {
      newErrors.pin = 'Pin is required';
    } else if (!/^\d{6}$/.test(obj.pin)) {
      newErrors.pin = 'Pin must be exactly 6 digits';
    }

    if (!obj.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(obj.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (!obj.AddressLine.trim()) newErrors.AddressLine = 'Address is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submit = () => {
    if (validate()) {
      navigate('/checkout', {
        state: { obj: obj }
      });
    }
  };

 const out = async() => {
   try {
    const res = await axios.get('https://ecommerce-backend-qotf.onrender.com/user');
     const prefilledObj = {
    name: res.data.name,
    country: 'India',
    state: 'Rajasthan',
    city: 'Jaipur',
    pin: '302012',
    phone: res.data.phone,
    AddressLine: `${res.data.address}`
  };

  setObj(prefilledObj);
  navigate('/checkout', {
    state: { obj: prefilledObj }
  });

  } catch (err) {
    console.log(err);
    
  }
 
};


  return (
    <div className='shipping-container'>
      <div className='ship'>
        <h1>Shipping Address</h1>

        <label className='label-left'>Full Name</label>
        <label className='label-mid' style={{marginLeft:'202px'}}>Country</label>
        <label className='label-right' style={{marginLeft:'222px'}}>State</label>
        <br />
        <input type='text' name='name' onChange={InputValue} value={obj.name} className='input-box' />
        <input type='text' name='country' onChange={InputValue} value={obj.country} className='input-box' />
        <input type='text' name='state' onChange={InputValue} value={obj.state} className='input-box' />
        <br />
        <div className='error-row'>
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div className='error-row'>
          {errors.country && <span style={{marginLeft:'277px',marginTop:'-22px',float:'left'}}>{errors.country}</span>}
          {errors.state && <span className='error-gap' style={{marginLeft:'550px',marginTop:'-22px',float:'left'}}>{errors.state}</span>}
        </div>

        <br />

        <label className='label-left'>City</label>
        <label className='label-mid' style={{marginLeft:'250px'}}>Pincode</label>
        <label className='label-right' style={{marginLeft:'218px'}}>Phone Number</label>
        <br />
        <input type='text' name='city' onChange={InputValue} value={obj.city} className='input-box' />
        <input type='text' name='pin' onChange={InputValue} value={obj.pin} className='input-box' />
        <input type='text' name='phone' onChange={InputValue} value={obj.phone} className='input-box' />
        <br />
        <div className='error-row'>
          {errors.city && <span>{errors.city}</span>}
          {errors.pin && <span className='error-gap' style={{marginLeft:'180px'}}>{errors.pin}</span>}
          {errors.phone && <span className='error-gap' style={{marginLeft:'189px'}}>{errors.phone}</span>}
        </div>

        <br />

        <label className='label-left'>AddressLine/Nearby</label>
        <br />
        <input type='text' name='AddressLine' onChange={InputValue} value={obj.AddressLine} className='address-input' />
        {errors.AddressLine && <div className='error-row'>{errors.AddressLine}</div>}

        <br /><br />
        <button onClick={submit} className='submit-btn'>Submit</button>
        <br /><br />
        <button onClick={out} className='use-old-btn'>Use Old Address</button>
      </div>
    </div>
  );
};

export default ShippingAddress;
