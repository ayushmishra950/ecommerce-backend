import React, { useEffect, useState } from 'react';
import '../Css/Product/TotalCart.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, qtydecrement, qtyincrement, remove } from '../Redux-Toolkit/mySlice';
import { useNavigate } from 'react-router-dom';
import { CartPopupManager } from '../Popup/CartPopupManager';


const TotalCart = () => {
  const cart = useSelector((state) => state.all.cart)
  const [qty, setQty] = useState();
  const [price, setPrice] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  let totalQty = 0;
  let totalPrice = 0;
  const total = () => {
    cart.map((v) => {
      totalQty += v.qty;
      totalPrice += v.totalprice
    })
    setQty(totalQty);
    setPrice(totalPrice);
  }

  const Check = () => {
    navigate('/shipping')
  }

  const qtyplus = (item) => {
dispatch(qtyincrement(item))
window.showCartPopup("🔼 Item A quantity increased!")
  }

  const qtyminus = (item) => {
    dispatch(qtydecrement(item))
    window.showCartPopup("🔽 Item A quantity decreased!")
  }

  const removeitem = (item) => {
    dispatch(remove(item))
    window.showCartPopup("➖ Item A removed from cart!")
  }
  useEffect(() => {
    total()
  }, [cart])


  return (
    <div className="cart-container">

      {
        cart == '' ?
          <h1 style={{ color: 'white', textAlign: 'center', marginTop: '150px' }}>No Products...</h1>
          :
          <>
            <div className="summary-wrapper">
              <button className="btn-summary qty">Total Qty : {qty}</button>
              <button className="btn-summary price">Total Price : {price} ₹</button>
            </div>
            <br /> <br /> <br /><br />

            {cart.map(item => (
              <div className="cart-wrapper">
                <div className="cart-item">
                  <img src={item.image} alt={item.name} className="product-image" />

                  <div className="product-details">
                    <h3> {item.title.slice(1, 100) + '...'}</h3>
                    <p>Price : {item.price} ₹</p>
                    <p>TotalPrice : {item.totalprice} ₹</p>
                    <p>Qty : {item.qty}</p>
                  </div>

                  <div className="product-actions">
                    <button className="btn yellow" onClick={() => {qtyminus(item)}}>Decrease Qty (-)</button>
                    <button className="btn blue" onClick={() => { qtyplus(item) }}>Increase Qty (+)</button>
                    <button className="btn red" onClick={() => { removeitem(item)}}>Remove</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="summary-wrapper" style={{ marginTop: '50px' }}>
              <button className="btn-summary qty" style={{ backgroundColor: '#ffc107', cursor: 'pointer' }} onClick={Check}>Check Out</button>
              <button className="btn-summary price" onClick={() => { dispatch(clearCart()) }} style={{ backgroundColor: '#f44336', color: 'white', cursor: 'pointer' }}>Clear Cart</button>
            </div>

            <CartPopupManager />
          </>
      }

    </div>
  );
};

export default TotalCart;
