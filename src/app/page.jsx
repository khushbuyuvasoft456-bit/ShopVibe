import React from "react";
import HeroBanner from "@/components/HeroBanner";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import { DUMMY_PRODUCTS } from "@/constants/dummyData";

export default function HomePage() {
  // Filter categories and products
  const categoriesList = [
    "Electronics",
    "Fashion",
    "Beauty",
    "Sports",
    "Home & Kitchen",
  ];
  const featuredProducts = DUMMY_PRODUCTS.filter((p) => p.isFeatured).slice(
    0,
    8,
  );
  const bestSellers = DUMMY_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = DUMMY_PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-12 sm:pb-20">
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Categories Section */}
      <section className="animate-fade-in-up">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
            Browse by Category
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-450">
            Find everything you need across our tailored collections.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categoriesList.map((cat) => (
            <CategoryCard key={cat} name={cat} />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="animate-fade-in-up">
        <div className="flex items-end justify-between mb-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
              Featured Products
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-450">
              Handpicked premium additions curated specifically for you.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="animate-fade-in-up">
        <div className="flex flex-col gap-1 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
            Best Sellers
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-450">
            The community's most-loved products flying off the shelves.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="animate-fade-in-up">
        <div className="flex flex-col gap-1 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
            New Arrivals
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-450">
            Be the first to get your hands on our fresh catalog releases.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}
