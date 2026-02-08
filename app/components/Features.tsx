import { Wind, Ruler, ShieldCheck } from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    title: "Tejidos Respirables",
    description: "Materiales de alta tecnología que mantienen tu piel seca.",
    icon: Wind,
  },
  {
    title: "Ajuste Perfecto",
    description: "Diseñados para otorgar máxima libertad de movimiento.",
    icon: Ruler,
  },
  {
    title: "Durabilidad",
    description: "Resistentes al lavado y al uso intenso.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-neutral-800 mb-16">
            Características
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <div key={feature.title}>
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-medium mb-2 text-neutral-800">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
