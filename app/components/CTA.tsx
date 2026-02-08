export default function CTA() {
  return (
    <section className="bg-orange-100 py-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-light text-orange-800 mb-4">
            ¿Necesitas un sitio web?
          </h2>
          <p className="text-orange-700 mb-8">
            Creamos páginas web profesionales y optimizadas para tu negocio.
          </p>
          <a
            href="mailto:icasuriagadeveloper@gmail.com?subject=Solicitud%20de%20presupuesto%20web"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl font-medium"
          >
            Solicitar Presupuesto
          </a>
        </div>
      </div>
    </section>
  );
}
