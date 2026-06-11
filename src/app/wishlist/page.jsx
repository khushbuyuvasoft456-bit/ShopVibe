"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag, Check } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import Breadcrumb from "@/components/Breadcrumb";
import Rating from "@/components/Rating";

export default function WishlistPage() {
  const { items, toggleWishlist } = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  // Success add state tracks product id
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (product) => {
    // Select default variants if available
    const color = product.variants.colors?.[0]?.name;
    const size = product.variants.sizes?.[0];

    addItem(product, 1, color, size);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  if (items.length === 0) {
    return (
      <div className="pb-20">
        <Breadcrumb items={[{ label: "Wishlist" }]} />
        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto mt-6 shadow-sm">
          <Heart className="w-16 h-16 text-slate-350 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-450 mt-2">
            Save your favorite items here to track their availability, special
            sales, and buy them with a single click.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-indigo-650 hover:bg-indigo-750 text-white font-bold rounded-xl shadow-md transition-all transform active:scale-95"
          >
            Start Browsing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Breadcrumb items={[{ label: "Wishlist" }]} />

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight mt-2">
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {items.map((product) => {
          const isAdded = addedId === product.id;
          return (
            <div
              key={product.id}
              className="group relative flex flex-col w-full bg-white dark:bg-zinc-900 border border-slate-105 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Product Cover image */}
              <div className="relative aspect-square w-full bg-slate-50 dark:bg-zinc-850 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Remove button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 bg-white/95 dark:bg-zinc-950/95 border border-slate-100 dark:border-zinc-800 rounded-full text-rose-500 shadow-sm hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Detail Panel */}
              <div className="flex flex-col flex-1 p-4">
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1">
                  {product.category}
                </span>
                <Link
                  href={`/products/${product.id}`}
                  className="font-bold text-sm text-slate-800 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2 min-h-[40px]"
                >
                  {product.name}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  <Rating value={product.rating} size={12} />
                  <span className="text-[11px] text-slate-400 font-semibold">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price and Cart Action */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-zinc-850">
                  <span className="font-extrabold text-base text-slate-900 dark:text-zinc-50">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all transform active:scale-95 ${
                      isAdded
                        ? "bg-emerald-500 border border-emerald-500 text-white"
                        : "bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-350 dark:hover:bg-indigo-600"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" /> Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
