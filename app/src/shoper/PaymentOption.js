import React, { useEffect, useState } from "react";
import '../Css/Shoper/PaymentOption.css';
import { useLocation, useNavigate } from "react-router-dom";

const PaymentOption = () => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [animateOnLoad, setAnimateOnLoad] = useState(false);
  const [show, setShow] = useState(false);

  const [upi, setUpi] = useState({
    upi: '',
  });
  const [card, setCard] = useState({
    holder_name: '',
    card_number: '',
    expiry: '',
    cvv: '',
  });
  const [bank, setBank] = useState({
    holder_name: '',
    bank_name: '',
    account_number: '',
    ifsc_code: '',
  });

  const [upierrors, setUpiErrors] = useState(false);

  const [cardholdername, setCardholderNameErrors] = useState(false);
  const [cardnumbererrors, setCardNumberErrors] = useState(false);
    const [cardexpiryerrors, setCardexpiryErrors] = useState(false);
  const [cardcvverrors, setCardCvvErrors] = useState(false);

  const [bankholdererror, setHolderError] = useState(false);
  const [banknameerror, setBankNameError] = useState(false);
  const [bankaccountnumbererrors, setBankAccountNumberErrors] = useState(false);
  const [bankifscerrors, setBankIfscErrors] = useState(false);

    const [transactionName, setTransactionName] = useState();
  const [transactioId, setTransactioId] = useState();

  const [obj2,setObj2] = useState({
    Order_Id : '',
    Payment_Id : '',
    Payment_Status : 'Paid',
    order_Date : '',
    country : 'India',
  })
 const location = useLocation();
  const totalAmount = location.state.total;
    const obj = location.state.obj


  const navigate = useNavigate();

  const inputUpiValue = (q) => {
    if (q.target.value.trim() == "") {
      setUpiErrors(true)
    }
    else {
      setUpiErrors(false)
      setUpi({ [q.target.name]: q.target.value })
    }
  }
  const inputCardValue = (q) => {

    if (q.target.value.trim() == "") {
    }

    else {
      setCard({ ...card, [q.target.name]: q.target.value });
    }
  }

  const inputBankValue = (q) => {
    if (q.target.value.trim() == "") {
    }

    else {
                  setBank({ ...bank, [q.target.name]: q.target.value });
    }
  }
    
  
  const Transfer = () =>{
    console.log(obj2);
    
navigate('/deliver', {
  state : {
    obj : obj,
    obj2 : obj2,
  }
})
  }



  const handlePayment = () => {

  if (paymentMethod === "upi") {
    if (upi.upi.trim() === "") {
      setUpiErrors(true);
    } else {
      setPaymentStatus("success");
      setTransactionName(paymentMethod);
      setTransactioId(generateUPITransactionId());
      obj2.Payment_Id = generateUPITransactionId();
    }
  }

  if (paymentMethod === "card") {
    const { holder_name, card_number, expiry, cvv } = card;

    setCardholderNameErrors(holder_name.trim() === "");
    setCardNumberErrors(card_number.trim() === "");
    setCardexpiryErrors(expiry.trim() === "");
    setCardCvvErrors(cvv.trim() === "");

    if (holder_name && card_number && expiry && cvv) {
      setPaymentStatus("success");
      setTransactionName(paymentMethod);
      setTransactioId(generateCardTransactionId());
      obj2.Payment_Id = generateCardTransactionId();

    }
  }

  if (paymentMethod === "bank") {
    const { holder_name, bank_name, account_number, ifsc_code } = bank;

    setHolderError(holder_name.trim() === "");
    setBankNameError(bank_name.trim() === "");
    setBankAccountNumberErrors(account_number.trim() === "");
    setBankIfscErrors(ifsc_code.trim() === "");

    if (holder_name && bank_name && account_number && ifsc_code) {
      setPaymentStatus("success");
      setTransactionName(paymentMethod);
      setTransactioId(generateBankTransactionId());
          obj2.Payment_Id = generateBankTransactionId();
      
    }
  }
   obj2.Order_Id = generateOrderId();
    obj2.order_Date = new Date().toLocaleString();


};
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


  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimateOnLoad(true);
    }, [200]);

    return () => clearTimeout(timeout);
  }, []);



  const reset = () => {
    setPaymentStatus(null);
  };

  if (paymentStatus === "success") {
    return (
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

        <button className="make" style={{cursor:'pointer'}} onClick={reset}>Make Another Payment</button>
        <button className="cancel" style={{cursor:'pointer'}} onClick={Transfer}>delivery</button>

      </div>
    );
  }

  if (paymentStatus === "failure") {
    return (
      <div className="payment-status failure">
        <h2>❌ Payment Failed!</h2>
        <p>Please try again later.</p>
        <button onClick={reset}>Retry</button>
      </div>
    );
  }


  return (
    <div className={`payment-container
      ${animateOnLoad ? "entry-animation" : "initial"}
    `} style={{ marginTop: '25px' }}>
      <h2>Complete Payment</h2>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          💳Card
        </label>
        <label>
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          />
           🪙UPI
        </label>
        <label>
          <input
            type="radio"
            value="bank"
            checked={paymentMethod === "bank"}
            onChange={() => setPaymentMethod("bank")}
          />
          🏦 Bank Transfer
        </label>
      </div>

      {paymentMethod === "card" && (
        <>
          <label>Card Holder Name</label>
          <input type="text" onChange={inputCardValue} name="holder_name" style={{ width: '354px' }} placeholder="e.g. Ayush Mishra" />
          {cardholdername && <div className="error-message">Please Fill The Input</div>}

          <label>Card Number</label>
          <input type="text" onChange={inputCardValue} name="card_number" style={{ width: '354px' }} placeholder="1234 5678 9012 3456" />
          {cardnumbererrors && <div className="error-message">Please Fill The Input</div>}


          <div className="row">
            <div>
              <label>Expiry</label>
              <input type="month" onChange={inputCardValue} name="expiry" />
              {cardexpiryerrors && <div className="error-message">Please Fill The Input</div>}
            </div>
            <div>
              <label style={{ marginLeft: '21px' }}>CVV</label>
              <input type="text" onChange={inputCardValue} name="cvv" style={{ width: '150px', marginLeft: '20px' }} placeholder="123" />
              {cardcvverrors && <div className="error-message">Please Fill The Input</div>}
            </div>
          </div>
        </>
      )}

      {paymentMethod === "upi" && (
        <>
          <label>UPI ID</label>
          <input type="text" name="upi" style={{ width: '354px' }} onChange={inputUpiValue} placeholder="e.g. ayush@upi" />
          {upierrors && <div className="error-message">Please fill the Input</div>}
        </>
      )}

      {paymentMethod === "bank" && (
        <>
          <label>Account Holder Name</label>
          <input type="text" onChange={inputBankValue} name="holder_name" style={{ width: '354px' }} placeholder="e.g. Ayush Mishra" />
          {bankholdererror && <div className="error-message">Please Fill The Input</div>}

          <label>Bank Name</label>
          <select name="bank_name" onChange={inputBankValue}>
            <option value="">Select Bank</option>
            <option value="sbi">SBI</option>
            <option value="hdfc">HDFC</option>
            <option value="axis">Axis</option>
            <option value="icici">ICICI</option>
          </select>
                    {banknameerror && <div className="error-message">Please Fill The Input</div>}


          <label>Account Number</label>
          <input type="text" onChange={inputBankValue} name="account_number" style={{ width: '354px' }} placeholder="e.g. 1234567890" />
          {bankaccountnumbererrors && <div className="error-message">Please Fill The Input</div>}

          <label>IFSC Code</label>
          <input type="text" onChange={inputBankValue} name="ifsc_code" style={{ width: '354px' }} placeholder="e.g. HDFC0001234" />
                {bankifscerrors && <div className="error-message">Please Fill The Input</div>}

        </>
      )}

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentOption;
