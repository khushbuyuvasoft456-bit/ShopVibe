"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  ShoppingBag as OrderIcon,
  Check,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthStore } from "@/store/useAuthStore";
import { CATEGORIES } from "@/constants/dummyData";

export const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Zustand Store states
  const cartItems = useCartStore((state) => state.items);
  const { items: wishlistItems, notification, clearNotification } = useWishlistStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Component UI States
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Set mounted on client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync Search Query state with URL params
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Handle instant search on search query change (debounced)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (searchQuery === urlSearch) {
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery.trim()) {
        params.set("search", searchQuery.trim());
      } else {
        params.delete("search");
      }
      params.set("page", "1"); // reset page on search filter change

      if (pathname === "/products") {
        router.replace(`/products?${params.toString()}`);
      } else {
        router.push(`/products?${params.toString()}`);
      }
    }, 250); // 250ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchParams, pathname, router]);

  // Handle Theme Toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const activeTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(activeTheme);
    if (activeTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    if (pathname === "/products") {
      router.replace(`/products?${params.toString()}`);
    } else {
      router.push(`/products?${params.toString()}`);
    }
  };

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-bold text-xl shadow-md shadow-indigo-500/20">
              S
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-zinc-50 dark:to-zinc-300 bg-clip-text text-transparent tracking-tight sm:block hidden">
              ShopVibe
            </span>
          </Link>

          {/* Category Dropdown (Desktop) */}
          <div className="relative hidden lg:block shrink-0">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              onBlur={() =>
                setTimeout(() => setCategoryDropdownOpen(false), 200)
              }
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Categories <ChevronDown className="w-4 h-4" />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={
                      cat === "All"
                        ? "/products"
                        : `/products?category=${encodeURIComponent(cat)}`
                    }
                    className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 max-w-md mx-2 sm:mx-6 hidden md:block"
          >
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 rounded-xl outline-none focus:bg-white dark:focus:bg-zinc-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-zinc-100 transition-all duration-200"
            />

            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500 pointer-events-none" />
          </form>

          {/* Icons list */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl transition-colors"
              aria-label="Toggle Theme"
            >
              {!mounted || theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2.5 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {mounted && wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-indigo-600 rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2.5 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalCartCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-indigo-600 rounded-full animate-scale-in">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Login */}
            <div className="relative">
              {mounted && isAuthenticated ? (
                <>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    onBlur={() =>
                      setTimeout(() => setProfileDropdownOpen(false), 250)
                    }
                    className="flex items-center gap-1 p-1 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                      {user?.name.charAt(0)}
                    </div>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-zinc-800">
                        <p className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-slate-800 dark:text-zinc-200 truncate">
                          {user?.name}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <OrderIcon className="w-4 h-4" /> Order History
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all font-semibold text-sm"
                >
                  <User className="w-4 h-4" /> Sign In
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-zinc-855 bg-white dark:bg-zinc-950 p-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3">
            {/* Search Input in Mobile Drawer */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-1">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-850 rounded-xl outline-none focus:bg-white dark:focus:bg-zinc-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-zinc-100 transition-all duration-200"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500 pointer-events-none" />
            </form>

            <p className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              Categories
            </p>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={
                  cat === "All"
                    ? "/products"
                    : `/products?category=${encodeURIComponent(cat)}`
                }
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-slate-700 dark:text-zinc-350 hover:text-indigo-600 dark:hover:text-indigo-400 py-1 transition-colors"
              >
                {cat}
              </Link>
            ))}

            {(!mounted || !isAuthenticated) && (
              <div className="border-t border-slate-100 dark:border-zinc-850 pt-4 mt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-center hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {mounted && notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900/95 dark:bg-zinc-900/95 text-white border border-slate-800 dark:border-zinc-800 rounded-2xl p-4 pr-5 shadow-2xl animate-fade-in-up max-w-sm backdrop-blur-md">
          <div className={`p-2 rounded-xl ${notification.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {notification.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold tracking-tight leading-snug">
              {notification.message}
            </p>
          </div>
          <button
            onClick={clearNotification}
            className="p-1 hover:bg-white/10 dark:hover:bg-zinc-800 rounded-lg text-slate-400 hover:text-white transition-colors ml-1.5 shrink-0"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
export default Navbar;
