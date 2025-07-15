import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSection/HeroSlider";
import ProductCard from "../../components/Atoms/ProductCard";
import PageHeader from "../../components/Atoms/PageHeader";
import OurVision from "../../components/OurVision/OurVision";
import { useProduct } from "../../context/productContext";

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
    return <div>Loading products...</div>;
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
          <section className="mx-auto w-full flex flex-wrap justify-items-center justify-evenly gap-6 mt-10 mb-5 px-3 md:px-0">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id} // Assuming your product has _id from MongoDB
                id={product._id}
                imageUrl={product.image}
                brand={product.category}
                productName={product.title}
                currentPrice={product.newPrice}
                originalPrice={product.oldPrice}
              />
            ))}
          </section>
        </div>
        <div className="px-3 md:px-9">
          <OurVision />
        </div>
        <div>
          <PageHeader heading="Featured Collection" onClick={handleViewAll} />
          <section className="mx-auto w-full flex flex-wrap justify-items-center justify-evenly gap-6 mt-10 mb-5 px-3 md:px-0">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id} // Assuming your product has _id from MongoDB
                id={product._id}
                imageUrl={product.image}
                brand={product.category}
                productName={product.title}
                currentPrice={product.newPrice}
                originalPrice={product.oldPrice}
              />
            ))}
          </section>
        </div>
        <div>
          <PageHeader heading="Ajfan Specialties" onClick={handleViewAll} />
          <section className="mx-auto w-full flex flex-wrap justify-items-center justify-evenly gap-6 mt-10 mb-5 px-3 md:px-0">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id} // Assuming your product has _id from MongoDB
                id={product._id}
                imageUrl={product.image}
                brand={product.category}
                productName={product.title}
                currentPrice={product.newPrice}
                originalPrice={product.oldPrice}
              />
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
