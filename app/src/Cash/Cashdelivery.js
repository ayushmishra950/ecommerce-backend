import React, { useEffect, useState } from 'react';
import '../Css/Shoper/Orderdeliver.css';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Cashdelivery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart2 = useSelector((state) => state.all.summary_cart) || [];
  const [deliveryCharge,setdeliveryCharge] = useState(200);
  
  const obj = useLocation().state?.obj || {};
  const obj2 = useLocation().state?.obj2 || {};

  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const submit = () =>{
     navigate('/');dispatch()};
  const submit2 = () => { /* Future use */ };

  return (
    <div className="main-container">
      <h1 className="heading">Your Order has been Confirmed</h1>
      <h2 className='heading'>It will be delivered in 4 - 5 days</h2>

      <div className="summary-container">
        <div className="product-table">
          <h3 className="table-title">Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product Img</th>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th>
                <th>deliveryCharge</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
                <tr key={cart2.id}>
                  <td><img src={cart2.image} alt={cart2.title} /></td>
                  <td>{cart2.title}</td>
                  <td style={{ width: '80px' }}>{cart2.price} ₹</td>
                  <td>{cart2.qty}</td>
                  <td>-</td>
                  <td>{cart2.totalprice} ₹</td>
                </tr>
              <tr className="total-row">
                <td colSpan="1"></td>
                <td colSpan="1"><strong>Total</strong></td>
                <td colSpan="1"></td>
                <td colSpan="1">
                  <input type="text" value={cart2.qty} readOnly />
                </td>
                <td colSpan="1">{deliveryCharge}</td>
                <td colSpan="1"><strong>{cart2.price + deliveryCharge} ₹</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 📦 Shipping Info */}
        <div className="shipping-info">
          <h3>Order Details & Shipping Address</h3>
          <p><strong>Order Id:</strong> {obj2.Order_Id}</p>
          <p><strong>Payment Id:</strong> {obj2.Payment_Id}</p>
          <p><strong>Payment Status:</strong> {obj2.Payment_Status}</p>
          <p><strong>Order Date:</strong> {obj2.order_Date}</p>
          <p><strong>Name:</strong> {obj.name}</p>
          <p><strong>Phone:</strong> {obj.phone}</p>
          <p><strong>Country:</strong> {obj2.country}</p>
          <p><strong>State:</strong> {obj.state}</p>
          <p><strong>City:</strong> {obj.city}</p>
          <p><strong>PinCode:</strong> {obj.pin}</p>
          <p><strong>Near By:</strong> {obj.AddressLine}</p>
        </div>
      </div>

      <button className='submit' onClick={submit}>Continue Shopping</button>
      <button className='submit2' onClick={submit2}>All Orders</button>
    </div>
  );
};

export default Cashdelivery;
