import React from "react";
import "../Css/Profile/Wishlist.css";
import {MdFavorite} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {remove } from '../Redux-Toolkit/mySlice';


const Wishlist = () => {
      const cart = useSelector((state)=>state.all.cart)
      const dispatch = useDispatch();
    
  return (
    <div className="wishlist-container">
      <h1 className="wishlist-heading"><MdFavorite style={{color:'red'}} /> My Wishlist</h1>
      {
        cart == '' ?
        <h2 style={{color : 'white',textAlign : 'center',marginTop : '50px'}}>No Products...</h2>
         :
      
      <div className="wishlist-items">
        {cart.map((item) => (
          <div key={item.id} className="wishlist-card">
            <img src={item.image} alt={item.title} className="wishlist-img" />
            <div className="wishlist-info">
              <h3>{item.title}</h3>
              <p>₹{item.price}</p>
              <button className="remove-btn" onClick={()=>{dispatch(remove(item))}}>Remove</button>
            </div>
          </div>
        ))}
      </div>
}
    </div>
  );
};

export default Wishlist;
