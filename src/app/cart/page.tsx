"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight, X, Percent } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Breadcrumb from "@/components/Breadcrumb";

export default function CartPage() {
  const {
    items,
    couponCode,
    discountRate,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    getTotals,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  const totals = getTotals();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const result = applyCoupon(couponInput.trim());
      setCouponMessage({ success: result.success, text: result.message });
      if (result.success) {
        setCouponInput("");
      }
      setTimeout(() => setCouponMessage(null), 3000);
    }
  };

  const handleQtyChange = (productId: string, qty: number, color?: string, size?: string) => {
    updateQuantity(productId, qty, color, size);
  };

  if (items.length === 0) {
    return (
      <div className="pb-20">
        <Breadcrumb items={[{ label: "Shopping Cart" }]} />
        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto mt-6 shadow-sm">
          <ShoppingBag className="w-16 h-16 text-slate-350 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">
            Your cart is empty
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-450 mt-2">
            Looks like you haven't added anything to your cart yet. Explore our latest arrivals to find something special!
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-indigo-650 hover:bg-indigo-750 text-white font-bold rounded-xl shadow-md transition-all transform active:scale-95"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Breadcrumb items={[{ label: "Shopping Cart" }]} />

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight mt-2">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Side: Items list (8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden p-4 sm:p-6 space-y-6">
            {items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                className="flex gap-4 sm:gap-6 py-6 first:pt-0 last:pb-0 border-b last:border-none border-slate-100 dark:border-zinc-850 items-center"
              >
                {/* Thumbnail */}
                <Link
                  href={`/products/${item.product.id}`}
                  className="relative w-20 sm:w-24 aspect-square bg-slate-50 dark:bg-zinc-850 rounded-xl overflow-hidden border border-slate-100 dark:border-zinc-800 shrink-0"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="96px"
                    className="object-cover object-center"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="block font-bold text-slate-800 dark:text-zinc-100 text-sm sm:text-base hover:text-indigo-600 dark:hover:text-indigo-400 truncate"
                  >
                    {item.product.name}
                  </Link>

                  {/* Selected Variants */}
                  <div className="flex flex-wrap gap-2.5 mt-1.5 text-xs font-semibold text-slate-450 dark:text-zinc-500">
                    {item.selectedColor && (
                      <span className="bg-slate-50 dark:bg-zinc-850 px-2 py-0.5 rounded-md">
                        Color: {item.selectedColor}
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="bg-slate-50 dark:bg-zinc-850 px-2 py-0.5 rounded-md">
                        Size: {item.selectedSize}
                      </span>
                    )}
                  </div>

                  {/* Quantity & Delete wrapper */}
                  <div className="flex items-center gap-4 mt-4">
                    {/* Quantity selectors */}
                    <div className="flex items-center justify-between border border-slate-200 dark:border-zinc-800 rounded-lg px-3 py-1 bg-white dark:bg-zinc-900 w-24 text-xs font-bold">
                      <button
                        onClick={() =>
                          handleQtyChange(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="text-slate-500 hover:text-slate-850"
                      >
                        -
                      </button>
                      <span className="text-slate-850 dark:text-zinc-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQtyChange(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="text-slate-500 hover:text-slate-850"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize
                        )
                      }
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price tag */}
                <div className="text-right shrink-0">
                  <span className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-zinc-50 block">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold block mt-0.5">
                    ${item.product.price.toFixed(2)} each
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Sticky Checkout Summary (4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl p-6 space-y-6 lg:sticky lg:top-24 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-zinc-50 text-lg">
              Order Summary
            </h3>

            {/* Calculations Breakdown */}
            <div className="space-y-3.5 text-sm font-semibold text-slate-600 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-850 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-900 dark:text-zinc-150">
                  ${totals.subtotal.toFixed(2)}
                </span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span className="flex items-center gap-1">
                    Discount ({discountRate * 100}%)
                  </span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-slate-900 dark:text-zinc-150">
                  {totals.shipping === 0 ? (
                    <span className="text-emerald-600 font-bold">Free</span>
                  ) : (
                    `$${totals.shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Est. Tax (8%)</span>
                <span className="text-slate-900 dark:text-zinc-150">
                  ${totals.tax.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Net Total */}
            <div className="flex justify-between items-baseline font-bold text-slate-950 dark:text-white">
              <span className="text-base">Total</span>
              <span className="text-2xl font-extrabold">
                ${totals.total.toFixed(2)}
              </span>
            </div>

            {/* Coupon field */}
            <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-350 block">
                Promo Code
              </label>
              {couponCode ? (
                <div className="flex items-center justify-between bg-slate-50 dark:bg-zinc-850 px-3.5 py-2.5 rounded-xl border border-slate-100 dark:border-zinc-800 text-xs">
                  <span className="flex items-center gap-1.5 font-bold text-indigo-755">
                    <Percent className="w-3.5 h-3.5" /> {couponCode} APPLIED
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="p-0.5 text-slate-400 hover:text-rose-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. SAVE10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-slate-50 dark:bg-zinc-850 border border-slate-150 dark:border-zinc-800 rounded-xl outline-none focus:bg-white text-slate-900 dark:text-zinc-100"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950"
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* Coupon message */}
              {couponMessage && (
                <p
                  className={`text-xs font-semibold mt-1 ${
                    couponMessage.success
                      ? "text-emerald-650"
                      : "text-rose-500"
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
            </form>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 transform active:scale-98 transition-all mt-4"
            >
              Proceed to Checkout <ArrowRight className="w-4.5 h-4.5" />
            </Link>

            <p className="text-[11px] text-slate-450 dark:text-zinc-550 text-center leading-relaxed mt-2">
              Taxes and shipping fees calculated in real-time. Orders over $150 qualify for free shipping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
