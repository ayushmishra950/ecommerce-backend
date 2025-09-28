import React, { useState, useEffect } from "react";
import "../Css/Profile/Filter.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const [filters, setFilters] = useState({
    price: { min: "", max: "" },
    categories: [],
    rating: ""
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    setCategory(response.data);
  };

  const handleCategoryChange = (cat) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(item => item !== cat)
        : [...prev.categories, cat]
    }));
  };

  const handleReset = () => {
    setFilters({
      price: { min: "", max: "" },
      categories: [],
      rating: ""
    });
  };



  const handlePriceChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [type]: value
      }
    }));
  };

  const handleRatingChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      rating: value
    }));
  };

    const handleApply = async() => {
      const st = await axios.post('https://ecommerce-backend-qotf.onrender.com/filter',filters)
      console.log(st.data);
      navigate('/filter/child',{
        state : {
          obj : st.data
        }
      })
      
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="sidebar-filter">
      <h3>Filters</h3>

      <div className="filter-section">
        <label>Price Range:</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.price.min}
            onChange={(e) => handlePriceChange("min", e.target.value)}
          />
          <span> - </span>
          <input
            type="number"
            placeholder="Max"
            value={filters.price.max}
            onChange={(e) => handlePriceChange("max", e.target.value)}
          />
        </div>
      </div>

      <div className="filter-section">
        <label>Category:</label>
        {category.map((cat) => (
          <div key={cat}>
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() => handleCategoryChange(cat)}
            />
            <span>{cat}</span>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <label>Rating:</label>
        {[4, 3, 2, 1].map((rate) => (
          <div key={rate}>
            <input
              type="radio"
              name="rating"
              value={rate}
              checked={filters.rating === `${rate}`}
              onChange={(e) => handleRatingChange(e.target.value)}
            />
            <span>{rate}★ & above</span>
          </div>
        ))}
      </div>

      <div className="filter-buttons">
        <button onClick={handleApply}>Apply</button>
        <button onClick={handleReset} className="reset">Reset</button>
      </div>
    </div>
  );
};

export default Filter;
