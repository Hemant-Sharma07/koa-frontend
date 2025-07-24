const QuantityCounter = ({ quantity, id, onChange }) => {
  return (
    <div className="flex items-center">
      <button
        type="button"
        id={`decrement-button-${id}`}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-orange-300 bg-orange-50 hover:bg-orange-200 transition-all duration-200"
        onClick={() => onChange(id, Math.max(1, quantity - 1))}
        // Prevent going below 1 (common for carts)
      >
        <svg
          className="h-2.5 w-2.5 text-gray-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 2"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h16"
          />
        </svg>
      </button>
      <input
        type="text"
        id={`counter-input-${id}`}
        className="w-10 shrink-0 border-0 bg-transparent text-center text-md font-medium text-gray-900 focus:outline-none focus:ring-0"
        value={quantity}
        required
        onChange={(e) => {
          // Only accept positive integers
          let val = e.target.value.replace(/[^0-9]/g, "");
          val = val ? Math.max(1, parseInt(val, 10)) : 1;
          onChange(id, val);
        }}
      />
      <button
        type="button"
        id={`increment-button-${id}`}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-orange-300 bg-orange-50 hover:bg-orange-200 transition-all duration-200"
        onClick={() => onChange(id, quantity + 1)}
      >
        <svg
          className="h-2.5 w-2.5 text-gray-900"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default QuantityCounter;
