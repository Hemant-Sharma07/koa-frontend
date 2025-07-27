import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { useUserAuth } from '../context/userAuthContext';
import { useNavigate } from 'react-router-dom';

const CheckoutModal = ({ isOpen, onClose, cartItems, totalAmount }) => {
  const { createOrder, updateOrderStatus } = useOrder();
  const { user } = useUserAuth(); // Get current user
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const required = ['name', 'phone', 'address', 'city', 'pincode', 'state'];
    return required.every(field => userDetails[field].trim() !== '');
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

 const handlePayment = async () => {
  if (!validateForm()) {
    alert('Please fill all required fields');
    return;
  }

  try {
    setLoading(true);

    // Call your server to create order
    const response = await fetch('http://localhost:5000/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.uid,
        userEmail: user.email,
        items: cartItems,
        totalAmount,
        userDetails,
        amount: totalAmount * 100, // Amount in paise
      })
    });

    const orderData = await response.json();
    
    if (!orderData.success) {
      throw new Error('Failed to create order');
    }

    // Initialize Razorpay
    const isRazorpayLoaded = await initializeRazorpay();
    if (!isRazorpayLoaded) {
      alert('Razorpay SDK failed to load');
      return;
    }

    // Razorpay options
    const options = {
      key: 'rzp_test_7RMs1BnfdhCMQq',
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'KOA',
      description: 'Purchase from Your Store',
      order_id: orderData.razorpayOrderId, // Now this is a valid Razorpay order ID
      handler: async (response) => {
        // Verify payment on server
        const verifyResponse = await fetch('http://localhost:5000/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            firebaseOrderId: orderData.firebaseOrderId
          })
        });

        const verifyData = await verifyResponse.json();
        
        if (verifyData.success) {
          toast.success('Payment successful!');
          navigate('/orders')
          onClose();

          // Clear cart here if needed
        } else {
          toast.error('Payment verification failed!');
        }
      },
      prefill: {
        name: userDetails.name,
        email: user.email,
        contact: userDetails.phone
      },
      theme: {
        color: '#3399cc'
      },
      modal: {
        ondismiss: () => {
          // Update order status to cancelled
          fetch('http://localhost:5000/api/update-order-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firebaseOrderId: orderData.firebaseOrderId,
              status: 'cancelled'
            })
          });
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.error('Payment error:', error);
    alert('Payment failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Checkout</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Order Summary */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* User Details Form */}
          <div className="space-y-3">
            <h3 className="font-semibold">Shipping Details</h3>
            
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={userDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={userDetails.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <textarea
              name="address"
              placeholder="Address *"
              value={userDetails.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            />
            
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="city"
                placeholder="City *"
                value={userDetails.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              
              <input
                type="text"
                name="pincode"
                placeholder="Pincode *"
                value={userDetails.pincode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <input
              type="text"
              name="state"
              placeholder="State *"
              value={userDetails.state}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Pay ₹${totalAmount}`}
          </button>
        </div>
      </div>
    </div>
  );
};


export default CheckoutModal