"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  ArrowLeft,
  Truck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import Breadcrumb from "@/components/Breadcrumb";
import Input from "@/components/Input";

const checkoutSchema = z.object({
  shippingAddress: z.object({
    fullName: z.string().min(1, { message: "Full Name is required." }),
    phone: z.string().min(1, { message: "Phone Number is required." }),
    street: z.string().min(1, { message: "Street Address is required." }),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "State / Region is required." }),
    zipCode: z.string().min(1, { message: "ZIP / Postal Code is required." }),
    country: z.string().default("United States"),
  }),
  billingAddress: z.object({
    fullName: z.string().optional(),
    phone: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().default("United States"),
  }),
  sameAsBilling: z.boolean().default(true),
  paymentMethod: z.string().default("card"),
}).superRefine((val, ctx) => {
  if (!val.sameAsBilling) {
    const billing = val.billingAddress;
    if (!billing.fullName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Full Name is required.",
        path: ["billingAddress", "fullName"],
      });
    }
    if (!billing.phone?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Phone Number is required.",
        path: ["billingAddress", "phone"],
      });
    }
    if (!billing.street?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Street Address is required.",
        path: ["billingAddress", "street"],
      });
    }
    if (!billing.city?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "City is required.",
        path: ["billingAddress", "city"],
      });
    }
    if (!billing.state?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "State / Region is required.",
        path: ["billingAddress", "state"],
      });
    }
    if (!billing.zipCode?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ZIP / Postal Code is required.",
        path: ["billingAddress", "zipCode"],
      });
    }
  }
});

export default function CheckoutPage() {
  const { items, getTotals, clearCart } = useCartStore();
  const { user, isAuthenticated, addOrder } = useAuthStore();

  const totals = getTotals();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: {
      shippingAddress: {
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
      },
      billingAddress: {
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
      },
      sameAsBilling: true,
      paymentMethod: "card",
    }
  });

  const sameAsBilling = watch("sameAsBilling");
  const paymentMethod = watch("paymentMethod");

  // Pre-fill address if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      reset({
        shippingAddress: {
          fullName: user.shippingAddress?.fullName || "",
          phone: user.shippingAddress?.phone || "",
          street: user.shippingAddress?.street || "",
          city: user.shippingAddress?.city || "",
          state: user.shippingAddress?.state || "",
          zipCode: user.shippingAddress?.zipCode || "",
          country: user.shippingAddress?.country || "United States",
        },
        billingAddress: {
          fullName: user.billingAddress?.fullName || "",
          phone: user.billingAddress?.phone || "",
          street: user.billingAddress?.street || "",
          city: user.billingAddress?.city || "",
          state: user.billingAddress?.state || "",
          zipCode: user.billingAddress?.zipCode || "",
          country: user.billingAddress?.country || "United States",
        },
        sameAsBilling: watch("sameAsBilling") ?? true,
        paymentMethod: watch("paymentMethod") ?? "card",
      });
    }
  }, [isAuthenticated, user, reset]);

  const onPlaceOrder = async (data) => {
    if (items.length === 0) return;

    setIsSubmitting(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add to auth store orders list
    const orderResult = addOrder(items, totals, data.paymentMethod, data.shippingAddress);
    setPlacedOrder(orderResult);
    setIsSubmitting(false);
    clearCart(); // Clear cart state
  };

  // 1. Success confirmation state
  if (placedOrder) {
    return (
      <div className="pb-20 max-w-2xl mx-auto text-center py-12 mt-6">
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 dark:text-emerald-450 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 animate-scale-in" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight">
              Order Confirmed!
            </h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
          </div>

          {/* Reference ID Block */}
          <div className="bg-slate-55/70 dark:bg-zinc-850/30 border border-slate-100 dark:border-zinc-850 p-4 rounded-xl text-left text-sm font-semibold space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-450">Order Reference:</span>
              <span className="text-slate-900 dark:text-zinc-150 font-bold">
                {placedOrder.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-455">Order Date:</span>
              <span className="text-slate-900 dark:text-zinc-150">
                {placedOrder.date}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-455">Shipping Method:</span>
              <span className="text-slate-900 dark:text-zinc-150">
                Standard Delivery (3-5 Days)
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-100 dark:border-zinc-850 pt-2 mt-2 font-bold text-slate-900 dark:text-white">
              <span>Total Paid:</span>
              <span>${placedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/orders"
              className="flex-1 py-3 px-6 rounded-xl border border-slate-205 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
            >
              View Order History
            </Link>
            <Link
              href="/products"
              className="flex-1 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-750 text-white font-bold transition-all shadow-md shadow-indigo-600/10"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Empty cart layout
  if (items.length === 0) {
    return (
      <div className="pb-20 max-w-md mx-auto text-center py-20">
        <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
          No items to checkout
        </h2>
        <p className="text-slate-500 mt-2">
          Add some products to your cart before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block px-5 py-2.5 bg-indigo-650 text-white font-bold rounded-xl"
        >
          View Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <Breadcrumb
        items={[
          { label: "Shopping Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight mt-2">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit(onPlaceOrder)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6"
      >
        {/* Left Side: Address Details & Payment Methods (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Shipping Address Container */}
          <div className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-zinc-50 text-lg flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-650" /> Shipping Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="e.g. Jane Doe"
                error={errors.shippingAddress?.fullName?.message}
                success={touchedFields.shippingAddress?.fullName && !errors.shippingAddress?.fullName}
                required
                {...register("shippingAddress.fullName")}
              />

              <Input
                label="Phone Number"
                placeholder="e.g. +1 (555) 019-2834"
                error={errors.shippingAddress?.phone?.message}
                success={touchedFields.shippingAddress?.phone && !errors.shippingAddress?.phone}
                required
                {...register("shippingAddress.phone")}
              />
            </div>
            <Input
              label="Street Address"
              placeholder="e.g. 123 Market Street, Apt 4B"
              error={errors.shippingAddress?.street?.message}
              success={touchedFields.shippingAddress?.street && !errors.shippingAddress?.street}
              required
              {...register("shippingAddress.street")}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Input
                label="City"
                placeholder="San Francisco"
                error={errors.shippingAddress?.city?.message}
                success={touchedFields.shippingAddress?.city && !errors.shippingAddress?.city}
                required
                {...register("shippingAddress.city")}
              />

              <Input
                label="State / Region"
                placeholder="CA"
                error={errors.shippingAddress?.state?.message}
                success={touchedFields.shippingAddress?.state && !errors.shippingAddress?.state}
                required
                {...register("shippingAddress.state")}
              />

              <Input
                label="ZIP / Postal Code"
                placeholder="94103"
                error={errors.shippingAddress?.zipCode?.message}
                success={touchedFields.shippingAddress?.zipCode && !errors.shippingAddress?.zipCode}
                required
                {...register("shippingAddress.zipCode")}
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700 dark:text-zinc-355">
                <input
                  type="checkbox"
                  checked={sameAsBilling}
                  onChange={(e) => setValue("sameAsBilling", e.target.checked, { shouldValidate: true })}
                  className="w-4.5 h-4.5 rounded border-slate-305 text-indigo-600 focus:ring-indigo-500"
                />
                Billing Address same as Shipping Address
              </label>
            </div>
          </div>

          {/* Billing Address Container (Visible only if sameAsBilling is false) */}
          {!sameAsBilling && (
            <div className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4 animate-in fade-in duration-200">
              <h3 className="font-bold text-slate-900 dark:text-zinc-50 text-lg">
                Billing Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="e.g. Jane Doe"
                  error={errors.billingAddress?.fullName?.message}
                  success={touchedFields.billingAddress?.fullName && !errors.billingAddress?.fullName}
                  required
                  {...register("billingAddress.fullName")}
                />

                <Input
                  label="Phone Number"
                  placeholder="e.g. +1 (555) 019-2834"
                  error={errors.billingAddress?.phone?.message}
                  success={touchedFields.billingAddress?.phone && !errors.billingAddress?.phone}
                  required
                  {...register("billingAddress.phone")}
                />
              </div>
              <Input
                label="Street Address"
                placeholder="e.g. 123 Market Street, Apt 4B"
                error={errors.billingAddress?.street?.message}
                success={touchedFields.billingAddress?.street && !errors.billingAddress?.street}
                required
                {...register("billingAddress.street")}
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Input
                  label="City"
                  placeholder="San Francisco"
                  error={errors.billingAddress?.city?.message}
                  success={touchedFields.billingAddress?.city && !errors.billingAddress?.city}
                  required
                  {...register("billingAddress.city")}
                />

                <Input
                  label="State / Region"
                  placeholder="CA"
                  error={errors.billingAddress?.state?.message}
                  success={touchedFields.billingAddress?.state && !errors.billingAddress?.state}
                  required
                  {...register("billingAddress.state")}
                />

                <Input
                  label="ZIP / Postal Code"
                  placeholder="94103"
                  error={errors.billingAddress?.zipCode?.message}
                  success={touchedFields.billingAddress?.zipCode && !errors.billingAddress?.zipCode}
                  required
                  {...register("billingAddress.zipCode")}
                />
              </div>
            </div>
          )}

          {/* Payment Method Container */}
          <div className="border border-slate-100 dark:border-zinc-855 bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-zinc-50 text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-650" /> Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "card", label: "Credit Card" },
                { id: "paypal", label: "PayPal" },
                { id: "cod", label: "Cash on Delivery" },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? "border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20"
                      : "border-slate-205 hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => setValue("paymentMethod", method.id, { shouldValidate: true })}
                    className="sr-only"
                  />

                  <span className="font-bold text-sm text-slate-800 dark:text-zinc-200">
                    {method.label}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold mt-1">
                    {method.id === "card"
                      ? "Visa, Mastercard, Amex"
                      : method.id === "paypal"
                        ? "Pay via PayPal checkout"
                        : "Pay with cash on arrival"}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary sticky Sidebar (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="border border-slate-100 dark:border-zinc-855 bg-white dark:bg-zinc-900 rounded-2xl p-6 space-y-6 lg:sticky lg:top-24 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-zinc-50 text-lg">
              Order Summary
            </h3>

            {/* Items previews list */}
            <div className="max-h-[220px] overflow-y-auto pr-1 space-y-4 border-b border-slate-100 dark:border-zinc-850 pb-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-center text-sm">
                  <div className="relative w-12 h-12 bg-slate-50 dark:bg-zinc-850 border border-slate-100 dark:border-zinc-800 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 dark:text-zinc-200 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-slate-450 dark:text-zinc-500 font-semibold">
                      Qty: {item.quantity}{" "}
                      {item.selectedSize ? `| Size: ${item.selectedSize}` : ""}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-zinc-50">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3.5 text-sm font-semibold text-slate-650 dark:text-zinc-400 border-b border-slate-100 dark:border-zinc-850 pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-900 dark:text-zinc-150">
                  ${totals.subtotal.toFixed(2)}
                </span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-slate-900 dark:text-zinc-150 font-bold">
                  {totals.shipping === 0
                    ? "Free"
                    : `$${totals.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="text-slate-900 dark:text-zinc-150 font-semibold">
                  ${totals.tax.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Final Total */}
            <div className="flex justify-between items-baseline font-bold text-slate-950 dark:text-white">
              <span className="text-base">Order Total</span>
              <span className="text-2xl font-extrabold">
                ${totals.total.toFixed(2)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 transform active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" /> Place Order
                </>
              )}
            </button>

            <Link
              href="/cart"
              className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-650 text-center w-full transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
