import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSection/HeroSlider";
import ProductCard from "../../components/Atoms/ProductCard";
import PageHeader from "../../components/Atoms/PageHeader";
import OurVision from "../../components/OurVision/OurVision";
import { useProduct } from "../../context/productContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useCart } from "../../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAllProducts } = useProduct();

  const { addToCart } = useCart();

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

  // console.log(products);

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
          <section
            className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-6 justify-items-center"
            data-aos="fade-left"
          >
            {products.slice(0, 8).map((product) => {
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
        <div>
          <PageHeader heading="Featured Collection" onClick={handleViewAll} />
          <section
            className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-10 justify-items-center"
            data-aos="fade-left"
          >
            {products.slice(0, 8).map((product) => {
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
          <PageHeader heading="Ajfan Specialties" onClick={handleViewAll} />
          <section
            className="mx-auto w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mb-5 px-3 sm:px-10 justify-items-center"
            data-aos="fade-right"
          >
            {products.slice(0, 8).map((product) => {
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
          {/* <div className="px-3 md:px-9 " data-aos="fade-right">
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold text-orange-600 mb-4 tracking-wider">
                KOA Moments Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                {galleryImages.map((col, i) => (
                  <div className="grid gap-4" key={i}>
                    {col.map((img, j) => (
                      <div key={j}>
                        <img
                          className="h-auto max-w-full rounded-lg"
                          src={img}
                          alt={`KOA gallery ${i * 3 + j + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
