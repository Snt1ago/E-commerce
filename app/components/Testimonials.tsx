import Image from "next/image";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Martín R.",
    role: "Runner Amateur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    text: "Increíble la calidad de la tela. Corrí 21k y no sentí ninguna molestia. Definitivamente volveré a comprar.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sofía M.",
    role: "Instructora de Yoga",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    text: "El ajuste es perfecto, ni muy apretado ni muy suelto. Me permite moverme con total libertad en mis clases.",
    rating: 5,
  },
  {
    id: 3,
    name: "Diego F.",
    role: "CrossFitter",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    text: "Resistentes y cómodos. Soportan los entrenamientos más duros sin perder la forma. Muy recomendados.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-gray-900">Historias reales</h2>
           <p className="text-gray-500 mt-2 text-sm italic">Atletas que confían en nosotros</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-neutral-50 p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic text-sm leading-relaxed">"{review.text}"</p>
              
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                  <p className="text-gray-500 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
