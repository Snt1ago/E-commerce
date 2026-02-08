"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "¿Que es el fit?",
    answer: "El fit se refiere al ajuste de la prenda. Nuestros shorts vienen en regular, slim y loose fit para adaptarse a tu preferencia de comodidad.",
  },
  {
    question: "¿Como cuidar mis shorts?",
    answer: "Lavado a máquina con agua fría, no usar blanqueador, secar a temperatura baja. Evitar planchar sobre los logos.",
  },
  {
    question: "¿Seguridad de mi compra?",
    answer: "Utilizamos pasarelas de pago encriptadas. Tus datos están 100% protegidos y nunca almacenamos información de tarjetas.",
  },
  {
    question: "¿Tiempo de entrega?",
    answer: "Los envíos en Montevideo toman 24-48 horas hábiles. Para el interior del país, de 2 a 4 días hábiles.",
  },
  {
    question: "¿Politica de devoluciones?",
    answer: "Tienes 30 días para cambios o devoluciones. La prenda debe estar sin uso y con sus etiquetas originales.",
  },
  {
    question: "¿Talles de la ropa?",
    answer: "Consulta nuestra guía de talles en cada producto. Si tienes dudas, contáctanos y te ayudamos a elegir.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Preguntas</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border text-sm border-gray-200 rounded-sm overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-40 py-4 opacity-100" : "max-h-0 py-0 opacity-0 bg-gray-50"
                }`}
              >
                <p className="text-gray-600 leading-relaxed font-light">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
            <h3 className="text-lg font-medium mb-2">¿Más dudas?</h3>
            <button className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                Ir al centro de ayuda
            </button>
        </div>
      </div>
    </section>
  );
}
