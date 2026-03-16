"use client";

import { useCartStore } from "@/app/store/cart";
import { ProductDetail as Product } from "@/lib/contentful";
import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: string;
  disabled?: boolean;
}

export default function AddToCartButton({ product, selectedSize, disabled }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (disabled) return;
    addItem(product, 1, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled}
      className={`btn-premium w-full flex items-center justify-center gap-2 !rounded-2xl ${added
        ? "bg-green-600 text-white hover:bg-green-700"
        : disabled
          ? "bg-gray-400 text-gray-200 cursor-not-allowed shadow-none hover:scale-100 active:scale-100"
          : "bg-black text-white"
        }`}
    >
      {added ? (
        <>
          <Check className="w-6 h-6" />
          <span>¡Agregado!</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-6 h-6" />
          <span>Añadir al carrito</span>
        </>
      )}
    </button>
  );
}
