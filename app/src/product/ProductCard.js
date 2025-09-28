import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartPopupManager } from "../Popup/CartPopupManager";
import { useDispatch } from "react-redux";
import { increment } from "../Redux-Toolkit/mySlice";



const ProductCard = () => {
    const[products,setProducts] = useState([]);
    const dispatch = useDispatch();
      const token = (localStorage.getItem('token'));
          const[obj,setObj] = useState(null)
    const navigate = useNavigate();

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


   const handleAddToCart = (product) => {
      if(!obj){return(navigate('/login'))};
    dispatch(increment(product))
    window.showCartPopup("✅ Item A added to cart!")
   };


    const productList = async() => {
    const store = await axios.get('https://fakestoreapi.com/products');
    setProducts(store.data)
    
  }

  const submit = (product) => {
    navigate('/show',{
        state : {
            product :product
        }
    })
  }
  useEffect(()=>{
    productList()
  },[])
    return(
        <>
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
              backgroundColor: "##1E1E1E",
              color: "white",
              cursor :'pointer',
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
              onClick={()=>{submit(product)}}
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
             onClick={()=>{handleAddToCart(product)}}
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
 <CartPopupManager />
  </>
)};
export default ProductCard;
