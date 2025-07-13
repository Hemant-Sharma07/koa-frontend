import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

const ProductCard = ({
  id,
  imageUrl,
  brand,
  productName,
  currentPrice,
  originalPrice,
  onAddToCart,
}) => {
  return (
    <div className="w-full max-w-[350px] bg-white shadow-md rounded-md duration-500 hover:-translate-y-2 hover:shadow-xl">
      <Link to={`/products/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-t-md">
          <img
            src={imageUrl}
            alt={productName}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="px-4 py-4">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            {brand}
          </span>
          <h3 className="text-lg font-bold text-gray-900 truncate mt-1 mb-2">
            {productName}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-lg font-semibold text-gray-900">
                ${currentPrice}
              </p>
              {originalPrice && (
                <del className="text-sm text-gray-500">${originalPrice}</del>
              )}
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.();
              }}
              aria-label="Add to cart"
            >
              <FiShoppingBag className="text-xl text-gray-700" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
