"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [couponCode, setCouponCode] = useState(null);
  const [discountRate, setDiscountRate] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.state) {
          if (parsed.state.items !== undefined) setItems(parsed.state.items || []);
          if (parsed.state.couponCode !== undefined) setCouponCode(parsed.state.couponCode);
          if (parsed.state.discountRate !== undefined) setDiscountRate(parsed.state.discountRate || 0);
        }
      }
    } catch (e) {
      console.error("Failed to load cart state from localStorage", e);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      const data = {
        state: { items, couponCode, discountRate },
        version: 0
      };
      localStorage.setItem("cart-storage", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save cart state to localStorage", e);
    }
  }, [items, couponCode, discountRate]);

  const addItem = (product, quantity, color, size) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      }

      return [
        ...prevItems,
        { product, quantity, selectedColor: color, selectedSize: size },
      ];
    });
  };

  const removeItem = (productId, color, size) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const updateQuantity = (productId, quantity, color, size) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId &&
          item.selectedColor === color &&
          item.selectedSize === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const applyCoupon = (code) => {
    const uppercaseCode = code.toUpperCase();
    if (uppercaseCode === "SAVE10") {
      setCouponCode("SAVE10");
      setDiscountRate(0.1);
      return { success: true, message: "10% discount applied successfully!" };
    } else if (uppercaseCode === "WELCOME20") {
      setCouponCode("WELCOME20");
      setDiscountRate(0.2);
      return { success: true, message: "20% discount applied successfully!" };
    } else {
      return { success: false, message: "Invalid coupon code." };
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setDiscountRate(0);
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
    setDiscountRate(0);
  };

  const getTotals = () => {
    const subtotal = parseFloat(
      items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ).toFixed(2)
    );
    const discount = parseFloat((subtotal * discountRate).toFixed(2));
    const subtotalAfterDiscount = parseFloat((subtotal - discount).toFixed(2));

    // Free shipping for orders above $150 (after discount)
    const shipping = subtotalAfterDiscount > 150 || subtotalAfterDiscount === 0 ? 0 : 10;

    // 8% tax rate applied to items price after discount
    const tax = parseFloat((subtotalAfterDiscount * 0.08).toFixed(2));
    const total = parseFloat((subtotalAfterDiscount + shipping + tax).toFixed(2));

    return {
      subtotal,
      discount,
      shipping,
      tax,
      total,
    };
  };

  const value = {
    items,
    couponCode,
    discountRate,
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
    getTotals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartStore(selector) {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartStore must be used within a CartProvider");
  }
  return selector ? selector(context) : context;
}
