import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discountRate: number; // e.g., 0.1 for 10%
  addItem: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeItem: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
  getTotals: () => {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountRate: 0,

      addItem: (product, quantity, color, size) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === color &&
              item.selectedSize === size
          );

          if (existingItemIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          }

          return {
            items: [
              ...state.items,
              { product, quantity, selectedColor: color, selectedSize: size },
            ],
          };
        });
      },

      removeItem: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor === color &&
                item.selectedSize === size
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, color, size) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }));
      },

      applyCoupon: (code) => {
        const uppercaseCode = code.toUpperCase();
        if (uppercaseCode === "SAVE10") {
          set({ couponCode: "SAVE10", discountRate: 0.1 });
          return { success: true, message: "10% discount applied successfully!" };
        } else if (uppercaseCode === "WELCOME20") {
          set({ couponCode: "WELCOME20", discountRate: 0.2 });
          return { success: true, message: "20% discount applied successfully!" };
        } else {
          return { success: false, message: "Invalid coupon code." };
        }
      },

      removeCoupon: () => {
        set({ couponCode: null, discountRate: 0 });
      },

      clearCart: () => {
        set({ items: [], couponCode: null, discountRate: 0 });
      },

      getTotals: () => {
        const { items, discountRate } = get();
        const subtotal = items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        const discount = subtotal * discountRate;
        const subtotalAfterDiscount = subtotal - discount;

        // Free shipping for orders above $150 (after discount)
        const shipping = subtotalAfterDiscount > 150 || subtotalAfterDiscount === 0 ? 0 : 10;
        
        // 8% tax rate applied to items price after discount
        const tax = subtotalAfterDiscount * 0.08;
        const total = subtotalAfterDiscount + shipping + tax;

        return {
          subtotal,
          discount,
          shipping,
          tax,
          total,
        };
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
