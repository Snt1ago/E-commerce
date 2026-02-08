"use client";

import { useForm } from "react-hook-form";
import { Truck, Store, MapPin } from "lucide-react";

interface ShippingFormProps {
  onNext: (data: any) => void;
  defaultValues?: any;
  deliveryMethod: "shipping" | "pickup";
  setDeliveryMethod: (method: "shipping" | "pickup") => void;
}

export default function ShippingForm({ onNext, defaultValues, deliveryMethod, setDeliveryMethod }: ShippingFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="border-b border-neutral-100 pb-4 mb-8">
        <h2 className="text-2xl font-black tracking-tight text-neutral-900">MÉTODO DE ENTREGA</h2>
        <p className="text-sm text-neutral-500 mt-1 uppercase tracking-widest font-bold text-[10px]">¿Cómo quieres recibir tu pedido?</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <button
          onClick={() => setDeliveryMethod("shipping")}
          className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all ${
            deliveryMethod === "shipping"
              ? "border-black bg-neutral-50"
              : "border-neutral-100 bg-white hover:border-neutral-200"
          }`}
        >
          <Truck className={`w-6 h-6 ${deliveryMethod === "shipping" ? "text-black" : "text-neutral-400"}`} />
          <span className={`text-xs font-black uppercase tracking-widest ${deliveryMethod === "shipping" ? "text-black" : "text-neutral-400"}`}>
            Envío a Domicilio
          </span>
        </button>
        <button
          onClick={() => setDeliveryMethod("pickup")}
          className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all ${
            deliveryMethod === "pickup"
              ? "border-black bg-neutral-50"
              : "border-neutral-100 bg-white hover:border-neutral-200"
          }`}
        >
          <Store className={`w-6 h-6 ${deliveryMethod === "pickup" ? "text-black" : "text-neutral-400"}`} />
          <span className={`text-xs font-black uppercase tracking-widest ${deliveryMethod === "pickup" ? "text-black" : "text-neutral-400"}`}>
            Retiro en Local
          </span>
        </button>
      </div>

      {deliveryMethod === "shipping" ? (
        <form onSubmit={handleSubmit(onNext)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Dirección completa</label>
            <input
              {...register("address", { required: true })}
              className={`w-full px-5 py-4 rounded-2xl border ${errors.address ? 'border-red-500' : 'border-neutral-100'} bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium`}
              placeholder="Calle y número de puerta"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Ciudad / Localidad</label>
              <input
                {...register("city", { required: true })}
                className={`w-full px-5 py-4 rounded-2xl border ${errors.city ? 'border-red-500' : 'border-neutral-100'} bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium`}
                placeholder="Ej: Montevideo"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Barrio (Opcional)</label>
              <input
                {...register("neighborhood")}
                className="w-full px-5 py-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium"
                placeholder="Ej: Pocitos"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Departamento</label>
              <select
                {...register("state", { required: true })}
                className="w-full px-5 py-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all bg-white font-medium"
              >
                <option value="">Seleccionar...</option>
                <option value="montevideo">Montevideo</option>
                <option value="canelones">Canelones</option>
                <option value="maldonado">Maldonado</option>
                {/* Add more as needed */}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Apartamento / Piso (Opcional)</label>
              <input
                {...register("apt")}
                className="w-full px-5 py-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium"
                placeholder="Torre A, Apto 101"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-2xl shadow-black/20"
          >
            Continuar al pago
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onNext)} className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-neutral-600 font-medium bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
              Selecciona el local donde deseas retirar tu pedido. Te enviaremos un email cuando esté listo para retirar.
            </p>
            
            <div className="space-y-3">
              {[
                { id: "store-1", name: "Tienda - Montevideo Shopping", address: "Av. Luis Alberto de Herrera 1290" },
                { id: "store-2", name: "Tienda - Punta Carretas", address: "José Ellauri 350" },
                { id: "store-3", name: "Tienda - House Punta del Este", address: "Calle 20 y 27" },
              ].map((store) => (
                <label key={store.id} className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-100 hover:border-black transition-all cursor-pointer group">
                  <input
                    type="radio"
                    {...register("selectedStore", { required: true })}
                    value={store.id}
                    className="w-5 h-5 accent-black"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-black uppercase tracking-tight group-hover:text-black transition-colors">{store.name}</p>
                    <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
                      <MapPin className="w-3 h-3" />
                      {store.address}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-2xl shadow-black/20 mt-6"
          >
            Continuar al pago
          </button>
        </form>
      )}
    </div>
  );
}
