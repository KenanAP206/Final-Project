import React from 'react';
import { MdError } from "react-icons/md";
import './PaymentCancel.css';

const PaymentCancel = () => {
  return (
    <section className="payment-cancel-card bg-purple-800 text-white p-6 rounded-lg shadow-lg text-center">
      <MdError className="text-6xl mb-4" />
    <div className="text">
    <h1 className="text-2xl font-bold">Payment Cancelled</h1>
    <p className="mt-2">Your payment has been cancelled. Please try again.</p>
    </div>
    
    </section>
  );
};

export default PaymentCancel; 