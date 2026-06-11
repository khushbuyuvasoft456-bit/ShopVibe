import React from "react";

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl overflow-hidden p-4 gap-4 animate-pulse">
      <div className="aspect-square w-full bg-slate-100 dark:bg-zinc-800 rounded-xl" />
      <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded w-1/3" />
      <div className="h-6 bg-slate-100 dark:bg-zinc-800 rounded w-3/4" />
      <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded w-1/2" />
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 dark:border-zinc-800">
        <div className="flex flex-col gap-1 w-1/3">
          <div className="h-3 bg-slate-100 dark:bg-zinc-800 rounded" />
          <div className="h-5 bg-slate-100 dark:bg-zinc-800 rounded" />
        </div>
        <div className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const ProductDetailSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 animate-pulse py-8">
      {/* Gallery skeleton */}
      <div className="flex flex-col gap-4">
        <div className="aspect-square w-full bg-slate-100 dark:bg-zinc-800 rounded-2xl" />
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
          <div className="w-20 h-20 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
          <div className="w-20 h-20 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
        </div>
      </div>

      {/* Details skeleton */}
      <div className="flex flex-col gap-6">
        <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded w-1/4" />
        <div className="h-10 bg-slate-100 dark:bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded w-1/3" />
        <div className="h-8 bg-slate-100 dark:bg-zinc-800 rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded" />
          <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded" />
          <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded w-5/6" />
        </div>
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
          <div className="h-8 bg-slate-100 dark:bg-zinc-800 rounded w-1/2" />
          <div className="h-12 bg-slate-100 dark:bg-zinc-800 rounded w-full" />
        </div>
      </div>
    </div>
  );
};
