import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

const ShoppingCart = () => {
  const cartItems = [
    {
      id: 1,
      name: 'PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout INT',
      price: 1499,
      quantity: 2,
      imageLight:
        "https://www.nutraj.com/cdn/shop/files/9-healthy-and-delicious-dry-fruits-featured-image-450300-mobile-view.jpg?v=1688041386",
    },
    {
      id: 2,
      name: "Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with Midnight Sport Band",
      price: 598,
      quantity: 1,
      imageLight:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg",
    },
    {
      id: 3,
      name: 'Apple - MacBook Pro 16" Laptop, M3 Pro chip, 36GB Memory, 18-core GPU, 512GB SSD, Space Black',
      price: 1799,
      quantity: 1,
      imageLight:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg",
    },
    {
      id: 4,
      name: 'Tablet APPLE iPad Pro 12.9" 6th Gen, 128GB, Wi-Fi, Gold',
      price: 699,
      quantity: 1,
      imageLight:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg",
    },
    {
      id: 5,
      name: "APPLE iPhone 15 5G phone, 256GB, Gold",
      price: 999,
      quantity: 3,
      imageLight:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg",
    },
  ];

  const recommendedProducts = [
    {
      id: 6,
      name: 'iMac 27"',
      description:
        "This generation has some improvements, including a longer continuous battery life.",
      originalPrice: 399.99,
      salePrice: 299,
      imageLight:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
    },
    {
      id: 7,
      name: "Playstation 5",
      description:
        "This generation has some improvements, including a longer continuous battery life.",
      originalPrice: 799.99,
      salePrice: 499,
      imageLight:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg",
    },
    {
      id: 8,
      name: "Apple Watch Series 8",
      description:
        "This generation has some improvements, including a longer continuous battery life.",
      originalPrice: 1799.99,
      salePrice: 1199,
      imageLight:
        "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savings = 299;
  const pickupFee = 99;
  const tax = 799;
  const total = subtotal - savings + pickupFee + tax;

  return (
    <section className="mx-auto bg-white py-5 md:py-10 px-3 sm:px-10">
      <div className="px-4 sm:px-2">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* <div className="hidden xl:mt-8 xl:block">
              <h3 className="text-2xl font-semibold text-gray-900">
                People also bought
              </h3>
              <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
                {recommendedProducts.map((product) => (
                  <RecommendedProduct key={product.id} product={product} />
                ))}
              </div>
            </div> */}
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <OrderSummary
              subtotal={subtotal}
              savings={savings}
              pickupFee={pickupFee}
              tax={tax}
              total={total}
            />

            {/* <VoucherForm /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
