"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Check,
} from "lucide-react";
import { ProductService } from "@/services/api";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import Rating from "@/components/Rating";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { ProductDetailSkeleton } from "@/components/Skeletons";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);

  // Zustand Store
  const addItem = useCartStore((state) => state.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isFav = isInWishlist(id);

  // State Management
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gallery Cover image
  const [activeImage, setActiveImage] = useState("");

  // Selected Variants
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Add feedback
  const [added, setAdded] = useState(false);

  // New Review Mock Form
  const [reviewsList, setReviewsList] = useState([]);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Fetch product data
  useEffect(() => {
    const loadProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const item = await ProductService.getProductById(id);
        if (item) {
          setProduct(item);
          setActiveImage(item.images[0]);
          setReviewsList(item.reviews);

          // Select default variants if available
          if (item.variants.colors && item.variants.colors.length > 0) {
            setSelectedColor(item.variants.colors[0].name);
          }
          if (item.variants.sizes && item.variants.sizes.length > 0) {
            setSelectedSize(item.variants.sizes[0]);
          }

          // Fetch related products
          const related = await ProductService.getRelatedProducts(
            item.category,
            item.id,
          );
          setRelatedProducts(related);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="py-6">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
          Something went wrong
        </h2>
        <p className="text-slate-500 dark:text-zinc-500 mt-2">
          {error || "Product could not be loaded."}
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block px-5 py-2.5 bg-indigo-650 text-white font-bold rounded-xl"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(
      product,
      quantity,
      selectedColor || undefined,
      selectedSize || undefined,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReviewName.trim() && newReviewComment.trim()) {
      const addedReview = {
        id: "rev-new-" + Math.random().toString(36).substr(2, 9),
        userName: newReviewName.trim(),
        rating: newReviewRating,
        comment: newReviewComment.trim(),
        date: new Date().toISOString().split("T")[0],
      };
      setReviewsList([addedReview, ...reviewsList]);
      setNewReviewName("");
      setNewReviewComment("");
      setNewReviewRating(5);
      setReviewSuccess(true);
      setTimeout(() => setReviewSuccess(false), 3000);
    }
  };

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Products", href: "/products" },
          {
            label: product.category,
            href: `/products?category=${encodeURIComponent(product.category)}`,
          },
          { label: product.name },
        ]}
      />

      {/* Main Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6">
        {/* Left Side: Images Gallery (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center transition-all duration-350"
              priority
            />
          </div>
          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 bg-slate-50 dark:bg-zinc-900 shrink-0 ${
                    activeImage === img
                      ? "border-indigo-600 scale-95"
                      : "border-transparent hover:border-slate-350"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    fill
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Description & CTAs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div>
            <span className="text-xs text-indigo-650 dark:text-indigo-400 font-bold uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight mt-1">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <Rating value={product.rating} size={15} />
              <span className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
                {product.rating} ({reviewsList.length} user reviews)
              </span>
            </div>
          </div>

          {/* Pricing Panel */}
          <div className="p-4 bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800 rounded-2xl flex items-center gap-4">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-zinc-50">
              ${product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-lg font-medium text-slate-450 dark:text-zinc-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-2.5 py-1 rounded-full">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-slate-600 dark:text-zinc-350 text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Variant selections */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
            {/* Color Swatch */}
            {product.variants.colors && product.variants.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-bold text-slate-800 dark:text-zinc-250">
                  Select Color:{" "}
                  <span className="font-semibold text-slate-500">
                    {selectedColor}
                  </span>
                </span>
                <div className="flex gap-3">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-all flex items-center justify-center ${
                        selectedColor === color.name
                          ? "border-indigo-650 scale-105 shadow-md shadow-indigo-650/10"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <Check
                          className={`w-4 h-4 ${
                            color.name === "Platinum Silver"
                              ? "text-slate-950"
                              : "text-white"
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Swatch */}
            {product.variants.sizes && product.variants.sizes.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-bold text-slate-800 dark:text-zinc-250">
                  Select Size:{" "}
                  <span className="font-semibold text-slate-500">
                    {selectedSize}
                  </span>
                </span>
                <div className="flex gap-2">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-bold border rounded-xl transition-all ${
                        selectedSize === size
                          ? "bg-indigo-600 border-indigo-655 text-white shadow-md shadow-indigo-600/10"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-350 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100 dark:border-zinc-800">
            {/* Quantity Selector */}
            <div className="flex items-center justify-between border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 bg-white dark:bg-zinc-900 w-full sm:w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-lg font-bold text-slate-550 hover:text-slate-800 dark:hover:text-white"
              >
                -
              </button>
              <span className="font-bold text-slate-800 dark:text-zinc-100">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="text-lg font-bold text-slate-550 hover:text-slate-850 dark:hover:text-white"
              >
                +
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transform active:scale-98 transition-all ${
                added
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10"
                  : "bg-indigo-600 hover:bg-indigo-750 text-white shadow-lg shadow-indigo-700/10"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`py-3 px-4 rounded-xl border flex items-center justify-center transition-all ${
                isFav
                  ? "border-rose-200 bg-rose-50 text-rose-650 hover:bg-rose-100 dark:bg-rose-950/20 dark:border-rose-900"
                  : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
              }`}
              aria-label="Wishlist toggle"
            >
              <Heart
                className={`w-5 h-5 ${isFav ? "fill-rose-500 text-rose-500" : ""}`}
              />
            </button>
          </div>

          {/* Delivery badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-850 p-4 rounded-xl mt-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4.5 h-4.5 text-indigo-600" /> Free Shipping
            </div>
            <div className="flex items-center gap-2 border-y sm:border-y-0 sm:border-x border-slate-200 dark:border-zinc-850 py-2 sm:py-0 sm:px-4">
              <RotateCcw className="w-4.5 h-4.5 text-indigo-600" /> 30-Day
              Returns
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-indigo-600" /> Secure Checkout
            </div>
          </div>
        </div>
      </div>

      {/* Review list & write review form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-16 pt-12 border-t border-slate-100 dark:border-zinc-800">
        {/* Left: Write review form */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100">
              Customer Reviews
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Share your thoughts and ratings with other shoppers.
            </p>
          </div>

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            {reviewSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900 text-xs font-bold rounded-xl">
                Review submitted successfully! (Mocked)
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-300 block mb-1">
                Your Rating
              </label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((stars) => (
                  <button
                    key={stars}
                    type="button"
                    onClick={() => setNewReviewRating(stars)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={
                        stars <= newReviewRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200 dark:text-zinc-750"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-350 block mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={newReviewName}
                onChange={(e) => setNewReviewName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl outline-none focus:border-indigo-500 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-zinc-350 block mb-1.5">
                Comments
              </label>
              <textarea
                placeholder="Write your product feedback here..."
                rows={4}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl outline-none focus:border-indigo-500 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 transition-colors text-sm"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Right: Reviews List */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {reviewsList.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
              <p className="text-sm text-slate-500">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 border border-slate-100 dark:border-zinc-850 rounded-2xl flex flex-col gap-2.5 bg-slate-50/50 dark:bg-zinc-900/20"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-850 dark:text-zinc-100">
                      {rev.userName}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">
                      {rev.date}
                    </span>
                  </div>
                  <Rating value={rev.rating} size={13} />
                  <p className="text-sm text-slate-650 dark:text-zinc-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-100 dark:border-zinc-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-zinc-100 mb-8">
            You May Also Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
