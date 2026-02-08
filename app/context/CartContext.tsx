"use client";

import { createContext, useContext, useState } from "react";
import { Short } from "@/lib/getShortsByGender";

type CartItem = Short & {
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Short) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: Short) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  return (
    <CartContext.Provider value={{ items, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart fuera del provider");
  return context;
}
