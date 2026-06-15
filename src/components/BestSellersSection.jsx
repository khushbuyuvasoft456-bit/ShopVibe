"use client";

import React, { useState, useEffect } from "react";
import { ProductService } from "@/services/api";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./Skeletons";

export default function BestSellersSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchBestSellers = async () => {
      try {
        const allProducts = await ProductService.getProducts();
        const filtered = allProducts.filter((p) => p.isBestSeller).slice(0, 4);
        if (isMounted) {
          setProducts(filtered);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to load best sellers:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBestSellers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="animate-fade-in-up">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
          Best Sellers
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-450">
          The community's most-loved products flying off the shelves.
        </p>
      </div>
      {loading ? (
        <ProductGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
