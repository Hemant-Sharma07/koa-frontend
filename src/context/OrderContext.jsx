import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'
const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create order
  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      
      const order = {
        ...orderData,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await addDoc(collection(db, 'orders'), order);
      return { id: docRef.id, ...order };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status, paymentDetails = {}) => {
    try {
      setLoading(true);
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status,
        ...paymentDetails,
        updatedAt: new Date()
      });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get orders by user
  const getOrdersByUser = async (userId) => {
  console.log("Fetching orders for userId:", userId);

  try {
    setLoading(true);

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    const userOrders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("Fetched Orders:", userOrders);
    return userOrders;

  } catch (err) {
    console.error("Error fetching user orders:", err);
    setError(err.message);
    return [];
  } finally {
    setLoading(false);
  }
};


  // Get all orders (for admin)
  const getAllOrders = () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      
      return onSnapshot(q, (snapshot) => {
        const allOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(allOrders);
        setLoading(false);
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const value = {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    getOrdersByUser,
    getAllOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
