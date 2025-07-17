import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSection/HeroSlider";
import ProductCard from "../../components/Atoms/ProductCard";
import PageHeader from "../../components/Atoms/PageHeader";
import OurVision from "../../components/OurVision/OurVision";
import { useProduct } from "../../context/productContext";
import LoadingSpinner from "../../components/LoadingSpinner";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAllProducts } = useProduct();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        if (res.success) {
          setProducts(res.products);
        } else {
          setError(res.error || "Failed to fetch products");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleViewAll = () => {
    console.log("View all clicked");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="mx-auto px-3 flex flex-col gap-5 md:gap-10 py-5 md:py-10">
        <HeroSlider />
        <div>
          <PageHeader heading="Delicacies" onClick={handleViewAll} />
          <section className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-6 justify-items-center">
            {products.slice(0, 8).map((product) => (
              <div
                key={product._id}
                className="w-full max-w-[250px] sm:max-w-none"
              >
                <ProductCard
                  id={product._id}
                  imageUrl={product.image}
                  brand={product.category}
                  productName={product.title}
                  currentPrice={product.newPrice}
                  originalPrice={product.oldPrice}
                />
              </div>
            ))}
          </section>
        </div>
        <div className="px-3 md:px-9">
          <OurVision />
        </div>
        <div>
          <PageHeader heading="Featured Collection" onClick={handleViewAll} />
          <section className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-10 justify-items-center">
            {products.slice(0, 8).map((product) => (
              <div
                key={product._id}
                className="w-full max-w-[250px] sm:max-w-none"
              >
                <ProductCard
                  id={product._id}
                  imageUrl={product.image}
                  brand={product.category}
                  productName={product.title}
                  currentPrice={product.newPrice}
                  originalPrice={product.oldPrice}
                />
              </div>
            ))}
          </section>
        </div>
        <div>
          <PageHeader heading="Ajfan Specialties" onClick={handleViewAll} />
          <section className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-10 justify-items-center">
            {products.slice(0, 8).map((product) => (
              <div
                key={product._id}
                className="w-full max-w-[250px] sm:max-w-none"
              >
                <ProductCard
                  id={product._id}
                  imageUrl={product.image}
                  brand={product.category}
                  productName={product.title}
                  currentPrice={product.newPrice}
                  originalPrice={product.oldPrice}
                />
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
