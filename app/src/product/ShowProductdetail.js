import React from 'react';
import '../Css/Product/ShowProductdetail.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { summary } from '../Redux-Toolkit/mySlice';

const ShowProductdetail = () => {
  const location = useLocation();
  const [products, setProducts] = useState([])
  const [selectedRating, setSelectedRating] = useState();
  const [totalRating, setTotalRating] = useState(5);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const[obj,setObj] = useState(null)
  
  const information = async() => {
   try {
    const res = await axios.get('http://localhost:5000/user');
    setObj(res.data);
  } catch (err) {
    setObj(null); 
  }  
  }
  useEffect(()=>{
information()
  },[])

  const cart = () => {
    if(obj == null)
    {
        navigate('/login')
    }
    else{
    navigate('/cart')
    }
  }


  const getStarStyle = (fillPercent) => ({
    position: "relative",
    display: "inline-block",
    fontSize: "30px",
    color: "gray",
  });

  const getStarFill = (fillPercent) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: `${fillPercent}%`,
    overflow: "hidden",
    color: "gold",
  });


  const product = location.state?.product;
  const category = product.category;

  const pay = () => {
    if(obj == null){return(navigate('/login'))};
    dispatch(summary(product))
    navigate('/cap');
  }

  const apicalling = async () => {
    const st = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    setProducts(st.data);
  };

  useEffect(() => {
    setSelectedRating(product.rating.rate)

    apicalling();
  }, []);

  return (
    <>
      <div className="product-card">
        <img src={product.image} alt={product.title} className="product-img" />

        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-desc">{product.description}</p>
          <div class="stars" id="starRating">
            <h3 className="product-price" style={{ marginTop: '5px', marginLeft: '20px' }}> {Math.round(product.rating.rate)} </h3>

            <div style={{ display: "flex", gap: "5px" }}>
              {Array.from({ length: totalRating }).map((_, index) => {
                const starNumber = index + 1;
                let fillPercent = 0;

                if (selectedRating >= starNumber) {
                  fillPercent = 100;
                } else if (selectedRating + 1 > starNumber) {
                  fillPercent = (selectedRating - index) * 100; // fractional fill
                }

                return (
                  <div key={index} style={getStarStyle(fillPercent)}>
                    <span >★</span>
                    <span style={getStarFill(fillPercent)}>★</span>
                  </div>
                );
              })}
            </div>

          </div>

          <h3 className="product-price">{product.price} ₹</h3>

          <div className="product-buttons">
            <button className="buy-now"onClick={pay}>Buy Now</button>
            <button className="add-to-cart" onClick={cart}>Go To Cart</button>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: '45px', color: 'white', textAlign: 'center' }}>Related Products</h2>

      <div style={{ backgroundColor: "#000", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#111",
                color: "white",
                padding: "15px",
                width: "300px",
                borderRadius: "10px",
                boxShadow: "0 0 10px #000",
                border: "2px solid yellow",
                display: "flex",
                flexDirection: "column",
                height: "320px", // fixed height for uniformity
                overflow: "hidden",
              }}
            >

              <img
                src={product.image}
                alt={product.title}
                style={{
                  height: "180px",
                  width: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h3
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {product.title.length > 50
                  ? product.title.slice(0, 40) + "..."
                  : product.title + '...'}
              </h3>

              {/* Push price + button to bottom */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "auto", // this makes it align bottom
                }}
              >
                <span
                  style={{
                    backgroundColor: "#007bff",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                  }}
                >
                  {Math.round(product.price)} ₹
                </span>
                <button
                  style={{
                    backgroundColor: "#ffc107",
                    color: "black",
                    fontWeight: "bold",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowProductdetail;
