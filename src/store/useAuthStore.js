"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("auth-storage");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.state) {
          if (parsed.state.user !== undefined) setUser(parsed.state.user);
          if (parsed.state.token !== undefined) setToken(parsed.state.token);
          if (parsed.state.isAuthenticated !== undefined) setIsAuthenticated(parsed.state.isAuthenticated);
          if (parsed.state.orders !== undefined) setOrders(parsed.state.orders || []);
        }
      }
    } catch (e) {
      console.error("Failed to load auth state from localStorage", e);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      const data = {
        state: { user, token, isAuthenticated, orders },
        version: 0
      };
      localStorage.setItem("auth-storage", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save auth state to localStorage", e);
    }
  }, [user, token, isAuthenticated, orders]);

  const login = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email && password.length >= 6) {
      const mockUser = {
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        email,
        phone: "+1 (555) 019-2834",
        shippingAddress: {
          fullName: "Jane Doe",
          street: "123 Market Street, Apt 4B",
          city: "San Francisco",
          state: "CA",
          zipCode: "94103",
          country: "United States",
          phone: "+1 (555) 019-2834",
        },
        billingAddress: {
          fullName: "Jane Doe",
          street: "123 Market Street, Apt 4B",
          city: "San Francisco",
          state: "CA",
          zipCode: "94103",
          country: "United States",
          phone: "+1 (555) 019-2834",
        },
      };

      setUser(mockUser);
      setToken("mock-jwt-token-xyz-12345");
      setIsAuthenticated(true);

      return { success: true, message: "Logged in successfully!" };
    }

    return { success: false, message: "Invalid email or password (min 6 characters)." };
  };

  const register = async (name, email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (name && email && password.length >= 6) {
      const mockUser = {
        name,
        email,
        phone: "",
      };

      setUser(mockUser);
      setToken("mock-jwt-token-xyz-12345");
      setIsAuthenticated(true);

      return { success: true, message: "Registration successful!" };
    }

    return { success: false, message: "Invalid inputs. Password must be at least 6 characters." };
  };

  const forgotPassword = async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (email.includes("@")) {
      return { success: true, message: "Password reset link sent to your email!" };
    }
    return { success: false, message: "Invalid email address." };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (profile) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, ...profile };
    });
  };

  const updateAddress = (type, address) => {
    setUser((prev) => {
      if (!prev) return prev;
      const addressKey = type === "shipping" ? "shippingAddress" : "billingAddress";
      return {
        ...prev,
        [addressKey]: address,
      };
    });
  };

  const addOrder = (orderItems, totals, paymentMethod, address) => {
    const newOrder = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      items: orderItems,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      status: "Processing",
      date: new Date().toISOString().split("T")[0],
      paymentMethod,
      shippingAddress: address,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const value = {
    user,
    token,
    isAuthenticated,
    orders,
    login,
    register,
    forgotPassword,
    logout,
    updateProfile,
    updateAddress,
    addOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthStore(selector) {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthStore must be used within an AuthProvider");
  }
  return selector ? selector(context) : context;
}
