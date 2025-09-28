import React, { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import "../Css/components/Navbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../Redux-Toolkit/mySlice";

const Navbar = () => {
  const [category, setCategory] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [show1, setShow1] = useState(false);
  const [showheight, setShowHeight] = useState(false);
  const [hide1, setHide1] = useState(true);
  const [obj, setObj] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.all.count);

  const information = async () => {
    try {
      const res = await axios.get('https://ecommerce-backend-qotf.onrender.com/user');
      setObj(res.data);
    } catch (err) {
      setObj(null);
    }
  };

  const apicalling = async () => {
    const st = await axios.get("https://fakestoreapi.com/products/categories");
    setCategory(st.data);
  };

  useEffect(() => {
    information();
    apicalling();
  }, []);

  const Admin = () => {
    navigate('/admin');
  };

  const home = () => {
    setShow1(false);
    setHide1(true);
    setShowHeight(false);
    navigate('/');
  };

  const inputSubmit = () => {
    navigate(`/search/${inputVal}`);
  };

  const cart = () => {
    navigate('/cart');
  };

  const submit = () => {
    dispatch(openSidebar());
  };

  const handleLogout = async () => {
    const ask = window.confirm("Are you sure you want to logout?");
    if (ask) {
      await axios.get("https://ecommerce-backend-qotf.onrender.com/logout");
      setObj(null);
      navigate("/");
    }
  };

  return (
    <>
      <div className="navbar-wrapper">
        <div className={`navbar-top ${showheight ? "open" : ''}`}>
          <button
            onClick={submit}
            style={{
              position: 'absolute',
              top: '39px',
              left: '10px',
              zIndex: 1100,
              background: 'blue',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}>
            ☰
          </button>
          <h1 className="logo">My Shop</h1>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search Products..."
              onChange={(q) => setInputVal(q.target.value)}
              style={{ color: "white" }}
            />
            <FaSearch className="search-icon" style={{ cursor: 'pointer' }} onClick={inputSubmit} />
          </div>

          <div className="nav-buttons">
            {/* Cart icon always visible */}
            <div className="cart-container" onClick={cart}>
              <FaShoppingCart className="cart-icon" />
              <span className="cart-count">{count}</span>
            </div>

            {/* Conditional Buttons based on login */}
            {!obj ? (
              <>
                <button className="btn profile" onClick={() => navigate("/login")}>Login</button>
                <button className="btn logout" onClick={() => navigate("/register")}>Register</button>
              </>
            ) : (
              <>
                <button className="btn admin" onClick={Admin}>Admin</button>
                <button className="btn logout" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
