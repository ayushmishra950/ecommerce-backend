import "../Css/components/Navbar.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";


const CategoryButton = () => {
      const [category, setCategory] = useState([]);
      const navigate = useNavigate();

      const apicalling = async () => {
    const st = await axios.get("https://fakestoreapi.com/products/categories");
    setCategory(st.data);
  };
   
  const tms = () =>{
    navigate(`/`)
  }

  const tms2 = (v) =>{
    navigate(`/category/${v}`)
  }


  useEffect(() => {
      apicalling();
    }, []);

  return (
    <div>
         <button className="btn2" onClick={tms}>home</button>
     {
        category.map((v)=>{
return(  
    <>
    <button className="btn2" onClick={()=>{tms2(v)}}>{v}</button>
    </>
)
        })
      }
    </div>
  )
}

export default CategoryButton