import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CartPopupManager } from "../Popup/CartPopupManager";
import { useDispatch } from "react-redux";
import { increment } from "../Redux-Toolkit/mySlice";

const Filter_Child = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const obj = location?.state?.obj;

  const handleAddToCart = (product) => {
    if (!token) return navigate("/login");
    dispatch(increment(product));
    window.showCartPopup("✅ Item A added to cart!");
  };

  const productList = async () => {
    const store = await axios.get("https://fakestoreapi.com/products");
    setProducts(store.data);
    setProduct(obj.data);
    console.log(product);
  };

  const submit = (product) => {
    navigate("/show", {
      state: {
        product: product,
      },
    });
  };

  useEffect(() => {
    productList();
  }, []);

  return (
    <>
    {
        product == null ?
          <h1 style={{ color: 'white', textAlign: 'center', marginTop: '150px' }}>No Products...</h1>

        :
        <>
         <button onClick={()=>{navigate('/')}} style={{marginLeft:'1100px',width:'120px',height:'29px',borderRadius:'15px',background:' #fce4ec',color:'#ec407a',cursor:'pointer'}}>Reset Filters</button>
      <div style={{ backgroundColor: "#000", padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {product.map((product, index) => (
            <div
              className="pt"
              key={index}
              style={{
                backgroundColor: "#1E1E1E",
                color: "white",
                cursor: "pointer",
                padding: "15px",
                width: "300px",
                borderRadius: "10px",
                boxShadow: "0 0 10px #000",
                border: "2px solid yellow",
                display: "flex",
                flexDirection: "column",
                height: "340px",
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

              {/* Product Title */}
              <h3
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {product.title.length > 50
                  ? product.title.slice(0, 40) + "..."
                  : product.title + "..."}
              </h3>

              {/* Rating and Category */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 10px",
                  marginBottom: "10px",
                }}
              >
                <span style={{ color: "#0f0", fontWeight: "bold" }}>
                  ⭐ {product.rating.rate}
                </span>
                <span style={{ color: "#aaa", fontStyle: "italic" }}>
                  {product.category}
                </span>
              </div>

              {/* Price and Add to Cart */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "auto",
                }}
              >
                <span
                  onClick={() => {
                    submit(product);
                  }}
                  style={{
                    backgroundColor: "#007bff",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {Math.round(product.price)} ₹
                </span>
                <button
                  onClick={() => {
                    handleAddToCart(product);
                  }}
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
    }
   
    </>
  );
};

export default Filter_Child;
