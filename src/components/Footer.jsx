"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send } from "lucide-react";
import { CATEGORIES } from "@/constants/dummyData";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-350 border-t border-slate-900 transition-colors">
      {/* Top Banner: Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Subscribe to our newsletters
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Get the latest updates, exclusive discounts, and product drops
              straight to your inbox. No spam, we promise.
            </p>
          </div>
          <div>
            <form
              onSubmit={handleSubscribe}
              className="relative flex items-center w-full"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm transition-all"
                required
              />

              <button
                type="submit"
                disabled={subscribed}
                className={`absolute right-1.5 p-2 rounded-lg transition-all ${
                  subscribed
                    ? "bg-emerald-500 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
                aria-label="Subscribe"
              >
                {subscribed ? "Subbed!" : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Intro */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-lg">
                S
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                ShopVibe
              </span>
            </Link>
            <p className="text-xs leading-5 text-slate-400">
              A premium, fully responsive, modern shopping experience featuring
              electronics, fashion, beauty, sports, and home collection. Built
              for visual excellence.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="#"
                className="hover:text-indigo-400 transition-colors"
                aria-label="X"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="hover:text-indigo-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Shop Collections
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {CATEGORIES.slice(1).map((cat) => (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className="hover:text-white transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Customer Care
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Track Your Order
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Returns & Exchanges
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Shipping & Delivery
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4 text-sm">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Corporate Office
            </h4>
            <p className="text-xs leading-5 text-slate-400">
              100 Market Street, Suite 400
              <br />
              San Francisco, CA 94103
              <br />
              United States
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Email: support@shopvibe.com
              <br />
              Phone: +1 (555) 019-2834
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-slate-950 border-t border-slate-900/60 py-6 text-center text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} ShopVibe Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
