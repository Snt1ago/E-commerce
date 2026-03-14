import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/products';

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, qty: number, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, size: string | undefined, qty: number) => void;
  incrementQuantity: (productId: string, size?: string) => void;
  decrementQuantity: (productId: string, size?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, qty, size) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id && item.selectedSize === size
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id && item.selectedSize === size
                  ? { ...item, quantity: item.quantity + qty }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: qty, selectedSize: size }],
          };
        });
      },
      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === productId && item.selectedSize === size)
          ),
        }));
      },
      updateQuantity: (productId, size, qty) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId && item.selectedSize === size
              ? { ...item, quantity: qty }
              : item
          ),
        }));
      },
      incrementQuantity: (productId, size) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId && item.selectedSize === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },
      decrementQuantity: (productId, size) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId && item.selectedSize === size
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

