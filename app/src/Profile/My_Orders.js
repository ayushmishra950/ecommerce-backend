import React, { useEffect, useState } from 'react';
import "../Css/Profile/My_Orders.css";
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const My_Orders = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.all.OrderCart)
 const[quantity,setQuantity] = useState();
  const [totalPrice,setTotalPrice] = useState();



   let qty = 0;
    let total = 0;
  const qtyplus = () =>{
    cart.map((v)=>{
      qty += v.qty;
      total += v.totalprice
    })
     setQuantity(qty);
     setTotalPrice(total);
  }

  const submit = () => {
    navigate('/')
  }
  const submit2 = () => {
  }
  useEffect(()=>{
    qtyplus()
  },[cart])

  
  return (
    <>
    {cart == ''?  
    <h1 style={{color : 'white',textAlign : 'center',marginTop : '150px'}}>No Orders...</h1>
    : 
      <div className="summary-container4">
        <div className="product-table">
          <h3 className="table-title"> Order items</h3>
          <table>
            <thead>
              <tr>
                <th>Product Img</th>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th> 
               <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td><img src={item.image} alt={item.title} /></td>
                  <td>{item.title}</td>
                  <td style={{width:'80px'}}>{item.price} ₹</td>
                  <td>{item.qty}</td>
                 <td>{item.totalprice} ₹</td>
                </tr>
              ))}
              <tr className="total-row">
               <td colSpan="1"></td>
                <td colSpan="1"><strong>Total</strong></td>
                <td colSpan="1"></td>
                <td colSpan="1">
                  <input type="text" value={quantity} readOnly />
                </td>
             <td colSpan="1"><strong>{totalPrice} ₹</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
}
    </>
  );
};

export default My_Orders;
