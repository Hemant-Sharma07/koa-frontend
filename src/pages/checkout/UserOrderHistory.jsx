import React, { useState, useEffect } from "react";

import {
  formatOrderId,
  formatDate,
  formatCurrency,
} from "../../utils/orderUtils";
import { useUserAuth } from "../../context/userAuthContext";
import { useOrder } from "../../context/OrderContext";

const UserOrderHistory = () => {
  const { getOrdersByUser, loading } = useOrder();
  const { user } = useUserAuth();
  const [userOrders, setUserOrders] = useState([]);

  console.log(user);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const orders = await getOrdersByUser(user.uid);
        console.log(orders);
        setUserOrders(orders);
      }
    };
    fetchOrders();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "paid":
        return "bg-green-100 text-green-800 border-green-300";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "delivered":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (userOrders.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-4">No Orders Found</h2>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {userOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-md border overflow-hidden"
          >
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">
                    Order {formatOrderId(order.id)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </div>
                  <p className="text-lg font-bold mt-1">
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-semibold mb-2">Items:</h4>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Shipping Address:</strong>
                  </p>
                  <p>{order.userDetails.name}</p>
                  <p>{order.userDetails.address}</p>
                  <p>
                    {order.userDetails.city}, {order.userDetails.state} -{" "}
                    {order.userDetails.pincode}
                  </p>
                  <p>Phone: {order.userDetails.phone}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrderHistory;
