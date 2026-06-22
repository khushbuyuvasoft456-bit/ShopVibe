"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wishlist-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.state) {
          if (parsed.state.items !== undefined) setItems(parsed.state.items || []);
        }
      }
    } catch (e) {
      console.error("Failed to load wishlist state from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const data = {
        state: { items },
        version: 0
      };
      localStorage.setItem("wishlist-storage", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save wishlist state to localStorage", e);
    }
  }, [items, isLoaded]);

  const toggleWishlist = (product) => {
    setItems((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id);
      if (exists) {
        return prevItems.filter((item) => item.id !== product.id);
      }
      return [...prevItems, product];
    });
  };

  const isInWishlist = (productId) => {
    return items.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const value = {
    items,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlistStore(selector) {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlistStore must be used within a WishlistProvider");
  }
  return selector ? selector(context) : context;
}
