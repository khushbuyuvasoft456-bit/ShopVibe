import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile, Order, Address } from "@/types";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  orders: Order[];
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateAddress: (type: "shipping" | "billing", address: Address) => void;
  addOrder: (orderItems: any[], totals: any, paymentMethod: string, address: Address) => Order;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      orders: [],

      login: async (email, password) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (email && password.length >= 6) {
          const mockUser: UserProfile = {
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

          set({
            user: mockUser,
            token: "mock-jwt-token-xyz-12345",
            isAuthenticated: true,
          });

          return { success: true, message: "Logged in successfully!" };
        }

        return { success: false, message: "Invalid email or password (min 6 characters)." };
      },

      register: async (name, email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (name && email && password.length >= 6) {
          const mockUser: UserProfile = {
            name,
            email,
            phone: "",
          };

          set({
            user: mockUser,
            token: "mock-jwt-token-xyz-12345",
            isAuthenticated: true,
          });

          return { success: true, message: "Registration successful!" };
        }

        return { success: false, message: "Invalid inputs. Password must be at least 6 characters." };
      },

      forgotPassword: async (email) => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        if (email.includes("@")) {
          return { success: true, message: "Password reset link sent to your email!" };
        }
        return { success: false, message: "Invalid email address." };
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateProfile: (profile) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: {
              ...state.user,
              ...profile,
            },
          };
        });
      },

      updateAddress: (type, address) => {
        set((state) => {
          if (!state.user) return state;
          const addressKey = type === "shipping" ? "shippingAddress" : "billingAddress";
          return {
            user: {
              ...state.user,
              [addressKey]: address,
            },
          };
        });
      },

      addOrder: (orderItems, totals, paymentMethod, address) => {
        const newOrder: Order = {
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

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
