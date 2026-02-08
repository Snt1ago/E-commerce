"use client";

import { useCartStore } from "@/app/store/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIndicator() {
  const totalItems = useCartStore((state) => state.getTotalItems());


  return (
    <Link
      href="/cart"
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      aria-label="Ver carrito"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
