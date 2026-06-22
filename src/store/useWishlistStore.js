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

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    // Auto-clear notification after 3 seconds
    const timer = setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 3000);
    return () => clearTimeout(timer);
  };

  const toggleWishlist = (product) => {
    if (!product) return;
    const exists = items.some((item) => item.id === product.id);
    if (exists) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== product.id));
      showNotification(`Removed "${product.name}" from your wishlist.`, "info");
    } else {
      setItems((prevItems) => [...prevItems, product]);
      showNotification(`Added "${product.name}" to your wishlist!`, "success");
    }
  };

  const isInWishlist = (productId) => {
    return items.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    showNotification("Wishlist cleared successfully.", "info");
  };

  const value = {
    items,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    notification,
    clearNotification: () => setNotification(null),
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
