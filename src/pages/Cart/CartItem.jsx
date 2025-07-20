import React from "react";
import QuantityCounter from "./QuantityCounter";

const CartItem = ({ item, onChangeQuantity, onRemove }) => {
  const formatInr = (value) =>
    "₹" + Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      data-aos="fade-right"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Product Image */}
        <div className="flex justify-center sm:justify-start sm:w-1/4">
          <img
            className="h-32 w-32 object-contain"
            src={item.imageLight}
            alt={item.name}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-2 sm:space-y-3">
          <div className="text-sm font-medium text-gray-900 sm:text-base line-clamp-2">
            {item.name}
          </div>
          {/* Mobile Price and Quantity */}
          <div className="flex justify-between sm:hidden">
            <div className="text-sm font-bold text-gray-900">
              {formatInr(item.price * item.quantity)}
            </div>
            <QuantityCounter
              quantity={item.quantity}
              id={item.id}
              onChange={onChangeQuantity}
            />
          </div>
          {/* Remove Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center text-xs font-medium text-red-600 hover:underline sm:text-sm"
              onClick={() => onRemove(item.id)}
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

        {/* Desktop Price and Quantity */}
        <div className="hidden items-center justify-between sm:flex sm:w-1/4 sm:flex-col sm:items-end sm:gap-4">
          <div className="text-base font-bold text-gray-900">
            {formatInr(item.price * item.quantity)}
          </div>
          <QuantityCounter
            quantity={item.quantity}
            id={item.id}
            onChange={onChangeQuantity}
          />
        </div>
      </div>
    </div>
  );
};
export default CartItem;
