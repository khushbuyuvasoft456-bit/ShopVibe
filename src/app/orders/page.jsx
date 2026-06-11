"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, Package, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Breadcrumb from "@/components/Breadcrumb";

export default function OrderHistoryPage() {
  const router = useRouter();
  const { orders, isAuthenticated } = useAuthStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400";
      case "Shipped":
        return "bg-sky-50 text-sky-750 dark:bg-sky-955/20 dark:text-sky-400";
      case "Processing":
        return "bg-amber-50 text-amber-700 dark:bg-amber-955/20 dark:text-amber-400";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 dark:bg-rose-955/20 dark:text-rose-455";
      default:
        return "bg-slate-50 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-955/20 text-rose-500 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-10 h-10 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
          Access Denied
        </h2>
        <p className="text-slate-505">
          Please sign in to view your orders dashboard.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-6 px-5 py-2.5 bg-indigo-650 text-white font-bold rounded-xl"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="pb-20">
        <Breadcrumb items={[{ label: "Order History" }]} />
        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl p-8 max-w-lg mx-auto mt-6 shadow-sm">
          <Package className="w-16 h-16 text-slate-350 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-slate-905 dark:text-zinc-50 tracking-tight">
            No Orders Placed Yet
          </h2>
          <p className="text-sm text-slate-505 dark:text-zinc-450 mt-2">
            You haven't checked out any purchases yet. Your completed orders
            will appear here for you to track and manage.
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
      <Breadcrumb items={[{ label: "Order History" }]} />

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 tracking-tight mt-2">
        My Purchases
      </h1>

      <div className="flex flex-col gap-6 mt-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-slate-100 dark:border-zinc-850 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Header section (Ref ID, Date, Totals) */}
            <div className="bg-slate-50/50 dark:bg-zinc-900/40 p-4 sm:p-5 border-b border-slate-100 dark:border-zinc-850 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <div>
                  <span className="text-slate-450 dark:text-zinc-500 block text-xs">
                    ORDER PLACED
                  </span>
                  <span className="text-slate-800 dark:text-zinc-200 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-slate-400" /> {order.date}
                  </span>
                </div>
                <div>
                  <span className="text-slate-450 dark:text-zinc-500 block text-xs">
                    ORDER REFERENCE
                  </span>
                  <span className="text-slate-800 dark:text-zinc-200">
                    {order.id}
                  </span>
                </div>
                <div>
                  <span className="text-slate-455 dark:text-zinc-500 block text-xs">
                    TOTAL PAID
                  </span>
                  <span className="text-slate-950 dark:text-white font-extrabold">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${getStatusBadgeClass(order.status)}`}
              >
                {order.status}
              </span>
            </div>

            {/* List of items inside order */}
            <div className="p-4 sm:p-6 divide-y divide-slate-50 dark:divide-zinc-850">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    {/* Cover thumbnail */}
                    <div className="relative w-14 h-14 bg-slate-50 dark:bg-zinc-850 border border-slate-105 dark:border-zinc-800 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-zinc-150 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-slate-450 dark:text-zinc-500 font-semibold mt-0.5">
                        Qty: {item.quantity}{" "}
                        {item.selectedSize
                          ? `| Size: ${item.selectedSize}`
                          : ""}{" "}
                        {item.selectedColor
                          ? `| Color: ${item.selectedColor}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  <span className="font-extrabold text-sm text-slate-900 dark:text-zinc-100">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom bar showing Address Info */}
            <div className="bg-slate-50/20 dark:bg-zinc-900/10 px-4 sm:px-6 py-3 border-t border-slate-50 dark:border-zinc-850 text-xs font-medium text-slate-500 dark:text-zinc-450 flex flex-wrap justify-between items-center gap-2">
              <span className="truncate">
                Shipped to:{" "}
                <strong className="text-slate-700 dark:text-zinc-300">
                  {order.shippingAddress.fullName}
                </strong>{" "}
                - {order.shippingAddress.street}, {order.shippingAddress.city}
              </span>
              <span className="flex items-center gap-1 text-indigo-650 hover:underline cursor-pointer">
                Pay via {order.paymentMethod.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
