"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown, Search, X, Star } from "lucide-react";
import { ProductService } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import { ProductGridSkeleton } from "@/components/Skeletons";
import { CATEGORIES } from "@/constants/dummyData";

const ITEMS_PER_PAGE = 8;

// Filter Controls Component (shared between desktop sidebar and mobile drawer)
function FilterControls({
  urlCategory,
  urlMinPrice,
  urlMaxPrice,
  urlMinRating,
  updateFilters,
  onFilterApply,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [localMinPrice, setLocalMinPrice] = useState(urlMinPrice || "");
  const [localMaxPrice, setLocalMaxPrice] = useState(urlMaxPrice || "");

  useEffect(() => {
    setLocalMinPrice(urlMinPrice || "");
  }, [urlMinPrice]);

  useEffect(() => {
    setLocalMaxPrice(urlMaxPrice || "");
  }, [urlMaxPrice]);

  const handleApplyPrice = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (localMinPrice) params.set("minPrice", localMinPrice);
    else params.delete("minPrice");
    
    if (localMaxPrice) params.set("maxPrice", localMaxPrice);
    else params.delete("maxPrice");
    
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
    if (onFilterApply) onFilterApply();
  };

  const handleRatingSelect = (rating) => {
    updateFilters("minRating", rating === urlMinRating ? "" : rating);
    if (onFilterApply) onFilterApply();
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
          Categories
        </h4>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                updateFilters("category", cat);
                if (onFilterApply) onFilterApply();
              }}
              className={`text-left text-sm font-semibold py-1.5 px-3 rounded-xl transition-all ${
                urlCategory === cat
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold"
                  : "text-slate-600 hover:text-indigo-650 dark:text-zinc-400 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-slate-100 dark:border-zinc-800/60" />

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
          Price Range
        </h4>
        <form onSubmit={handleApplyPrice} className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1.5 text-xs font-semibold text-slate-400">$</span>
              <input
                type="number"
                placeholder="Min"
                value={localMinPrice}
                onChange={(e) => setLocalMinPrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-800/50 text-xs font-semibold pl-5 pr-2 py-1.5 border border-transparent dark:border-transparent rounded-xl focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all dark:text-zinc-200"
              />
            </div>
            <span className="text-slate-400 dark:text-zinc-500 font-medium text-xs">to</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1.5 text-xs font-semibold text-slate-400">$</span>
              <input
                type="number"
                placeholder="Max"
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(e.target.value)}
                className="w-full bg-slate-50 dark:bg-zinc-800/50 text-xs font-semibold pl-5 pr-2 py-1.5 border border-transparent dark:border-transparent rounded-xl focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all dark:text-zinc-200"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-indigo-600/10 cursor-pointer"
          >
            Apply Price
          </button>
        </form>
      </div>

      <hr className="border-slate-100 dark:border-zinc-800/60" />

      {/* Rating Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
          Rating
        </h4>
        <div className="flex flex-col gap-1">
          {[4, 3, 2, 1].map((rating) => {
            const isSelected = urlMinRating === rating.toString();
            return (
              <button
                key={rating}
                onClick={() => handleRatingSelect(rating.toString())}
                className={`flex items-center gap-2 py-1.5 px-3 rounded-xl text-left text-sm transition-all ${
                  isSelected
                    ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold"
                    : "text-slate-600 hover:text-indigo-650 dark:text-zinc-400 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40"
                }`}
              >
                <div className="flex items-center text-amber-400 gap-0.5 shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rating ? "fill-amber-400 text-amber-400" : "text-slate-350 dark:text-zinc-750"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold">& Up</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search parameters from URL
  const urlCategory = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("search") || "";
  const urlSort = searchParams.get("sort") || "popular";
  const urlMinPrice = searchParams.get("minPrice") || "";
  const urlMaxPrice = searchParams.get("maxPrice") || "";
  const urlMinRating = searchParams.get("minRating") || "";
  const urlPage = parseInt(searchParams.get("page") || "1", 10);

  // Local states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Fetch products when URL parameters change
  useEffect(() => {
    let active = true;
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const data = await ProductService.getProducts(
          urlCategory,
          urlSearch,
          urlSort,
          urlMinPrice,
          urlMaxPrice,
          urlMinRating,
        );
        if (active) {
          setProducts(data);
        }
      } catch (err) {
        if (active) {
          console.error("Failed to load products:", err);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    fetchFilteredProducts();
    return () => {
      active = false;
    };
  }, [urlCategory, urlSearch, urlSort, urlMinPrice, urlMaxPrice, urlMinRating]);

  // Handle URL filters updates
  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "" || value === null || value === undefined || (key === "category" && value === "All")) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
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
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handlePageChange = (page) => {
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
              {(urlCategory !== "All" ||
                urlSearch ||
                urlMinPrice ||
                urlMaxPrice ||
                urlMinRating ||
                urlSort !== "popular") && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-rose-500 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <FilterControls
              urlCategory={urlCategory}
              urlMinPrice={urlMinPrice}
              urlMaxPrice={urlMaxPrice}
              urlMinRating={urlMinRating}
              updateFilters={updateFilters}
            />
          </div>
        </aside>

        {/* Products Grid Section */}
        <div className="flex-1">
          {/* Top control bar */}
          <div className="flex items-center justify-between border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-4 mb-6 gap-4">
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-semibold">
              Showing{" "}
              <span className="text-slate-800 dark:text-zinc-100">
                {totalItems}
              </span>{" "}
              results
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
          {(urlCategory !== "All" || urlSearch || urlMinPrice || urlMaxPrice || urlMinRating) && (
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
              {(urlMinPrice || urlMaxPrice) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 text-xs font-semibold rounded-full">
                  Price: {urlMinPrice ? `$${urlMinPrice}` : "$0"} - {urlMaxPrice ? `$${urlMaxPrice}` : "Any"}
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.delete("minPrice");
                      params.delete("maxPrice");
                      router.push(`/products?${params.toString()}`);
                    }}
                  >
                    <X className="w-3 h-3 hover:text-indigo-900" />
                  </button>
                </span>
              )}
              {urlMinRating && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 text-xs font-semibold rounded-full">
                  Rating: {urlMinRating}+ Stars
                  <button onClick={() => updateFilters("minRating", "")}>
                    <X className="w-3 h-3 hover:text-indigo-900" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Products Loading / Error / Results Grid */}
          {loading ? (
            <ProductGridSkeleton count={8} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" />
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800 p-8">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200">
                No products found
              </h3>
              <p className="text-sm text-slate-500 dark:text-zinc-550 mt-1 max-w-sm mx-auto">
                We couldn't find any items matching your filters. Try clearing
                your search parameters or select a different category.
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
          <div className="relative w-80 max-w-full bg-white dark:bg-zinc-900 h-full p-6 shadow-2xl flex flex-col gap-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4 shrink-0">
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

            <FilterControls
              urlCategory={urlCategory}
              urlMinPrice={urlMinPrice}
              urlMaxPrice={urlMaxPrice}
              urlMinRating={urlMinRating}
              updateFilters={updateFilters}
              onFilterApply={() => setMobileFiltersOpen(false)}
            />

            <button
              onClick={() => {
                clearFilters();
                setMobileFiltersOpen(false);
              }}
              className="mt-auto w-full py-3 border border-rose-500 text-rose-500 font-bold rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all text-center shrink-0 cursor-pointer"
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
function Loader({ text }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 w-full animate-pulse">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-slate-500 text-sm font-semibold">{text}</span>
    </div>
  );
}
