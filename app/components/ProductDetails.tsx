"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import { Star, Truck, ShieldCheck, RefreshCcw } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  // Helper para formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  // Simulación de descripción
  const description =
    "Este producto está diseñado para ofrecer el máximo rendimiento y comodidad. Fabricado con materiales de alta calidad que garantizan durabilidad y transpirabilidad durante tus entrenamientos o uso diario.";

  return (
    <div className="mt-8 lg:mt-0 flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-3xl font-extrabold text-gray-900">
            {formatPrice(product.price)}
          </p>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-yellow-700">
              {product.rating}
            </span>
            <span className="text-yellow-600/60 text-sm">(124 reseñas)</span>
          </div>
        </div>
      </div>

      {/* Descripción corta destacada (Above the fold) */}
      <div className="prose prose-sm text-gray-600 mb-8 border-t border-b border-gray-100 py-6">
        <p className="text-base leading-relaxed">{description}</p>
      </div>

      {/* Selector de Tallas */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-900">Talla {selectedSize ? `- ${selectedSize}` : ''}</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
            Guía de tallas
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`group relative flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium uppercase shadow-sm transition-all active:scale-95 focus:outline-none ${selectedSize === size
                  ? "border-indigo-600 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-600"
                  : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                }`}
            >
              <span>{size}</span>
            </button>
          ))}
        </div>
        {!selectedSize && (
          <p className="text-red-500 text-sm mt-2">Por favor selecciona una talla</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <AddToCartButton product={product} selectedSize={selectedSize} disabled={!selectedSize} />
        <button className="flex-none flex items-center justify-center p-4 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 transition-all">
          <span className="sr-only">Guardar en favoritos</span>
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Feature Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-full mb-2">
            <Truck className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-gray-900">
            Envío Gratis
          </span>
          <span className="text-xs text-gray-500">En pedidos &gt; $50k</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="p-2 bg-green-50 text-green-600 rounded-full mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-gray-900">Garantía</span>
          <span className="text-xs text-gray-500">30 días de fábrica</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-full mb-2">
            <RefreshCcw className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-gray-900">
            Devoluciones
          </span>
          <span className="text-xs text-gray-500">
            Gratis primeros 7 días
          </span>
        </div>
      </div>
    </div>
  );
}
