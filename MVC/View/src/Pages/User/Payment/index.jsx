import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { FaCheckCircle } from "react-icons/fa";
import './Payment.css'
const stripePromise = loadStripe('pk_test_51QvduDGVEa9lUrQzpWG49eTa2r2VIvloxJ10u2uJ8v2eu28TWEZ6cmx3j1an9vktFkJOHBIxHmBr2ItaPuEUfCQu00xoZ4Kutn');

function PaymentPage() {
  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const response = await fetch('http://localhost:3000/users/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          priceId: 'prod_RpIeIDYd8ikSsK'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Hata: ${errorData.error}`);
        return;
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Ödeme işlemi başlatılırken bir hata oluştu');
    }
  };

  return (
    <section id='payment'>
      <div className=" payment-all max-w-md mx-auto mt-10 p-6 bg-black rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Premium Membership</h2>
        <div className="mb-6">
          <h3 className="text-xl mb-2">Yearly Plan</h3>
          <p className="text-gray-600">10.00 USD / year</p>
          <ul>
            <li><FaCheckCircle/> See Premium contents</li>
            <li><FaCheckCircle/> Free-ads</li>
            <li><FaCheckCircle/> High Quality</li>
          </ul>
        </div>
        <button
          onClick={handlePayment}
          className="w-fulltext-white py-3 px-4 rounded-lg transition duration-200"
        >
          Buy
        </button>
      </div>
    </section>
  );
}

export default PaymentPage;