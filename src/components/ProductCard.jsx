"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import Rating from "./Rating";

export const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    originalPrice,
    discount,
    rating,
    reviewCount,
    images,
    category,
  } = product;
  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFav = isInWishlist(id);

  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Use first available variant or none
    const defaultColor = product.variants.colors?.[0]?.name;
    const defaultSize = product.variants.sizes?.[0];

    addItem(product, 1, defaultColor, defaultSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative flex flex-col w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Product Image Panel */}
      <Link
        href={`/products/${id}`}
        className="relative block aspect-square w-full overflow-hidden bg-slate-100 dark:bg-zinc-800"
      >
        <Image
          src={images[0]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            -{discount}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white/95 dark:bg-zinc-950/95 border border-slate-100 dark:border-zinc-800 rounded-full shadow-sm text-slate-400 hover:text-rose-500 dark:text-zinc-500 dark:hover:text-rose-500 transition-colors transform active:scale-90"
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4.5 h-4.5 ${isFav ? "fill-rose-500 text-rose-500" : ""}`}
          />
        </button>
      </Link>

      {/* Details Panel */}
      <div className="flex flex-col flex-1 p-4">
        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider uppercase mb-1">
          {category}
        </span>
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-zinc-100 line-clamp-2 min-h-[40px] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mt-2">
          <Rating value={rating} size={13} />
          <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
            ({reviewCount})
          </span>
        </div>

        {/* Pricing & Add Button */}
        <div className="flex items-end justify-between mt-auto pt-4">
          <div className="flex flex-col">
            {discount > 0 && (
              <span className="text-xs text-slate-400 dark:text-zinc-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-slate-900 dark:text-zinc-50">
              ${price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center p-2.5 rounded-xl border transition-all duration-200 transform active:scale-95 ${
              added
                ? "bg-emerald-500 border-emerald-500 text-white"
                : "bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-indigo-600 dark:hover:border-indigo-600"
            }`}
            aria-label="Add to cart"
          >
            {added ? (
              <Check className="w-5 h-5 animate-scale-in" />
            ) : (
              <ShoppingBag className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
