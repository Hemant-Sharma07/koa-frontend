import React from "react";

const formatInr = (value) =>
  "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 2 });

const OrderSummary = ({ subtotal, savings, pickupFee, tax, total }) => (
  <div
    className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
    data-aos="fade-left"
  >
    <p className="text-xl font-semibold text-gray-900">Order Summary</p>
    <div className="space-y-4">
      <div className="space-y-2">
        <dl className="flex items-center justify-between gap-4">
          <dt>Subtotal</dt>
          <dd>{formatInr(subtotal)}</dd>
        </dl>
        <dl className="flex items-center justify-between gap-4">
          <dt>Savings</dt>
          <dd className="text-green-600">-{formatInr(savings)}</dd>
        </dl>
        <dl className="flex items-center justify-between gap-4">
          <dt>Pickup Fee</dt>
          <dd>{formatInr(pickupFee)}</dd>
        </dl>
        <dl className="flex items-center justify-between gap-4">
          <dt>Tax</dt>
          <dd>{formatInr(tax)}</dd>
        </dl>
      </div>
      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
        <dt className="font-bold">Total</dt>
        <dd className="font-bold">{formatInr(total)}</dd>
      </dl>
    </div>
    <a
      href="#"
      className="flex w-full items-center justify-center rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-700"
    >
      Proceed to Checkout
    </a>
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm font-normal text-gray-500"> or </span>
      <a
        href="#"
        className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 underline hover:no-underline"
      >
        Continue Shopping
      </a>
    </div>
  </div>
);

export default OrderSummary;
