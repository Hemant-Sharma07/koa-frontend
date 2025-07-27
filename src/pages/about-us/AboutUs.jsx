// AboutUs.jsx

import React from "react";

// Gallery images array for clarity

// Product feature cards info
const sections = [
  {
    img: "https://thumbs.dreamstime.com/b/mixed-dry-fruits-25481129.jpg",
    title: "Premium Nuts",
    desc: "Savor the crunch of our highest-grade almonds, cashews, and pistachios, perfected by nature and careful roasting.",
  },
  {
    img: "https://images.unsplash.com/photo-1667698346594-78ff9598d100?q=80&w=2695&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Exotic Dried Fruits",
    desc: "From sun-dried apricots to soft Medjool dates, enjoy nature’s candy packed with energy and vitamins.",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1676208753932-6e8bc83a0b0d?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Healthy Seeds Mix",
    desc: "Fuel your day with our mixes of chia, flax, and pumpkin seeds — a modern twist on everyday nutrition.",
  },
];

export default function AboutUs() {
  return (
    <div className="mx-auto py-6 px-4 sm:px-10 text-justify">
      {/* Intro */}
      <section>
        <h1
          className="text-xl md:text-3xl font-bold text-orange-600 mb-4 text-center md:mb-10"
          data-aos="fade-down"
        >
          About Us
        </h1>
        <p className="text-gray-700 mb-6 md:text-lg" data-aos="fade-zoom-in">
          Welcome to{" "}
          <span className="font-semibold text-orange-600">KOA Dryfruits</span> —
          your destination for premium nuts, dried fruits, seeds, and healthy
          treats. We blend traditional values with a modern touch, delivering
          nature’s best in every pack.
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-8" data-aos="fade-zoom-in">
        <h2 className="text-lg md:text-xl font-semibold text-orange-500 mb-2">
          Our Vision
        </h2>
        <p className="text-gray-700">
          KOA Dry fruits and spices envisions becoming a leading global choice
          regarding premium quality dry fruits and spices, catering to the
          diverse needs of customers worldwide. KOA’s main vision lies with
          finest quality, customer satisfaction and sustainable growth
        </p>
      </section>
      <section className="mb-8" data-aos="fade-zoom-in">
        <h2 className="text-lg md:text-xl font-semibold text-orange-500 mb-2">
          Straight from nature/Origin
        </h2>
        <p className="text-gray-700">
          KOA source finest quality of dry fruits and spices from origin where
          they are grown in natural conditions like India, Iran, Afghanistan and
          United States of America. The best quality saffron from Pampore
          valley(Kashmir) is offered to our customers in India. Kashmiri
          Kesar(Mongra Saffron) and Mamra is renowed for its unique rich
          flavour, vibrant colour, exceptional aroma and highest grade
          containing only red part of the stigma, ensuring the highest
          concentration of colour and flavour compounds
        </p>
      </section>

      {/* Gallery */}

      {/* Unique features list */}
      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-orange-500 mb-2">
          What Makes Us Unique
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>
            Premium Selection: Only the best handpicked nuts and dried fruits
            make it to your box.
          </li>
          <li>
            Farm-to-Table Freshness: We work with local and international farms
            for high-quality, chemical-free products.
          </li>
          <li>
            Modern Packaging: Our eco-friendly, air-sealed packs keep your
            favorites crisp and flavorful.
          </li>
          <li>
            Quality Assurance: Each batch is rigorously tested to match our
            exacting standards.
          </li>
        </ul>
      </section>

      {/* Table */}
      <section className="mb-10 " data-aos="fade-right">
        <h2 className="text-lg md:text-xl font-semibold text-orange-500 mb-2">
          Why Choose KOA Dryfruits?
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-orange-100 text-gray-700 mb-8">
            <tbody>
              <tr className="border-b border-orange-100">
                <td className="p-2 font-bold">Pure Ingredients</td>
                <td className="p-2">
                  No preservatives, no additives, just pure dry fruits and nuts
                </td>
              </tr>
              <tr className="border-b border-orange-100">
                <td className="p-2 font-bold">Wide Variety</td>
                <td className="p-2">
                  Almonds, cashews, walnuts, pistachios, dates, figs, and more
                </td>
              </tr>
              <tr className="border-b border-orange-100">
                <td className="p-2 font-bold">Nutritional Value</td>
                <td className="p-2">
                  Rich in protein, healthy fats, and essential vitamins &
                  minerals
                </td>
              </tr>
              <tr className="border-b border-orange-100">
                <td className="p-2 font-bold">Fast Shipping</td>
                <td className="p-2">
                  Nationwide delivery, hassle-free returns
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Trusted By Many</td>
                <td className="p-2">Loved by over 50,000+ happy families</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Product highlights */}
      <section className="mb-12" data-aos="fade-right">
        <h2 className="text-lg md:text-xl font-semibold text-orange-500 mb-4">
          Meet Our Healthy Delights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((sec, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden shadow-lg bg-white p-4 flex flex-col items-center"
            >
              <img
                src={sec.img}
                alt={sec.title}
                className="h-56 w-full object-cover rounded-md mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-bold text-orange-700 mb-2">
                {sec.title}
              </h3>
              <p className="text-gray-600 text-center">{sec.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Culture and contact */}
      <section className="mb-6" data-aos="fade-zoom-in">
        <h2 className="text-lg md:text-xl font-semibold text-orange-500 mb-2">
          Community, Tradition, and Innovation
        </h2>
        <p className="text-gray-700">
          At KOA, we see dry fruits as more than snacks — they’re a tradition, a
          part of our celebrations, and a step toward a healthier lifestyle. By
          fusing generational wisdom with modern logistics and design, we offer
          you variety, nutrition, and the joy of authentic taste.
        </p>
      </section>

      <p className="text-xs text-gray-400 mt-8 text-center">
        KOA Dryfruits — Modern Tastes. Traditional Roots. Real Goodness.
        <br />
        <span className="italic">
          All images shown are representative; actual products may vary.
        </span>
      </p>
    </div>
  );
}
