import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/Atoms/ProductCard";
import { useProduct } from "../../context/productContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useCart } from "../../context/CartContext";

const ProductsList = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { getAllProducts } = useProduct();
    const { addToCart } = useCart();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch & filter products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getAllProducts();
        if (res.success) {
          const filtered = res.products.filter(
            (product) => product.category.toLowerCase() === slug.toLowerCase()
          );
          setProducts(filtered);
        } else {
          setError(res.error || "Failed to load products");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const categoryHeadingMap = {
    Nuts: "Curated Nuts & Delicacies",
    "Dry-Fruits": "Curated Dry Fruits",
    Seeds: "Organic Seeds",
    Saffron: "Saffron Collection",
    "Indian Spices": "Indian Spices",
  };

  const heading = categoryHeadingMap[slug] || slug;

  if (loading)
    return (
      <p className="text-center py-10">
        <LoadingSpinner />
      </p>
    );
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="px-4 md:px-10 py-8">
      {/* Dynamic page heading */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 capitalize">
        {heading}
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.image}
              brand={product.brand || ""}
              productName={product.title}
              currentPrice={product.newPrice}
              originalPrice={product.oldPrice}
              onAddToCart={() =>
                      addToCart({
                        id: product.id,
                        name: product.title,
                        price: product.newPrice,
                        oldPrice: product.oldPrice,
                        imageLight: product.image,
                      })
                    }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
