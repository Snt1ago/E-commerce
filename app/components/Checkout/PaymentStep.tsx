"use client";

import { useState } from "react";
import { Loader2, ArrowRight, ShieldCheck, CreditCard, ExternalLink, TicketCheck } from "lucide-react";
import { createPayPalOrder } from "@/app/actions/paypal";
import { CartItem } from "@/app/store/cart";
import Link from "next/link";
import PaymentGrid, { PaymentMethod } from "./PaymentGrid";
import CardModal from "./CardModal";

interface PaymentStepProps {
  items: CartItem[];
  checkoutData: any;
}

export default function PaymentStep({ items, checkoutData }: PaymentStepProps) {
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOfflineCompleted, setIsOfflineCompleted] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setIsOfflineCompleted(false);
  };

  const processPayment = async (extraData: any = {}) => {
    if (!selectedMethod) return;

    try {
      setLoading(true);

      // 1. Save order to internal API
      const orderResponse = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: checkoutData.billing,
          shipping: checkoutData.shipping,
          deliveryMethod: checkoutData.deliveryMethod,
          payment: {
            method: selectedMethod.id,
            type: selectedMethod.type,
            extra: extraData
          },
          total
        })
      });

      // 2. Handle based on method type
      // All online methods (card, bank, mercadopago) go through PayPal as requested
      if (selectedMethod.type === 'offline') {
        // Show ticket
        setIsOfflineCompleted(true);
      } else {
        // Online flow via PayPal
        const { url } = await createPayPalOrder(items);
        if (url) window.location.href = url;
      }

    } catch (error: any) {
      console.error(error);
      alert("Error al procesar el pago. Por favor, intenta de nuevo.");
    } finally {
      if (selectedMethod?.type !== 'offline') {
        setLoading(false);
      }
    }
  };

  const handleCheckoutClick = () => {
    if (!selectedMethod) {
      alert("Por favor, selecciona una forma de pago.");
      return;
    }

    if (selectedMethod.type === 'card') {
      setIsModalOpen(true);
    } else {
      processPayment();
    }
  };

  if (isOfflineCompleted && selectedMethod) {
    const orderNumber = Math.floor(20000000 + Math.random() * 9000000);
    const firstName = checkoutData?.billing?.firstName || "Cliente";
    const dni = checkoutData?.billing?.document || "00000000";

    // Calculate deadline (today + 5 days)
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 5);
    const formattedDeadline = deadlineDate.toLocaleDateString('es-UY', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const todayFormatted = new Date().toLocaleDateString('es-UY', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <div className="animate-in fade-in zoom-in-95 duration-700 bg-white">
        {/* Success Alert */}
        <div className="bg-[#fbbd08] text-white px-6 py-4 rounded-t-xl flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="flex-1">
            <p className="font-black uppercase tracking-tight text-sm">Proceso finalizado correctamente.</p>
            <p className="text-[10px] opacity-90 uppercase tracking-widest font-bold">Para confirmar el pedido tienes que realizar el pago.</p>
          </div>
        </div>

        {/* Order Header */}
        <div className="bg-[#a0a0a0] text-white py-3 px-6 text-center font-black uppercase tracking-[0.2em] text-sm">
          PEDIDO #{orderNumber}
        </div>

        {/* Main Info */}
        <div className="p-8 space-y-8 text-neutral-600">
          <div className="space-y-4">
            <p className="text-sm font-medium leading-relaxed">
              {firstName}, has finalizado correctamente el proceso de compra, una vez confirmado el pago te enviaremos el pedido.
            </p>
            <p className="text-sm font-medium leading-relaxed">
              Puedes realizar el pago en cualquier local de <span className="font-black text-neutral-900">{selectedMethod.name}</span> del país <span className="font-black text-neutral-900">hasta el {formattedDeadline} inclusive</span>. Debes indicarle al cajero que vas a realizar un pago para <span className="font-black text-neutral-900">Mercadopago</span> con la cédula <span className="font-black text-neutral-900">{dni}</span>.
            </p>
            <button className="text-[10px] font-black uppercase tracking-widest text-[#0066cc] underline">
              Ver el talón de pago en Mercadopago.
            </button>
          </div>

          <div className="border-t border-neutral-100 pt-8 space-y-6">
            <h3 className="font-black text-sm uppercase tracking-widest text-neutral-900">Estado</h3>
            <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-x-8 gap-y-3 text-sm">
              <span className="font-bold text-neutral-400 uppercase text-[10px] tracking-widest">Pedido:</span>
              <span className="font-medium">Pedido sin confirmar, pago pendiente</span>

              <span className="font-bold text-neutral-400 uppercase text-[10px] tracking-widest">Pago:</span>
              <span className="font-medium">Pago pendiente en {selectedMethod.name}, tienes plazo hasta el {formattedDeadline} inclusive.</span>

              <span className="font-bold text-neutral-400 uppercase text-[10px] tracking-widest">Finalizada:</span>
              <span className="font-medium">{todayFormatted}hs.</span>
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-8 space-y-6">
            <div className="flex justify-between font-black text-xs uppercase tracking-widest text-neutral-900 pb-4 border-b border-neutral-50">
              <span>Artículos</span>
              <div className="flex gap-16">
                <span>Cantidad</span>
                <span>Total</span>
              </div>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 items-center">
                  <div className="w-16 h-16 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black uppercase tracking-tight text-neutral-900">{item.name}</p>
                    <p className="text-[10px] text-neutral-400 font-bold mt-1 uppercase">Art. {item.id.substring(0, 10).toUpperCase()}</p>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Talle {item.selectedSize || 'N/A'}</p>
                  </div>
                  <div className="text-xs font-bold text-neutral-900 w-12 text-center">
                    {item.quantity} uni.
                  </div>
                  <div className="text-xs font-black text-neutral-900 w-16 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-100 space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span>Costo de envío</span>
              <span>$ 0.00</span>
            </div>
            <div className="flex justify-between items-baseline pt-4">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">Importe total</span>
              <span className="text-2xl font-black text-neutral-900 tracking-tighter">
                <span className="text-sm mr-1">$</span>
                {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8 bg-neutral-50 flex flex-col sm:flex-row gap-4 justify-between border-t border-neutral-100">
          <button onClick={() => window.print()} className="px-8 py-4 bg-white border border-neutral-200 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-100 transition-all">
            Imprimir detalles
          </button>
          <Link href="/" className="px-8 py-4 bg-black text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-neutral-800 transition-all text-center">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="border-b border-neutral-100 pb-4">
        <h2 className="text-2xl font-black tracking-tight text-neutral-900">ELIGE LA FORMA DE PAGO</h2>
        <p className="text-sm text-neutral-500 mt-1 uppercase tracking-widest font-bold text-[10px]">Opciones locales e internacionales</p>
      </div>

      <PaymentGrid selectedId={selectedMethod?.id || null} onSelect={handleMethodSelect} />

      <div className="bg-neutral-900 text-white p-6 rounded-3xl space-y-4">
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-neutral-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold uppercase tracking-tight">Transacción 100% Protegida</p>
            <p className="text-[10px] text-neutral-400 mt-1 leading-relaxed font-medium uppercase tracking-widest">
              Garantizamos la seguridad de tu pago a través de protocolos de encriptación SSL y cumplimiento de normas PCI.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleCheckoutClick}
        disabled={loading || !selectedMethod}
        className="w-full bg-black text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-2xl shadow-black/20 flex items-center justify-center gap-3 disabled:opacity-30"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>PROCESANDO...</span>
          </>
        ) : (
          <>
            <span>
              {selectedMethod?.type === 'offline' ? 'GENERAR TICKET DE PAGO' : 'PAGAR Y FINALIZAR'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(cardData) => {
          setIsModalOpen(false);
          processPayment(cardData);
        }}
        method={selectedMethod}
      />
    </div>
  );
}
