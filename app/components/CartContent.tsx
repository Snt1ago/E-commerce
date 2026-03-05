"use client";

import { useCartStore } from "@/app/store/cart";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, Minus, Plus, Loader2 } from "lucide-react";
import { createPayPalOrder } from "@/app/actions/paypal";
import { useState } from "react";

export default function CartContent() {
    const { items, removeItem, incrementQuantity, decrementQuantity, getTotalPrice, clearCart } = useCartStore();
    const [loading, setLoading] = useState(false);

    const totalPrice = getTotalPrice();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(price);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
                <p className="text-gray-500 mb-8 max-w-md">
                    Parece que aún no has agregado productos. Explora nuestra colección y encuentra tu próximo equipo favorito.
                </p>
                <Link
                    href="/"
                    className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-neutral-50 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Cart Items List */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">Tu Carrito ({items.length})</h1>
                        <button
                            onClick={clearCart}
                            className="text-sm text-red-500 hover:text-red-700 font-medium"
                        >
                            Vaciar carrito
                        </button>
                    </div>

                    <div className="space-y-6">
                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.selectedSize || 'nosize'}`}
                                className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
                            >
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                                    <Image
                                        src={item.images?.[0] || '/logo.svg'}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{item.name}</h3>
                                            <span className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                        <div className="mt-1 text-sm text-gray-500 space-y-1">
                                            <p>{item.category} - {item.gender}</p>
                                            {item.selectedSize && (
                                                <p className="font-medium text-gray-700">Talla: {item.selectedSize}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                            <button
                                                onClick={() => decrementQuantity(item.id, item.selectedSize)}
                                                className="p-1 hover:bg-white rounded-md shadow-sm transition-all"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => incrementQuantity(item.id, item.selectedSize)}
                                                className="p-1 hover:bg-white rounded-md shadow-sm transition-all"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id, item.selectedSize)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-96">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Resumen de compra</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Envío</span>
                                <span className="text-green-600 font-medium">Gratis</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-[0.98] shadow-xl shadow-gray-900/10 flex items-center justify-center gap-2"
                        >
                            <span>Checkout</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <p className="mt-4 text-xs text-center text-gray-400">
                            Pagos seguros procesados por Stripe o MercadoPago.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
