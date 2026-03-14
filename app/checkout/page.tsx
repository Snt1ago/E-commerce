"use client";

import { useState } from "react";
import Stepper from "../components/Checkout/Stepper";
import BillingForm from "../components/Checkout/BillingForm";
import ShippingForm from "../components/Checkout/ShippingForm";
import PaymentStep from "../components/Checkout/PaymentStep";
import { useCartStore } from "@/app/store/cart";
import Link from "next/link";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface CheckoutFormData {
  billing: any;
  shipping: any;
  deliveryMethod: "shipping" | "pickup";
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    billing: {},
    shipping: {},
    deliveryMethod: "shipping",
  });

  const { items, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-neutral-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Tu carrito está vacío</h1>
        <p className="text-neutral-500 mb-8">Parece que aún no has agregado nada a tu carrito.</p>
        <Link href="/" className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-neutral-800 transition-all">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (section: keyof CheckoutFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
    nextStep();
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pt-16 lg:pt-0">
      <Stepper currentStep={step} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Content: Forms */}
          <div className="flex-1 max-w-2xl">
            <div className="mb-8">
              {step === 1 ? (
                <Link
                  href="/cart"
                  className="flex items-center text-sm font-bold text-neutral-500 hover:text-black transition-colors uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Volver al carrito
                </Link>
              ) : (
                <button
                  onClick={prevStep}
                  className="flex items-center text-sm font-bold text-neutral-500 hover:text-black transition-colors uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Volver
                </button>
              )}
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-neutral-200/50 border border-neutral-100">
              {step === 1 && (
                <BillingForm onNext={(data) => updateFormData("billing", data)} defaultValues={formData.billing} />
              )}
              {step === 2 && (
                <ShippingForm
                  onNext={(data) => updateFormData("shipping", data)}
                  defaultValues={formData.shipping}
                  deliveryMethod={formData.deliveryMethod}
                  setDeliveryMethod={(method) => setFormData(prev => ({ ...prev, deliveryMethod: method }))}
                />
              )}
              {step === 3 && (
                <PaymentStep items={items} checkoutData={formData} />
              )}
            </div>
          </div>

          {/* Sidebar: Order Summary */}
          <aside className="lg:w-96">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-neutral-200/50 border border-neutral-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Resumen de Compra
              </h2>

              <div className="max-h-[40vh] overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.images?.[0] || '/logo.svg'} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">{item.name}</h4>
                      <div className="text-xs text-neutral-500 mt-1">
                        <span>Talla: {item.selectedSize || 'N/A'}</span>
                        <span className="mx-2">•</span>
                        <span>Cant: {item.quantity}</span>
                      </div>
                      <p className="text-sm font-bold mt-1 text-neutral-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-neutral-100 pt-6">
                <div className="flex justify-between text-neutral-500 text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-500 text-sm">
                  <span>Envío</span>
                  <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest bg-green-50 px-2 py-0.5 rounded-full">Gratis</span>
                </div>
                <div className="flex justify-between text-lg font-black text-neutral-900 pt-3 border-t border-neutral-50 mt-3">
                  <span>TOTAL</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-neutral-50 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-tighter text-neutral-400">Pago Seguro garantizado</p>
                  <p className="text-xs font-bold text-neutral-600">PayPal & Encriptación SSL</p>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4d4d4;
        }
      `}</style>
    </div>
  );
}
