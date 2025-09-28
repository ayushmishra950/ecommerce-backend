import React from 'react';
import '../Css/Cash/SuccessPage.css';

const SuccessPage = () => {
  const orderId = Math.floor(Math.random() * 1000000);

  return (
    <div className="success-container">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Thank you for your purchase.</p>
      <p>Your Order ID is: <strong>#{orderId}</strong></p>
      <p>Estimated Delivery: 4-6 business days</p>
    </div>
  );
};

export default SuccessPage;
