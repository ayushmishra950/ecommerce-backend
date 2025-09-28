import React, { useEffect, useState } from 'react';
import '../Css/Shoper/OrderSummery.css';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { item, qtydecrement, qtyincrement, remove, setCash } from '../Redux-Toolkit/mySlice';
import { CartPopupManager } from '../Popup/CartPopupManager';

const OrderSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const cart = useSelector((state) => state.all.cart)
  const location = useLocation();
  const obj = location.state.obj;

  const qtysplus = (item) => {
    dispatch(qtyincrement(item))
    window.showCartPopup("🔼 Item A quantity increased!")
  }

  const qtyminus = (item) => {
    dispatch(qtydecrement(item))
    window.showCartPopup("🔽 Item A quantity decreased!")
  }

  const removeitem = (item) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");

    if (isConfirmed) {
      dispatch(remove(item))
      window.showCartPopup("➖ Item A removed from cart!")

    } else {
      alert("Delete cancelled.");
    }
  }


  let qty = 0;
  let total = 0;
  const qtyplus = () => {
    cart.map((v) => {
      qty += v.qty;
      total += v.totalprice
    })
    setQuantity(qty);
    setTotalPrice(total);
  }

  const submit = () => {
    dispatch(item(cart))
     dispatch(setCash(false))
    navigate('/pay', {
      state: {
        total: totalPrice,
        obj: obj,
      }
    })
  }

  useEffect(() => {
    qtyplus()
  }, [cart])

  return (
    <div className="main-container">
      {
        cart.length === 0 ?
          <h1>No Products...</h1>

          :
          <>
            <h1 className="heading">Order Summary</h1>
            <div className="summary-container">
              {/* Product Table */}
              <div className="product-table">
                <h3 className="table-title">Product's Detail</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Product Img</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total Price</th>
                      <th style={{ width: '40px' }}>Qty--</th>
                      <th>Qty++</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.id}>
                        <td><img src={item.image} alt={item.title} /></td>
                        <td>{item.title.slice(1, 500) + '...'}</td>
                        <td style={{ width: '65px' }}>{item.price} ₹</td>
                        <td>{item.qty}</td>
                        <td>{item.totalprice}</td>

                        <td>
                          <div className="circle-icon" onClick={()=>{qtyminus(item)}}>
                            <FaMinus className="icon-btn" />
                          </div></td>
                        <td>
                          <div className="circle-icon" onClick={()=>{qtysplus(item)}}>
                            <FaPlus className="icon-btn" />
                          </div>                    </td>
                        <td>
                          <div className="circle-icon" onClick={()=>{removeitem(item)}}>
                            <FaTrash className="icon-btn" />
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td colSpan="2"><strong>Total</strong></td>
                      <td colSpan="1"></td>
                      <td colSpan="1">
                        <input type="text" value={quantity} readOnly />
                      </td>
                      <td colSpan="1"> <input type="text" value={totalPrice + ' ₹'} readOnly /></td>
                      <td colSpan="1"></td>
                      <td colSpan="1"></td>
                      <td colSpan="1"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Shipping Info */}
              <div className="shipping-info">
                <h3>Shipping Address</h3>
                <p><strong>Name :</strong> {obj.name}</p>
                <p><strong>Phone :</strong> {obj.phone}</p>
                <p><strong>Country :</strong> {obj.country}</p>
                <p><strong>State :</strong>{obj.state}</p>
                <p><strong>City :</strong> {obj.city}</p>
                <p><strong>PinCode :</strong> {obj.pin}</p>
                <p><strong>Near By :</strong>{obj.AddressLine}</p>
              </div>

            </div>
            <button className='submit' onClick={submit}>Proceed To Pay</button>
            <CartPopupManager />

          </>

      }



    </div>
  );
};

export default OrderSummary;
