import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Home, ShoppingBag } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-32 text-center max-w-lg mx-auto px-4">
      <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-955/20 text-rose-500 flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 animate-bounce" />
      </div>

      <h1 className="text-6xl font-black text-slate-900 dark:text-zinc-50 tracking-tight leading-none">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-zinc-200 mt-3 tracking-tight">
        Page Not Found
      </h2>
      <p className="text-sm text-slate-500 mt-2 max-w-sm">
        Oops! The page you are looking for doesn't exist or has been relocated. Let's get you back to browsing.
      </p>

      {/* Navigation options */}
      <div className="flex flex-col sm:flex-row gap-4 w-full mt-10">
        <Link
          href="/"
          className="flex-1 py-3 px-6 rounded-xl border border-slate-205 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4.5 h-4.5" /> Return Home
        </Link>
        <Link
          href="/products"
          className="flex-1 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-755 text-white font-bold transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4.5 h-4.5" /> Browse Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
