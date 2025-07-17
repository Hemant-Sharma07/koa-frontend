import React from "react";
import QuantityCounter from "./QuantityCounter";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Product Image */}
        <Link to="#" className="flex justify-center sm:justify-start sm:w-1/4">
          <img
            className="h-32 w-32 object-contain"
            src={item.imageLight}
            alt={item.name}
          />
        </Link>

        {/* Product Info - Middle Section */}
        <div className="flex-1 space-y-2 sm:space-y-3">
          <Link
            to="#"
            className="text-sm font-medium text-gray-900 hover:underline line-clamp-2 sm:text-base"
          >
            {item.name}
          </Link>

          {/* Mobile Price (hidden on larger screens) */}
          <div className="flex justify-between sm:hidden">
            <div className="text-sm font-bold text-gray-900">
              ${(item.price * item.quantity).toLocaleString()}
            </div>
            <QuantityCounter quantity={item.quantity} id={item.id} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center text-xs font-medium text-red-600 hover:underline sm:text-sm"
            >
              <svg
                className="mr-1 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>

        {/* Desktop Price and Quantity (hidden on mobile) */}
        <div className="hidden items-center justify-between sm:flex sm:w-1/4 sm:flex-col sm:items-end sm:gap-4">
          <div className="text-base font-bold text-gray-900">
            ${(item.price * item.quantity).toLocaleString()}
          </div>
          <QuantityCounter quantity={item.quantity} id={item.id} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
