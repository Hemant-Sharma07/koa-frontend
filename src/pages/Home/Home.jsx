import React from "react";
import HeroSlider from "../../components/HeroSection/HeroSlider";
import ProductCard from "../../components/Atoms/ProductCard";
import PageHeader from "../../components/Atoms/PageHeader";

const Home = () => {
  const products = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1646753522408-077ef9839300",
      brand: "Nike",
      name: "Air Max Shoes",
      price: "149",
      originalPrice: "199",
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1651950519238-15835722f8bb",
      brand: "Adidas",
      name: "Running Sneakers",
      price: "129",
      originalPrice: "179",
    },
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1646753522408-077ef9839300",
      brand: "Nike",
      name: "Air Max Shoes",
      price: "149",
      originalPrice: "199",
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1651950519238-15835722f8bb",
      brand: "Adidas",
      name: "Running Sneakers",
      price: "129",
      originalPrice: "179",
    },
  ];
  return (
    <>
      <div className="mx-auto px-3">
        <HeroSlider />
        <div>
          <PageHeader heading="Hello" />
          <section className="mx-auto w-full flex flex-wrap justify-items-center justify-evenly gap-6 mt-10 mb-5 px-3 md:px-0">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageUrl={product.imageUrl}
                brand={product.brand}
                productName={product.name}
                currentPrice={product.price}
                originalPrice={product.originalPrice}
              />
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
