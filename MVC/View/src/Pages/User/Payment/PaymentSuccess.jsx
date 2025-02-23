import React from 'react';
import { BsCheckCircleFill } from "react-icons/bs";
import './PaymentSucces.css';

const PaymentSucces = () => {
  return (
    <section className="payment-succes-card bg-purple-800 text-white p-6 rounded-lg shadow-lg text-center">
      <BsCheckCircleFill className="text-6xl mb-4" />
    <div className="text">
    <h1 className="text-2xl font-bold">Payment Successfull!</h1>
    <p className="mt-2">Your payment has been received successfully. Thank you!</p>
    </div>
    
    </section>
  );
};

export default PaymentSucces; 