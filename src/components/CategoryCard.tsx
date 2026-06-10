import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  name: string;
}

const categoryImages: Record<string, string> = {
  Electronics: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
  Fashion: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
  "Home & Kitchen": "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=600&auto=format&fit=crop&q=80",
  Beauty: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=80",
  Sports: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&auto=format&fit=crop&q=80",
  All: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=80",
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ name }) => {
  const imageUrl = categoryImages[name] || categoryImages["All"];

  return (
    <Link
      href={`/products?category=${encodeURIComponent(name)}`}
      className="group relative block aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

      {/* Label */}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-lg font-bold text-white tracking-wide">
          {name}
        </h3>
        <p className="text-xs text-indigo-300 font-medium mt-0.5 group-hover:underline">
          Explore collection &rarr;
        </p>
      </div>
    </Link>
  );
};
export default CategoryCard;
