import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSection/HeroSlider";
import ProductCard from "../../components/Atoms/ProductCard";
import PageHeader from "../../components/Atoms/PageHeader";
import OurVision from "../../components/OurVision/OurVision";
import { useProduct } from "../../context/productContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import HomeHighlightSection from "../../components/HomeHighlightSection";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAllProducts } = useProduct();

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // const galleryImages = [
  //   [
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
  //   ],
  //   [
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
  //   ],
  //   [
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
  //   ],
  //   [
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
  //     "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
  //   ],
  // ];

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

  const nutsProducts = products.filter(
    (product) => product.category === "Nuts"
  );
  const dryFruitsProducts = products.filter(
    (product) => product.category === "Dry Fruits"
  );
  const seedsProducts = products.filter(
    (product) => product.category === "Seeds"
  );
  const saffronProducts = products.filter(
    (product) => product.category === "Saffron"
  );
  const indianSpicesProducts = products.filter(
    (product) => product.category === "Indian Spices"
  );

  const handleViewAll = (category) => {
    // encodeURIComponent handles spaces, etc.
    navigate(`/products/${encodeURIComponent(category)}`);
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
          <PageHeader
            heading="Curated Nuts & Delicacies"
            onClick={() => handleViewAll("Nuts")}
          />
          <section
            className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-6 justify-items-center"
            data-aos="fade-left"
          >
            {nutsProducts.slice(0, 4).map((product) => {
              const uid = product.id || product._id;
              return (
                <div key={uid} className="w-full max-w-[250px] sm:max-w-none">
                  <ProductCard
                    id={uid}
                    key={uid}
                    imageUrl={product.image}
                    brand={product.category}
                    productName={product.title}
                    currentPrice={product.newPrice}
                    originalPrice={product.oldPrice}
                    onAddToCart={() =>
                      addToCart({
                        id: uid,
                        name: product.title,
                        price: product.newPrice,
                        oldPrice: product.oldPrice,
                        imageLight: product.image,
                      })
                    }
                  />
                </div>
              );
            })}
          </section>
        </div>
        <div className="px-3 md:px-9 " data-aos="fade-right">
          <OurVision />
        </div>
        {/* <div>
          <PageHeader
            heading="Curated Dry Fruits"
            onClick={() => handleViewAll("Dry Fruits")}
          />
          <section
            className="mx-auto w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-6 justify-items-center"
            data-aos="fade-left"
          >
            {dryFruitsProducts.slice(0, 4).map((product) => {
              const uid = product.id || product._id;
              return (
                <div key={uid} className="w-full max-w-[250px] sm:max-w-none">
                  <ProductCard
                    id={uid}
                    key={uid}
                    imageUrl={product.image}
                    brand={product.category}
                    productName={product.title}
                    currentPrice={product.newPrice}
                    originalPrice={product.oldPrice}
                    onAddToCart={() =>
                      addToCart({
                        id: uid,
                        name: product.title,
                        price: product.newPrice,
                        oldPrice: product.oldPrice,
                        imageLight: product.image,
                      })
                    }
                  />
                </div>
              );
            })}
          </section>
        </div> */}
        <div>
          <PageHeader
            heading="Curated Dry Fruits"
            onClick={() => handleViewAll("Dry Fruits")}
          />
          <section
            className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-10 justify-items-center"
            data-aos="fade-right"
          >
            {dryFruitsProducts.slice(0, 4).map((product) => {
              const uid = product.id || product._id;
              return (
                <div key={uid} className="w-full max-w-[250px] sm:max-w-none">
                  <ProductCard
                    id={uid}
                    key={uid}
                    imageUrl={product.image}
                    brand={product.category}
                    productName={product.title}
                    currentPrice={product.newPrice}
                    originalPrice={product.oldPrice}
                    onAddToCart={() =>
                      addToCart({
                        id: uid,
                        name: product.title,
                        price: product.newPrice,
                        oldPrice: product.oldPrice,
                        imageLight: product.image,
                      })
                    }
                  />
                </div>
              );
            })}
          </section>
        </div>
        <div>
          <PageHeader
            heading="Organic Seeds"
            onClick={() => handleViewAll("Seeds")}
          />
          <section
            className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-10 justify-items-center"
            data-aos="fade-right"
          >
            {seedsProducts.slice(0, 4).map((product) => {
              const uid = product.id || product._id;
              return (
                <div key={uid} className="w-full max-w-[250px] sm:max-w-none">
                  <ProductCard
                    id={uid}
                    key={uid}
                    imageUrl={product.image}
                    brand={product.category}
                    productName={product.title}
                    currentPrice={product.newPrice}
                    originalPrice={product.oldPrice}
                    onAddToCart={() =>
                      addToCart({
                        id: uid,
                        name: product.title,
                        price: product.newPrice,
                        oldPrice: product.oldPrice,
                        imageLight: product.image,
                      })
                    }
                  />
                </div>
              );
            })}
          </section>
        </div>
        <HomeHighlightSection />
        <div>
          <PageHeader
            heading="Saffron Collection"
            onClick={() => handleViewAll("Saffron")}
          />
          <section
            className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-10 justify-items-center"
            data-aos="fade-right"
          >
            {saffronProducts.slice(0, 4).map((product) => {
              const uid = product.id || product._id;
              return (
                <div key={uid} className="w-full max-w-[250px] sm:max-w-none">
                  <ProductCard
                    id={uid}
                    key={uid}
                    imageUrl={product.image}
                    brand={product.category}
                    productName={product.title}
                    currentPrice={product.newPrice}
                    originalPrice={product.oldPrice}
                    onAddToCart={() =>
                      addToCart({
                        id: uid,
                        name: product.title,
                        price: product.newPrice,
                        oldPrice: product.oldPrice,
                        imageLight: product.image,
                      })
                    }
                  />
                </div>
              );
            })}
          </section>
        </div>
        <div>
          <PageHeader
            heading="Indian Spices"
            onClick={() => handleViewAll("Indian Spices")}
          />
          <section
            className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-10 justify-items-center"
            data-aos="fade-right"
          >
            {indianSpicesProducts.slice(0, 4).map((product) => {
              const uid = product.id || product._id;
              return (
                <div key={uid} className="w-full max-w-[250px] sm:max-w-none">
                  <ProductCard
                    id={uid}
                    key={uid}
                    imageUrl={product.image}
                    brand={product.category}
                    productName={product.title}
                    currentPrice={product.newPrice}
                    originalPrice={product.oldPrice}
                    onAddToCart={() =>
                      addToCart({
                        id: uid,
                        name: product.title,
                        price: product.newPrice,
                        oldPrice: product.oldPrice,
                        imageLight: product.image,
                      })
                    }
                  />
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
