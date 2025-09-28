import React, { useEffect, useState } from "react";

const CartPopup = ({ message }) => {
  const [progress, setProgress] = useState(0); // Start from 0

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    const timer = setTimeout(() => {
      // optional: can emit close callback if needed
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="cart-popup show">
      <div>{message}</div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default CartPopup;
