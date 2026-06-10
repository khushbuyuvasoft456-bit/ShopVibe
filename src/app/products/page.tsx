"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown, Search, X } from "lucide-react";
import { ProductService } from "@/services/api";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import { ProductGridSkeleton } from "@/components/Skeletons";
import { CATEGORIES } from "@/constants/dummyData";

const ITEMS_PER_PAGE = 8;

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search parameters from URL
  const urlCategory = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";
  const urlSort = searchParams.get("sort") || "popular";
  const urlPage = parseInt(searchParams.get("page") || "1", 10);

  // Local states
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch products when URL parameters change
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const data = await ProductService.getProducts(urlCategory, urlSearch, urlSort);
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredProducts();
  }, [urlCategory, urlSearch, urlSort]);

  // Handle URL filters updates
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.set("page", "1"); // reset page on filter change
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/products");
  };

  // Pagination calculations
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (urlPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="pb-16">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          { label: urlCategory !== "All" ? urlCategory : "All Products" },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0 flex-col gap-6">
          <div className="border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-zinc-50 flex items-center gap-2">
                <SlidersHorizontal className="w-4.5 h-4.5" /> Filters
              </h3>
              {(urlCategory !== "All" || urlSearch || urlSort !== "popular") && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-rose-500 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-200">Categories</h4>
              <div className="flex flex-col gap-2.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateFilters("category", cat)}
                    className={`text-left text-sm font-medium py-1 transition-colors ${
                      urlCategory === cat
                        ? "text-indigo-650 font-bold"
                        : "text-slate-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid Section */}
        <div className="flex-1">
          {/* Top control bar */}
          <div className="flex items-center justify-between border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-4 mb-6 gap-4">
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-semibold">
              Showing <span className="text-slate-800 dark:text-zinc-100">{totalItems}</span> results
              {urlSearch && (
                <>
                  {" "}
                  for "<span className="text-indigo-650">{urlSearch}</span>"
                </>
              )}
            </p>

            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={urlSort}
                onChange={(e) => updateFilters("sort", e.target.value)}
                className="bg-transparent text-sm font-semibold outline-none border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 focus:border-indigo-500 dark:text-zinc-200"
              >
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Biggest Discounts</option>
              </select>

              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden p-2 border border-slate-200 dark:border-zinc-800 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Open filters"
              >
                <SlidersHorizontal className="w-4.5 h-4.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Active filters badges */}
          {(urlCategory !== "All" || urlSearch) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {urlCategory !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 text-xs font-semibold rounded-full">
                  Category: {urlCategory}
                  <button onClick={() => updateFilters("category", "All")}>
                    <X className="w-3 h-3 hover:text-indigo-900" />
                  </button>
                </span>
              )}
              {urlSearch && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 text-xs font-semibold rounded-full">
                  Search: {urlSearch}
                  <button onClick={() => updateFilters("search", "")}>
                    <X className="w-3 h-3 hover:text-indigo-900" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Products Loading / Error / Results Grid */}
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 p-8">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">No products found</h3>
              <p className="text-sm text-slate-500 dark:text-zinc-550 mt-1 max-w-sm mx-auto">
                We couldn't find any items matching your filters. Try clearing your search parameters or select a different category.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 px-5 py-2.5 bg-indigo-650 hover:bg-indigo-750 text-white font-bold rounded-xl transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={urlPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Drawer body */}
          <div className="relative w-80 max-w-full bg-white dark:bg-zinc-900 h-full p-6 shadow-2xl flex flex-col gap-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
              <h3 className="font-bold text-slate-900 dark:text-zinc-50 flex items-center gap-2">
                <SlidersHorizontal className="w-4.5 h-4.5" /> Filters
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-650"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories list */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-200">Categories</h4>
              <div className="flex flex-col gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      updateFilters("category", cat);
                      setMobileFiltersOpen(false);
                    }}
                    className={`text-left text-base font-semibold py-1.5 transition-colors ${
                      urlCategory === cat
                        ? "text-indigo-650 font-bold"
                        : "text-slate-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                clearFilters();
                setMobileFiltersOpen(false);
              }}
              className="mt-auto w-full py-3 border border-rose-500 text-rose-500 font-bold rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all text-center"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loader text="Loading catalog..." />}>
      <ProductsContent />
    </Suspense>
  );
}

// Inline fallback loader helper
function Loader({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full animate-pulse">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-slate-500 text-sm font-semibold">{text}</span>
    </div>
  );
}
