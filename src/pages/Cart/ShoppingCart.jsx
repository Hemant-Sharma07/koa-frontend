import React, { useState } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import { useCart } from "../../context/CartContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import CheckoutModal from '../../components/CheckoutModal'

const PICKUP_FEE = 99;
const TAX = 10;

const ShoppingCart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartLoading } = useCart();
   const [showCheckout, setShowCheckout] = useState(false);

   const handleBuyNow = () => {
    setShowCheckout(true);
  };

  if (cartLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner />
      </div>
    );
  }

  const isEmpty = cartItems.length === 0;
  const subtotal = isEmpty
    ? 0
    : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = isEmpty
    ? 0
    : cartItems.reduce(
        (sum, item) =>
          item.oldPrice && item.oldPrice > item.price
            ? sum + (item.oldPrice - item.price) * item.quantity
            : sum,
        0
      );
  const pickupFee = isEmpty ? 0 : PICKUP_FEE;
  const tax = isEmpty ? 0 : TAX;
  const total = subtotal + pickupFee + tax;

  return (
    <section className="mx-auto h-screen bg-white py-5 md:py-10 px-3 sm:px-10">
      {/* ...rest of your code remains the same */}
      <div className="px-4 sm:px-2">
        <h2
          className="text-xl font-semibold text-gray-900 sm:text-2xl"
          data-aos="fade-down"
        >
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {isEmpty ? (
                <div className="flex flex-col items-center justify-center py-12 px-3 border rounded-lg shadow-sm">
                  {/* Cart Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-orange-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.4}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L19 13M7 13V6m0 0V5a2 2 0 012-2h4a2 2 0 012 2v1"
                    />
                  </svg>
                  <h3 className="text-2xl font-semibold text-orange-600 mb-2">
                    Your Cart is Empty!
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-xs text-center">
                    Looks like you haven’t added anything yet.
                    <br />
                    Discover delicious nuts, dry fruits, and more!
                  </p>
                  <a
                    href="/"
                    className="inline-block bg-orange-600 text-white font-medium rounded-md px-6 py-2 shadow hover:bg-orange-700 transition"
                  >
                    Shop Now
                  </a>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onChangeQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))
              )}
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <OrderSummary
              subtotal={subtotal}
              savings={savings}
              pickupFee={pickupFee}
              tax={tax}
              total={total}
              handleSubmit={handleBuyNow}
            />
          </div>
        </div>
      </div>

       <CheckoutModal 
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        totalAmount={total}
      />
    </section>
  );
};

export default ShoppingCart;
