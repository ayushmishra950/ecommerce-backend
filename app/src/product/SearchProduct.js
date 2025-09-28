import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const SearchProduct = () => {
     const [products, setProducts] = useState([]);
     const{name} = useParams()
     const navigate = useNavigate();
     

  const apicalling = async () => {
    const st = await axios.get(`https://fakestoreapi.com/products/category/${name}`);
    setProducts(st.data);
    console.log(st.data);
  };
  const submit = (product) => {
    navigate('/show',{
        state : {
            product :product
        }
    })}

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
            key={index}
            onClick={()=>{submit(product)}}
            style={{
              backgroundColor: "#111",
              color: "white",
              padding: "15px",
              width: "300px",
              cursor : 'pointer',
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
    </div>
  )
}

export default SearchProduct