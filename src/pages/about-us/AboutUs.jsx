// AboutUs.jsx

import React from "react";

// Gallery images array for clarity

// Product feature cards info
const sections = [
  {
    img: "https://images.unsplash.com/photo-1519864600265-abb277fd567f?auto=format&fit=crop&w=400&q=80",
    title: "Premium Nuts",
    desc: "Savor the crunch of our highest-grade almonds, cashews, and pistachios, perfected by nature and careful roasting.",
  },
  {
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    title: "Exotic Dried Fruits",
    desc: "From sun-dried apricots to soft Medjool dates, enjoy nature’s candy packed with energy and vitamins.",
  },
  {
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    title: "Healthy Seeds Mix",
    desc: "Fuel your day with our mixes of chia, flax, and pumpkin seeds — a modern twist on everyday nutrition.",
  },
];

export default function AboutUs() {
  return (
    <div className="mx-auto py-6 px-4 sm:px-10">
      {/* Intro */}
      <section>
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
          About Us
        </h1>
        <p className="text-gray-700 mb-6 md:text-lg">
          Welcome to{" "}
          <span className="font-semibold text-orange-600">KOA Dryfruits</span> —
          your destination for premium nuts, dried fruits, seeds, and healthy
          treats. We blend traditional values with a modern touch, delivering
          nature’s best in every pack.
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-orange-500 mb-2">
          Our Story
        </h2>
        <p className="text-gray-700">
          Founded with a passion for health and taste, KOA began as a small
          family-run venture dedicated to sourcing the freshest, highest-quality
          dry fruits directly from trusted farms. Today, we have grown into a
          vibrant online community, sharing our love for wholesome snacking with
          homes across India and beyond.
        </p>
      </section>

      {/* Gallery */}

      {/* Unique features list */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-orange-500 mb-2">
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
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-orange-500 mb-2">
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
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">
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
                className="h-40 w-full object-cover rounded-md mb-4"
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
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-orange-500 mb-2">
          Community, Tradition, and Innovation
        </h2>
        <p className="text-gray-700">
          At KOA, we see dry fruits as more than snacks — they’re a tradition, a
          part of our celebrations, and a step toward a healthier lifestyle. By
          fusing generational wisdom with modern logistics and design, we offer
          you variety, nutrition, and the joy of authentic taste.
        </p>
      </section>

      <section className="text-center mt-6 mb-2">
        <h2 className="text-xl font-semibold text-orange-600 mb-2">
          Join the KOA Family
        </h2>
        <p className="text-gray-700 mb-3">
          Follow us on social media for recipes, tips, and seasonal offers, or
          contact our expert team for personal guidance!
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://instagram.com/"
            className="text-orange-600 font-medium underline hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com/"
            className="text-orange-600 font-medium underline hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
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
