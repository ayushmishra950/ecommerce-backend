import React from 'react';
import '../Css/Shoper/TotalOrder.css';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TotalOrder = () => {
  const navigate = useNavigate();

  const cartItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      title: 'Xiaomi Pad 6',
      price: 14599,
      quantity: 1
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/50',
      title: 'boAt Atom 83',
      price: 1597,
      quantity: 1
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/50',
      title: 'realme NARZO 70x',
      price: 11999,
      quantity: 1
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="main-container">
      <h2 className="heading">Welcome,Superman</h2>
      <h3 className='heading'>superman@gmail.com</h3>
            <h1 className="heading">Total Order's = 4</h1>

      <div className="summary-container">
        <div className="product-table">
          <h3 className="table-title"> Order items</h3>
          <table>
            <thead>
              <tr>
                <th>Product Img</th>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.title} /></td>
                  <td>{item.title}</td>
                  <td>{item.price} ₹</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan="2"><strong>Total</strong></td>
                <td colSpan="1"><strong>{total} ₹</strong></td>
                <td colSpan="1">
                  <input type="text" value={cartItems.length} readOnly />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="shipping-info">
          <h3>Order Detail && Shipping Address</h3>
          <p><strong>Order Id :</strong> Superman</p>
          <p><strong>Payment Id :</strong> Superman</p>
          <p><strong>Payment Status :</strong> Superman</p>
          <p><strong>Order Date :</strong> Superman</p>
          <p><strong>Name :</strong> Superman</p>
          <p><strong>Phone :</strong> 9752987361</p>
          <p><strong>Country :</strong> India</p>
          <p><strong>State :</strong> Madhya Pradesh</p>
          <p><strong>City :</strong> Sehore</p>
          <p><strong>PinCode :</strong> 466114</p>
          <p><strong>Near By :</strong> Kotri Kalan, Ashta, Near, Indore Road, Bhopal, MP 466114</p>
        </div>

      </div>


    </div>
  );
};

export default TotalOrder;
