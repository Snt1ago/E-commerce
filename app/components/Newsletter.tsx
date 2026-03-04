"use client";

import Image from "next/image";
import { useState } from "react";
import { Send, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="py-20 bg-white container mx-auto px-4">
      <div className="bg-neutral-900 text-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">

        {/* Text Side */}
        <div className="p-8 md:p-16 md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-black mb-4 tracking-tighter">ENTRENA CON VENTAJA</h2>
          <p className="text-gray-400 mb-8 font-light text-lg">
            Suscríbete y recibe <span className="text-white font-black underline decoration-blue-600 decoration-4 underline-offset-4">15% OFF</span> en tu primera compra. Entérate de lanzamientos y ofertas exclusivas.
          </p>

          {status === "success" ? (
            <div className="bg-blue-600/10 border border-blue-600/20 p-6 rounded-2xl flex items-center gap-4 text-blue-400 animate-in fade-in zoom-in duration-300">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-white uppercase tracking-widest text-sm">¡BIENVENIDO A DUOSHORTS!</p>
                <p className="text-xs font-medium">Revisa tu correo, acabamos de enviarte tu cupón.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="flex-1 bg-neutral-800 border-none text-white placeholder-gray-500 px-6 py-4 rounded-xl focus:ring-2 focus:ring-blue-600 transition-all font-medium"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-premium bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 !rounded-xl"
              >
                {status === "submitting" ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Suscribir</span>
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
          <p className="text-[10px] text-neutral-500 mt-6 font-medium uppercase tracking-widest">
            Al suscribirte aceptas nuestros términos y condiciones.
          </p>
        </div>

        {/* Image Side */}
        <div className="relative h-64 md:h-auto md:w-1/2">
          <Image
            src="/athlete-training.jpg"
            alt="Athlete training"
            fill
            className="object-cover brightness-75 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-blue-600/10" />
        </div>

      </div>
    </section>
  );
}
