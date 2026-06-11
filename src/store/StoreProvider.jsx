"use client";
import React from "react";
import { AuthProvider } from "./useAuthStore";
import { CartProvider } from "./useCartStore";
import { WishlistProvider } from "./useWishlistStore";

export function StoreProvider({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
