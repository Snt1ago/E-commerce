"use client";

import { useForm } from "react-hook-form";

interface BillingFormProps {
  onNext: (data: any) => void;
  defaultValues?: any;
}

export default function BillingForm({ onNext, defaultValues }: BillingFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="border-b border-neutral-100 pb-4">
        <h2 className="text-2xl font-black tracking-tight text-neutral-900">DATOS DE FACTURACIÓN</h2>
        <p className="text-sm text-neutral-500 mt-1 uppercase tracking-widest font-bold text-[10px]">Identificación y contacto</p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Nombre</label>
            <input
              {...register("firstName", { required: true })}
              className={`w-full px-5 py-4 rounded-2xl border ${errors.firstName ? 'border-red-500' : 'border-neutral-100'} bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium`}
              placeholder="Ej: Juan"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Apellido</label>
            <input
              {...register("lastName", { required: true })}
              className={`w-full px-5 py-4 rounded-2xl border ${errors.lastName ? 'border-red-500' : 'border-neutral-100'} bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium`}
              placeholder="Ej: Pérez"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Email de contacto</label>
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            className={`w-full px-5 py-4 rounded-2xl border ${errors.email ? 'border-red-500' : 'border-neutral-100'} bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium`}
            placeholder="juan@ejemplo.com"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Documento (CI/CUIL/DNI)</label>
            <input
              {...register("document", { required: true })}
              className={`w-full px-5 py-4 rounded-2xl border ${errors.document ? 'border-red-500' : 'border-neutral-100'} bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium`}
              placeholder="12.345.678-9"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Teléfono</label>
            <input
              {...register("phone", { required: true })}
              className={`w-full px-5 py-4 rounded-2xl border ${errors.phone ? 'border-red-500' : 'border-neutral-100'} bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium`}
              placeholder="099 123 456"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Observaciones (Opcional)</label>
          <textarea
            {...register("notes")}
            className="w-full px-5 py-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:bg-white focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all font-medium min-h-[100px] resize-none"
            placeholder="Instrucciones especiales para tu pedido..."
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-2xl shadow-black/20"
      >
        Continuar al envío
      </button>
    </form>
  );
}
