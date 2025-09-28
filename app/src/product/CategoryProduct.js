import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { increment } from "../Redux-Toolkit/mySlice";
import { CartPopupManager } from "../Popup/CartPopupManager";


const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [obj, setObj] = useState(null)

  const navigate = useNavigate();
  const { name } = useParams()
  const dispatch = useDispatch();

  const information = async () => {
    try {
      const res = await axios.get('http://localhost:5000/user');
      setObj(res.data);
    } catch (err) {
      setObj(null);
    }
  }
  useEffect(() => {
    information()
  }, [])

  const handleAddToCart = (product) => {
    if(obj == null)
    {
        navigate('/login')
    }
    else{
    dispatch(increment(product))
    window.showCartPopup("✅ Item A added to cart!")
  }
}


  const apicalling = async () => {
    const st = await axios.get(`https://fakestoreapi.com/products/category/${name}`);
    setProducts(st.data);
  };


  const shareProduct = (product, index) => {
    navigate('/show', {
      state: { product }
    })
  }

  useEffect(() => {
    apicalling();
  }, [name]);
  return (
    <div>
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
              className="pt"
              key={index}
              style={{
                backgroundColor: "#111",
                color: "white",
                padding: "15px",
                cursor: 'pointer',
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
                  cursor: 'pointer',
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <h3
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: 'pointer',
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
                  cursor: 'pointer',
                  marginTop: "auto", // this makes it align bottom
                }}
              >
                <span
                  onClick={() => { shareProduct(product, index) }}
                  style={{
                    backgroundColor: "#007bff",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: 'pointer',
                    fontWeight: "bold",
                  }}
                >
                  {Math.round(product.price)} ₹
                </span>
                <button
                  onClick={() => { handleAddToCart(product) }}
                  style={{
                    backgroundColor: "#ffc107",
                    color: "black",
                    fontWeight: "bold",
                    border: "none",
                    padding: "6px 12px",
                    cursor: 'pointer',
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
      <CartPopupManager />

    </div>
  )
}

export default CategoryProduct