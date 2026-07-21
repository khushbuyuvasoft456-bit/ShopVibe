"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "@/services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage and verify session token on mount
  useEffect(() => {
    const initAuth = async () => {
      let savedUser = null;
      let savedToken = null;
      let savedIsAuthenticated = false;
      let savedOrders = [];

      try {
        const stored = localStorage.getItem("auth-storage");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.state) {
            savedUser = parsed.state.user || null;
            savedToken = parsed.state.token || null;
            savedIsAuthenticated = parsed.state.isAuthenticated || false;
            savedOrders = parsed.state.orders || [];
          }
        }

        if (savedToken) {
          try {
            const data = await AuthService.getProfile();
            if (data.success && data.user) {
              setUser(data.user);
              setToken(savedToken);
              setIsAuthenticated(true);
              setOrders(savedOrders);
            } else {
              setUser(null);
              setToken(null);
              setIsAuthenticated(false);
              setOrders([]);
            }
          } catch (err) {
            console.error("Token verification failed:", err);
            if (err.message.includes("401") || err.message.toLowerCase().includes("unauthorized") || err.message.toLowerCase().includes("token")) {
              setUser(null);
              setToken(null);
              setIsAuthenticated(false);
              setOrders([]);
            } else {
              setUser(savedUser);
              setToken(savedToken);
              setIsAuthenticated(savedIsAuthenticated);
              setOrders(savedOrders);
            }
          }
        } else {
          setUser(null);
          setToken(null);
          setIsAuthenticated(false);
          setOrders(savedOrders);
        }
      } catch (e) {
        console.error("Failed to load auth state from localStorage", e);
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      const data = {
        state: { user, token, isAuthenticated, orders },
        version: 0
      };
      localStorage.setItem("auth-storage", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save auth state to localStorage", e);
    }
  }, [user, token, isAuthenticated, orders, isInitialized]);

  const login = async (email, password) => {
    try {
      const data = await AuthService.login(email, password);
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        setIsAuthenticated(true);
        return { success: true, message: data.message || "Logged in successfully!" };
      }
      return { success: false, message: data.message || "Invalid credentials." };
    } catch (e) {
      return { success: false, message: e.message || "Invalid credentials." };
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await AuthService.register(name, email, password);
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        setIsAuthenticated(true);
        return { success: true, message: data.message || "Registration successful!" };
      }
      return { success: false, message: data.message || "Registration failed." };
    } catch (e) {
      return { success: false, message: e.message || "Registration failed." };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const data = await AuthService.forgotPassword(email);
      if (data.success) {
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || "Password reset failed." };
    } catch (e) {
      return { success: false, message: e.message || "Password reset failed." };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (profile) => {
    try {
      const data = await AuthService.updateProfile(profile);
      if (data.success) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (e) {
      return { success: false, message: e.message };
    }
  };

  const updateAddress = async (type, address) => {
    try {
      const data = await AuthService.updateAddress(type, address);
      if (data.success) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (e) {
      return { success: false, message: e.message };
    }
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
    isInitialized,
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
