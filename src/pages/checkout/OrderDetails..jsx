import React from 'react';
import { formatOrderId, formatDate, formatCurrency } from '../utils/orderUtils';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Order Info */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Order Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Order ID:</strong> {formatOrderId(order.id)}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Amount:</strong> {formatCurrency(order.totalAmount)}</p>
              </div>
              <div>
                <p><strong>Order Date:</strong> {formatDate(order.createdAt)}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                {order.razorpayPaymentId && (
                  <p><strong>Payment ID:</strong> {order.razorpayPaymentId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <div className="text-sm">
              <p><strong>Name:</strong> {order.userDetails.name}</p>
              <p><strong>Email:</strong> {order.userEmail}</p>
              <p><strong>Phone:</strong> {order.userDetails.phone}</p>
              <p><strong>Address:</strong></p>
              <div className="ml-4">
                <p>{order.userDetails.address}</p>
                <p>{order.userDetails.city}, {order.userDetails.state}</p>
                <p>PIN: {order.userDetails.pincode}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-b pb-4">
            <h3 className="font-semibold mb-2">Ordered Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: {formatCurrency(item.price)}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-3 pt-3 border-t border-gray-200">
              <p className="text-lg font-bold">
                Total: {formatCurrency(order.totalAmount)}
              </p>
            </div>
          </div>

          {/* Payment Details */}
          {order.razorpayPaymentId && (
            <div>
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <div className="text-sm bg-gray-50 p-3 rounded">
                <p><strong>Payment ID:</strong> {order.razorpayPaymentId}</p>
                <p><strong>Order ID:</strong> {order.razorpayOrderId}</p>
                {order.paidAt && (
                  <p><strong>Paid At:</strong> {formatDate(order.paidAt)}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
