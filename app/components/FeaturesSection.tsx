import Image from "next/image";
import { Dumbbell, Feather, ScanFace } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="lg:w-1/2 w-full">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800"
                alt="High performance fabric"
                fill
                className="object-cover hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:w-1/2 w-full space-y-12">
            <div className="flex gap-6 items-start group">
              <div className="p-4 bg-white rounded-full shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Dumbbell className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Deporte específico</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Running, gimnasio, crossfit, yoga o simplemente para el día a día. Tenemos un short diseñado para cada intensidad y tipo de movimiento.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="p-4 bg-white rounded-full shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Feather className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Telas tecnológicas</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Transpirabilidad, secado rápido y flexibilidad en 4 direcciones. Materiales que se adaptan a tu cuerpo y te mantienen fresco.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="p-4 bg-white rounded-full shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <ScanFace className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Diseños únicos</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  Colores vibrantes, cortes modernos y detalles funcionales como bolsillos ocultos y reflectivos para tu seguridad.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button className="btn-dark-outline">
                Ver Tecnología
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
