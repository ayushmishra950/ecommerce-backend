import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Cash/CashSummary.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCash } from '../Redux-Toolkit/mySlice';

const CashSummary = () => {
  const navigate = useNavigate();
    const cart = useSelector((state) => state.all.summary_cart)
     const dispatch = useDispatch();
        const [deliveryCharge,setdeliveryCharge] = useState(200);
    const [totalAmount,setTotalAmount] = useState(0 || Math.round(cart.price +deliveryCharge));

  const handleProceedToPayment = () => {
    dispatch(setCash(true));
    navigate('/pay',{
      state : {
        total : totalAmount
      }
    });
  };

  const address = localStorage.getItem('address') || 'No address provided';


  return (
    <div className="summary-container2">
      <h2 style={{textAlign:'center'}}>Order Summary</h2>
      {
             <div className="product-summary">
        <img
          src={cart.image}
          alt="Cool Headphones"
          className="product-image"
        />
        <div className="product-details">
          <h3>Cool Headphones {cart.title}</h3>
          <p>Price: ₹{cart.price}</p>
          <p>Quantity: {cart.qty}</p>
          <p>Delivery Charges: ₹{deliveryCharge}</p>
        </div>
      </div>
      }
     

      <div className="address-summary">
        <h4>Delivery Address:<p>{address}</p></h4>
        
      </div>

      <div className="total-summary">
        <h3>Total Amount: ₹{totalAmount}</h3>
      </div>

      <button className="proceed-btn" onClick={handleProceedToPayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default CashSummary;
