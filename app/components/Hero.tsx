import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Athlete background"
          fill
          className="object-cover brightness-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      <div className="container mx-auto px-4 z-10 relative text-white text-center flex flex-col items-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 leading-[0.9] uppercase">
            shorts deportivos <br className="hidden md:block" /> para cada movimiento
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300 mb-12 font-medium text-lg md:text-xl leading-relaxed">
            Tecnología avanzada y diseño ergonómico para potenciar tu rendimiento en cada paso, salto o estiramiento.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/products"
              className="btn-premium bg-white text-black hover:bg-gray-100"
            >
              Comprar Ahora
            </Link>
            <Link
              href="/dashboard"
              className="btn-outline-premium"
            >
              Mis Pedidos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
