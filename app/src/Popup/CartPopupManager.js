import React, { useState } from "react";
import CartPopup from "./CartPopup";
import "../Css/Popup/CartPopup.css";

let popupId = 0;

export const CartPopupManager = () => {
  const [popups, setPopups] = useState([]);

  const showPopup = (message) => {
    const id = popupId++;
    setPopups((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((popup) => popup.id !== id));
    }, 5000);
  };

  // Expose function to window (optional but useful for demo/testing)
  window.showCartPopup = showPopup;

  return (
    <div className="cart-popup-container">
      {popups.map((popup) => (
        <CartPopup key={popup.id} message={popup.message} />
      ))}
    </div>
  );
};
