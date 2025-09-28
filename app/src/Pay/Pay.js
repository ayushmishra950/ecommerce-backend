import "../Css/Pay/Pay.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";


const Pay = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [allMethod, setAllMethod] = useState({ upi: '', holder_name: '', card_number: '', expiry: '', cvv: '', bank_name: '' });

  const [showPinInput, setShowPinInput] = useState(false); // Controls visibility of PIN input
  const [pin, setPin] = useState(''); // Stores the entered PIN
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Controls visibility of success message
  const [transactionName, setTransactionName] = useState();
  const [transactioId, setTransactioId] = useState();

  const [obj2, setObj2] = useState({
    Order_Id: '',
    Payment_Id: '',
    Payment_Status: 'Paid',
    order_Date: '',
    country: 'India',
  })

  const [userInfo, setUserInfo] = useState({ name: '', phone: '', state: '', city: '', pin: '', AddressLine: ''});


    const information = async() => {
   try {
    const res = await axios.get('https://ecommerce-backend-qotf.onrender.com/user');
    console.log(res.data.name);
     setUserInfo({
    name : res.data.name,
  phone : res.data.phone,
    state : 'Rajasthan',
    city : 'Jaipur',
    pin : '212067',
    AddressLine : res.data.address,
  
      });
  } catch (err) {
    console.log(err); 
  }
  }

  useEffect(()=>{
information()
  },[])
  

  const location = useLocation();
const totalAmount = location?.state?.total ?? 5000;
  const obj = location?.state?.obj ?? userInfo;
  const navigate = useNavigate();
      const Cash_deliver = useSelector((state) => state.all.Cash_deliver)


  const Transfer = () => {
    if(Cash_deliver === true){
  navigate('/Cash_deliver', {
      state: {
        obj: obj,
        obj2: obj2,
      }
    })
    }

    else{
       navigate('/deliver', {
      state: {
        obj: obj,
        obj2: obj2,
      }
    })
    }
  }

  const randomString = (length) => {
    return Math.random().toString(36).substring(2, 2 + length).toUpperCase();
  };

  const generateUPITransactionId = () => {
    return 'UPI' + Date.now().toString().slice(-6) + randomString(4);
  };

  const generateCardTransactionId = () => {
    return 'CARD_' + randomString(6) + '_' + Date.now();
  };

  const generateBankTransactionId = () => {
    const bankCode = 'SBIN';
    return bankCode + 'R' + new Date().getFullYear() + randomString(8);
  };

  const generateOrderId = () => {
    return 'ORD' + Date.now().toString().slice(-6) + randomString(4);
  };


  const inputValue = (q) => {
    q.preventDefault();
    setAllMethod({ ...allMethod, [q.target.name]: q.target.value })
  }
  const handlePaymentSubmit = () => {
    if (selectedMethod === "card") {

      if (allMethod.card_number !== '' && allMethod.cvv !== '' && allMethod.expiry !== '' && allMethod.holder_name !== '') {
        setShowPinInput(true);
        setTransactionName(selectedMethod);
        setTransactioId(generateCardTransactionId());
        obj2.Payment_Id = generateCardTransactionId();
      }
      else {
        alert('please All input are fill');
      }
    }

    if (selectedMethod === "netbanking") {
      if (allMethod.bank_name !== '') {
        setShowPinInput(true);
        setTransactionName(selectedMethod);
        setTransactioId(generateBankTransactionId());
        obj2.Payment_Id = generateBankTransactionId();
      }
      else {
        alert('please input are fill');
      }

    }

    if (selectedMethod === "upi") {

      if (allMethod.upi !== '') {
        setShowPinInput(true);
        setTransactionName(selectedMethod);
        setTransactioId(generateUPITransactionId());
        obj2.Payment_Id = generateUPITransactionId();

      }
      else {
        alert('please input are fill');
      }
    }
    obj2.Order_Id = generateOrderId();
    obj2.order_Date = new Date().toLocaleString();

  };

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      setPaymentSuccess(true);
      setShowPinInput(false);
      setPin('');
    } else {
      alert("Please enter a valid 4-digit PIN.");
    }
  };

  const handleReset = () => {
    setSelectedMethod("");
    setAllMethod({ upi: '', holder_name: '', card_number: '', expiry: '', cvv: '', bank_name: '' });
    setShowPinInput(false);
    setPin('');
    setPaymentSuccess(false);
  };

  return (
    <div className="payment-container">
      <div className={`main-content ${paymentSuccess ? "blurred" : ""}`}>
        <h2>Select Payment Method</h2></div>

      <div className={`main-content ${paymentSuccess ? "blurred" : ""}`}>
        <div className="payment-options">
          <button
            className={selectedMethod === "card" ? "active" : ""}
            onClick={() => {
              setSelectedMethod("card");
              setShowPinInput(false);
              setPaymentSuccess(false);
            }}
          >
            💳 Card
          </button>
          <button
            className={selectedMethod === "netbanking" ? "active" : ""}
            onClick={() => {
              setSelectedMethod("netbanking");
              setShowPinInput(false);
              setPaymentSuccess(false);
            }}
          >
            🏦 Net Banking
          </button>
          <button
            className={selectedMethod === "upi" ? "active" : ""}
            onClick={() => {
              setSelectedMethod("upi");
              setShowPinInput(false);
              setPaymentSuccess(false);
            }}
          >
            🪙 UPI
          </button>
        </div>
      </div>

      <div className="payment-form">
        {paymentSuccess ? (
          <>
            <div className="success-screen">
              <div className="success-header">
                <p className="amount">Paid ₹{totalAmount}.00</p>
                <div className="checkmark-circle">✔</div>
                <div className="checkmark-circle slide-up">✔</div>

                <p className="status-text">Payment <span>Successful</span></p>
              </div>

              <div className="transaction-details">
                <h4>Transaction Details</h4>
                <p><strong>Mode of Payment:</strong> 🏦 {transactionName}</p>
                <p ><strong>Transaction ID:</strong> {transactioId}</p>
              </div>

              <span className="make" style={{ cursor: 'pointer', height: '40px', float: 'left', paddingTop: '7px', boxSizing: 'border-box' }} onClick={handleReset}>Make Another Payment</span>
              <span className="cancel" style={{ cursor: 'pointer', height: '40px', float: 'left', width: '80px', paddingTop: '7px', boxSizing: 'border-box' }} onClick={Transfer}>Cancel</span>
            </div>
          </>
        ) : showPinInput ? (
          <div>
            <input
              type="password"
              placeholder="Enter your PIN"
              style={{ width: '95%' }}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength="4"
            />
            <button className="pay-btn" onClick={handlePinSubmit}>Submit PIN</button>
          </div>
        ) : (
          <>
            {selectedMethod === "card" && (
              <div>
                <form>
                  <input type="text" name="holder_name" onChange={inputValue} placeholder="Name on Card" style={{ width: '96%' }} pattern=".{3,}" required title="Name must be between 3 and 20 characters long" />
                  <input type="text" onChange={inputValue} name="card_number" placeholder="Card Number" style={{ width: '96%' }} pattern="\d{16}" maxLength={'16'} required title="Please enter exactly 16 digits (0–9)" />
                  <div className="card-row">
                    <input type="text" name="expiry" onChange={inputValue} placeholder="Expiry (MM/YY)" />
                    <input type="text" name="cvv" onChange={inputValue} placeholder="CVV" pattern="\d{3}" maxlength="3" required title="Please enter exactly 3 digits (0–9)" />
                  </div>
                  <button className="pay-btn" onClick={handlePaymentSubmit}>Pay Now</button>
                </form>
              </div>
            )}

            {selectedMethod === "netbanking" && (
              <div>
                <form>
                  <select onChange={inputValue} name="bank_name" required>
                    <option value="">Select Bank</option>
                    <option value="sbi">SBI</option>
                    <option value="hdfc">HDFC</option>
                    <option value="icici">ICICI</option>
                  </select>
                  <button className="pay-btn" onClick={handlePaymentSubmit}>Proceed to Bank</button>
                </form>
              </div>
            )}

            {selectedMethod === "upi" && (
              <div>
                <form>
                  <input type="text" name="upi" onChange={inputValue} placeholder="Enter UPI ID (e.g., name@upi)" style={{ width: '95%' }} pattern=".*@.*" required title="please a valid upi" />
                  <button className="pay-btn" onClick={handlePaymentSubmit}>Pay via UPI</button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Pay;
