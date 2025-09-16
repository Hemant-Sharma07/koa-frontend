import { Link } from "react-router-dom";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { Button } from "./AllButtons";

const formatInr = (value) =>
  "₹" + Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });

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
    <div className="w-full max-w-[350px] bg-white shadow-md rounded-md duration-500 hover:-translate-y-2 hover:shadow-xl border">
      <Link to={`/product-overview/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-t-md">
          <img
            src={imageUrl}
            alt={productName}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="px-3 py-2 md:p-4">
          {/* <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            {brand}
          </span> */}
          <h3 className="text-md sm:text-lg font-bold text-gray-900 truncate mt-1 mb-2 capitalize">
            {productName}
          </h3>
          <div className="flex flex-col items-start justify-start">
            <div className="flex items-center gap-1">
              <p className="text-sm md:text-lg font-semibold text-gray-900">
                {formatInr(currentPrice)}
              </p>
              {originalPrice && (
                <del className="text-sm text-gray-500">
                  {formatInr(originalPrice)}
                </del>
              )}
            </div>
          </div>
          {/* <button
            className="rounded-md w-full py-1 px-2 text-white text-sm bg-orange-600 transition-colors duration-200 my-2"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.();
            }}
            aria-label="Add to cart"
          >
            Add To Cart
          </button> */}
          <div className="flex items-center justify-end mt-3 w-full">
            <Button
              title="Add to Cart"
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.();
              }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
