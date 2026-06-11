import axios from "axios";
import { DUMMY_PRODUCTS } from "@/constants/dummyData";

// Create a real Axios instance that can be easily pointed to a production server
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      try {
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
          const { state } = JSON.parse(authStorage);
          if (state?.token) {
            config.headers.Authorization = `Bearer ${state.token}`;
          }
        }
      } catch (e) {
        console.error("Error retrieving token from local storage:", e);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    console.error("API Error Response:", message);
    return Promise.reject(new Error(message));
  },
);

// Reusable mock API methods simulating standard network latency (500ms)
export const ProductService = {
  getProducts: async (category, search, sort) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filtered = [...DUMMY_PRODUCTS];

    if (category && category !== "All") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }

    if (sort) {
      if (sort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sort === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (sort === "discount") {
        filtered.sort((a, b) => b.discount - a.discount);
      }
    }

    return filtered;
  },

  getProductById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const product = DUMMY_PRODUCTS.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  },

  getRelatedProducts: async (category, currentProductId) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return DUMMY_PRODUCTS.filter(
      (p) => p.category === category && p.id !== currentProductId,
    ).slice(0, 4);
  },
};
