import React from "react";
import ProductCard from "../Atoms/ProductCard";
import PageHeader from "../Atoms/PageHeader";

const ViewCategoryProducts = ({ category, products, onBack }) => {
  const filteredProducts = products.filter(
    (product) => product.category?.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="w-full px-4">
      <PageHeader
        heading={`All in ${category}`}
        onClick={onBack}
        btnText="Back"
      />
      <section className="mx-auto w-full flex flex-wrap justify-items-center justify-evenly gap-6 mt-10 mb-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              imageUrl={product.image}
              brand={product.category}
              productName={product.title}
              currentPrice={product.newPrice}
              originalPrice={product.oldPrice}
            />
          ))
        ) : (
          <p className="text-center w-full text-gray-500">
            No products found in this category.
          </p>
        )}
      </section>
    </div>
  );
};

export default ViewCategoryProducts;
