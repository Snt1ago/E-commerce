import Image from "next/image";
import { ShieldCheck, CreditCard, Truck } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gray-500 uppercase text-xs font-semibold tracking-widest mb-2 block">Certeza</span>
          <h2 className="text-3xl font-bold text-gray-900">Lo que respalda tu compra</h2>
          <p className="text-gray-500 mt-2 text-sm italic">Más que una tienda, una experiencia segura</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Security */}
          <div className="relative group overflow-hidden rounded-sm h-64 flex items-end p-6">
            <Image
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=600"
              alt="Security"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-50"
            />
            <div className="relative z-10 text-white">
              <ShieldCheck className="w-8 h-8 mb-3 text-blue-400" />
              <h3 className="text-xl font-bold mb-1">Tu seguridad es lo primero</h3>
              <p className="text-gray-300 text-sm">
                Protegemos tus datos con los estándares más altos de encriptación.
              </p>
            </div>
          </div>

          {/* Card 2: Payment */}
          <div className="relative group overflow-hidden rounded-sm h-64 flex items-end p-6">
            <Image
              src="https://images.unsplash.com/photo-1628527304948-06157ee3c8a6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Payment"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-50"
            />
            <div className="relative z-10 text-white">
              <CreditCard className="w-8 h-8 mb-3 text-green-400" />
              <h3 className="text-xl font-bold mb-1">Pago ágil y con tu banco</h3>
              <p className="text-gray-300 text-sm">
                Aceptamos todas las tarjetas y métodos de pago locales.
              </p>
            </div>
          </div>

          {/* Card 3: Tracking */}
          <div className="relative group overflow-hidden rounded-sm h-64 flex items-end p-6">
            <Image
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
              alt="Tracking"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-50"
            />
            <div className="relative z-10 text-white">
              <Truck className="w-8 h-8 mb-3 text-orange-400" />
              <h3 className="text-xl font-bold mb-1">Seguimiento en tiempo real</h3>
              <p className="text-gray-300 text-sm">
                Sabrás exactamente dónde está tu pedido hasta que llegue a tus manos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
