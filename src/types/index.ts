export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductVariants {
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number; // percentage
  rating: number;
  reviewCount: number;
  images: string[];
  category: string;
  variants: ProductVariants;
  stock: number;
  reviews: Review[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  paymentMethod: string;
  shippingAddress: Address;
}
