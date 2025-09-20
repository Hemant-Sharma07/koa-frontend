// import React, { useEffect, useState } from "react";
// import { Button } from "./AllButtons";
// import { useProduct } from "../../context/productContext";
// import { useParams } from "react-router-dom";
// import LoadingSpinner from "../LoadingSpinner";

// const ProductOverview = () => {
//   const [selectedWeight, setSelectedWeight] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [mainImgIdx, setMainImgIdx] = useState(0);
//   const { id } = useParams();
//   const { getProduct } = useProduct();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetch = async () => {
//       setLoading(true);
//       setError(null);
//       const res = await getProduct(id);
//       if (res.success) {
//         setProduct(res.product);
//       } else {
//         setError(res.error || "Product not found");
//       }
//       setLoading(false);
//     };
//     fetch();
//   }, [id]);
//   useEffect(() => {
//     if (product?.priceList) {
//       setSelectedWeight(product.priceList[0]);
//     }
//   }, [product]);

//   console.log(product);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <div className="text-red-600">{error}</div>;
//   if (!product) return null;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8 w-full">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
//         <div className="w-full flex flex-col items-center">
//           <div className="relative max-w-md aspect-square rounded-lg overflow-hidden">
//             <img
//               src={product.image}
//               alt="Main Product"
//               className="w-full h-full object-contain object-center transition-all duration-300 rounded-md"
//             />
//           </div>

//           <div className="flex gap-2 mt-4 flex-wrap justify-center">
//             {product.images.map((img, idx) => (
//               <button
//                 key={idx}
//                 type="button"
//                 onClick={() => setMainImgIdx(idx)}
//                 className={`rounded border-2 p-0.5 transition
//                   ${
//                     idx === mainImgIdx
//                       ? "border-orange-500 scale-105 bg-orange-50"
//                       : "border-transparent hover:border-orange-300"
//                   }`}
//                 aria-label={`Show image ${idx + 1}`}
//               >
//                 <img
//                   src={img}
//                   alt={`Thumbnail ${idx + 1}`}
//                   className="w-12 h-12 sm:w-14 sm:h-14 object-cover object-center rounded"
//                 />
//               </button>
//             ))}
//           </div>

//           <div className="mt-8 hidden lg:block w-full">
//             <h3 className="text-lg font-semibold text-orange-700">
//               Product Description
//             </h3>
//             <p className="text-base text-slate-600 mt-4">
//               {product.description}
//             </p>
//             <ul className="space-y-2 list-disc mt-4 pl-5 text-base text-slate-500">
//               {product.highlights.map((point, idx) => (
//                 <li key={idx}>{point}</li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="w-full flex flex-col py-2 px-0 sm:px-4">
//           <div>
//             <h2 className="text-2xl font-bold text-orange-700">
//               {product.name}
//             </h2>
//             <p className="text-sm text-orange-500 mt-1 mb-6 font-medium">
//               {product.category}
//             </p>

//             <div className="mt-4">
//               <div className="flex items-baseline flex-wrap gap-4">
//                 <span className="text-orange-600 text-4xl font-bold">
//                   ₹{selectedWeight.price * quantity}
//                 </span>
//                 <span className="text-slate-400 text-base">
//                   <strike>₹{product.oldPrice}</strike>
//                   <span className="ml-1">
//                     per {selectedWeight.label}{" "}
//                     <span className="hidden sm:inline">(Tax included)</span>
//                   </span>
//                 </span>
//               </div>
//             </div>

//             <div className="mt-7">
//               <h3 className="text-lg font-semibold text-orange-700 mb-2">
//                 Select Weight
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {product.priceList.map((option) => (
//                   <button
//                     key={option.label}
//                     type="button"
//                     onClick={() => setSelectedWeight(option)}
//                     className={`px-6 py-2 rounded font-semibold outline-none focus:ring-2 focus:ring-orange-300 transition-colors
//                       ${
//                         selectedWeight.label === option.label
//                           ? "bg-orange-600 text-white"
//                           : "border border-orange-200 bg-white text-orange-700 hover:border-orange-400"
//                       }
//                     `}
//                   >
//                     {option.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-7 flex gap-4 items-center">
//               <span className="font-semibold text-gray-700 text-base">
//                 No. of Packets:
//               </span>
//               <button
//                 className="h-9 w-9 rounded border-2 border-orange-400 font-bold text-xl text-orange-600 flex items-center justify-center hover:bg-orange-50 transition disabled:opacity-50"
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 disabled={quantity === 1}
//               >
//                 -
//               </button>
//               <span className="px-2 w-8 text-center">{quantity}</span>
//               <button
//                 className="h-9 w-9 rounded border-2 border-orange-500 font-bold text-xl text-white bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition"
//                 onClick={() => setQuantity(quantity + 1)}
//               >
//                 +
//               </button>
//             </div>

//             <div className="mt-4">
//               {product.inStock ? (
//                 <span className="text-green-600 font-semibold">In Stock</span>
//               ) : (
//                 <span className="text-red-600 font-semibold">Out of Stock</span>
//               )}
//             </div>

//             <div className="mt-8">
//               <Button title="Add to Cart" />
//             </div>
//           </div>

//           <div className="mt-8 block lg:hidden">
//             <h3 className="text-lg font-semibold text-orange-700">
//               Product Description
//             </h3>
//             <p className="text-base text-slate-600 mt-4">
//               {product.description}
//             </p>
//             <ul className="space-y-2 list-disc mt-4 pl-5 text-base text-slate-500">
//               {product.highlights.map((point, idx) => (
//                 <li key={idx}>{point}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductOverview;

import React, { useEffect, useState } from "react";
import { Button } from "./AllButtons";
import { useProduct } from "../../context/productContext";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { useCart } from "../../context/CartContext";

const ProductOverview = () => {
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const { id } = useParams();
  const { getProduct } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      const res = await getProduct(id);
      if (res.success) {
        setProduct(res.product);
      } else {
        setError(res.error || "Product not found");
      }
      setLoading(false);
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (product?.priceList?.length) {
      setSelectedWeight(product.priceList[0]);
    } else if (product?.newPrice) {
      setSelectedWeight({ label: "Default", price: product.newPrice });
    }
  }, [product]);

  //   console.log(product);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Image Gallery */}
        <div className="w-full flex flex-col items-center">
          <div className="relative max-w-md aspect-square rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt="Main Product"
              className="w-full h-full object-contain object-center transition-all duration-300 rounded-md"
            />
          </div>

          {/* Thumbnails */}
          {product.images?.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMainImgIdx(idx)}
                  className={`rounded border-2 p-0.5 transition
                    ${
                      idx === mainImgIdx
                        ? "border-orange-500 scale-105 bg-orange-50"
                        : "border-transparent hover:border-orange-300"
                    }`}
                  aria-label={`Show image ${idx + 1}`}
                >
                  <img
                    src={img || product.image}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover object-center rounded"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Description (Desktop) */}
        </div>

        {/* Info and Actions */}
        <div className="w-full flex flex-col py-2 px-0 sm:px-4">
          <div>
            <h2 className="text-2xl font-bold text-orange-700">
              {product.title}
            </h2>
            <p className="text-sm text-orange-500 mt-1 mb-6 font-medium">
              {product.category || "Dry Fruit"}
            </p>

            {/* Price */}
            <div className="mt-4">
              <div className="flex items-baseline flex-wrap gap-4">
                <span className="text-orange-600 text-md md:text-2xl font-bold">
                  ₹{selectedWeight?.price || product.newPrice}
                </span>

                {product.oldPrice &&
                  product.oldPrice >
                    (selectedWeight?.price || product.newPrice) && (
                    <span className="text-slate-400 text-sm">
                      <strike>₹{product.oldPrice}</strike>
                      {selectedWeight?.label && (
                        <span className="ml-1">
                          per {selectedWeight.label}
                          <span className="hidden sm:inline">
                            {" "}
                            (Tax included)
                          </span>
                        </span>
                      )}
                    </span>
                  )}
              </div>

              {/* Optional Hot Deal badge */}
              {/* {product.inHotDeal && (
                <div className="mt-2 inline-block bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                  🔥 Hot Deal
                </div>
              )} */}
            </div>

            {/* Weight Options */}
            {product.priceList?.length > 0 && (
              <div className="mt-7">
                <h3 className="text-lg font-semibold text-orange-700 mb-2">
                  Select Weight
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.priceList.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => setSelectedWeight(option)}
                      className={`px-6 py-2 rounded font-semibold outline-none focus:ring-2 focus:ring-orange-300 transition-colors
                        ${
                          selectedWeight.label === option.label
                            ? "bg-orange-600 text-white"
                            : "border border-orange-200 bg-white text-orange-700 hover:border-orange-400"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-7 flex gap-4 items-center">
              <span className="font-semibold text-gray-700 text-base">
                No. of Packets:
              </span>
              <button
                className="h-9 w-9 rounded border-2 border-orange-400 font-bold text-xl text-orange-600 flex items-center justify-center hover:bg-orange-50 transition disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="px-2 w-8 text-center">{quantity}</span>
              <button
                className="h-9 w-9 rounded border-2 border-orange-500 font-bold text-white text-xl bg-orange-500 flex items-center justify-center hover:bg-orange-600 transition"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            {/* Stock Info */}
            <div className="mt-4">
              {product.isActive && product.stock > 0 ? (
                <span className="text-green-600 font-semibold">In Stock</span>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Cart Button */}
            <div className="mt-8">
              <Button
                title="Add to Cart"
                onClick={() => {
                  const payload = {
                    id: product.id,
                    title: product.title,
                    price: selectedWeight?.price || product.newPrice,
                    label: selectedWeight?.label,
                    image: product.image,
                  };
                  addToCart(payload, quantity);
                }}
              />
            </div>
          </div>

          {/* Description (Mobile/Tablet) */}
          <div className="mt-8 w-full">
            <h3 className="text-lg font-semibold text-orange-700">
              Product Description
            </h3>
            <p className="text-base text-slate-600 mt-4 text-justify">
              {product.description}
            </p>
            {product.highlights?.length > 0 && (
              <ul className="space-y-2 list-disc mt-4 pl-5 text-base text-slate-500">
                {product.highlights.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
