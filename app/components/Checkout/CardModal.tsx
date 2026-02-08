"use client";

import { X, Lock, CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { PaymentMethod } from "./PaymentGrid";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  method: PaymentMethod | null;
}

export default function CardModal({ isOpen, onClose, onConfirm, method }: CardModalProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  if (!isOpen) return null;

  const cardNumber = watch("cardNumber", "");
  
  // Basic card type detection logic
  const getCardType = (number: string) => {
    if (number.startsWith("4")) return "VISA";
    if (number.startsWith("5")) return "Mastercard";
    if (number.startsWith("3")) return "American Express";
    return method?.name.toUpperCase() || "TARJETA";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        {/* Header */}
        <div className="bg-neutral-900 px-8 py-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-widest uppercase">Pago con {method?.name}</h3>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-tight flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Transacción Segura
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit(onConfirm)} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Número de Tarjeta</label>
            <div className="relative">
              <input
                {...register("cardNumber", { required: true, pattern: /^\d{16}$/ })}
                className="w-full px-5 py-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium tracking-widest"
                placeholder="0000 0000 0000 0000"
                maxLength={16}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-[10px] text-neutral-300 tracking-widest">
                {getCardType(cardNumber)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Vencimiento</label>
              <input
                {...register("expiry", { required: true, pattern: /^\d{2}\/\d{2}$/ })}
                className="w-full px-5 py-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium"
                placeholder="MM/AA"
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">CVC / CVV</label>
              <input
                {...register("cvc", { required: true, pattern: /^\d{3,4}$/ })}
                className="w-full px-5 py-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Nombre en la tarjeta</label>
            <input
              {...register("cardName", { required: true })}
              className="w-full px-5 py-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium uppercase"
              placeholder="JUAN PEREZ"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-2xl shadow-black/20 mt-4"
          >
            Confirmar y Pagar
          </button>
        </form>
        
        <div className="px-8 pb-8 flex items-center justify-center gap-4 border-t border-neutral-50 pt-6 opacity-30">
          <img src="https://static-00.iconduck.com/assets.00/visa-icon-2048x628-66666666.png" className="h-2" alt="visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="master" />
          <span className="text-[8px] font-black uppercase tracking-widest">PCI Compliance Level 1</span>
        </div>
      </div>
    </div>
  );
}
