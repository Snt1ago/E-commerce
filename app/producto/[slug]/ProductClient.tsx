"use client";

import { useCart } from "@/app/context/CartContext";
import { Short } from "@/lib/getShortsByGender";

export default function AddToCart({ product }: { product: Short }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-8 px-6 py-3 bg-black text-white"
    >
      Agregar al carrito
    </button>
  );
}
