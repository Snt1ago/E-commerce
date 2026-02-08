import Link from "next/link";
import Image from "next/image";

// Placeholder data matching the visual style
const favorites = [
  { id: 1, name: "Short Deportivo Pro", slug: "short-deportivo-pro", price: "$ 3.500", image: "/Short-Deportivo-Pro.jpg", category: "Running" },
  { id: 2, name: "Short Casual de Verano", slug: "short-casual-de-verano", price: "$ 2.800", image: "/Short-Casual-Verano.png", category: "Casual" },
  { id: 3, name: "MGR Ciclismo Pro", slug: "mgr-ciclismo-pro", price: "$ 2.290", image: "/MGR-Ciclismo-Pro.png", category: "Ciclismo" },
  { id: 4, name: "Enas Yoga Comfort", slug: "enas-yoga-comfort", price: "$ 1.190", image: "/Enas-Yoga-Comfort.png", category: "Yoga" },
  { id: 5, name: "MGR Elite Futbol", slug: "mgr-elite-futbol", price: "$ 1.290", image: "/MGR-Elite-Futbol.png", category: "Fútbol" },
  { id: 6, name: "Timeout Runner", slug: "timeout-runner", price: "$ 1.390", image: "/mujer-Timeout-Runner.png", category: "Running" },
  { id: 7, name: "Enas Basket Pro", slug: "enas-basket-pro", price: "$ 1.890", image: "/Enas-Basket-Pro.jpg", category: "Básquet" },
  { id: 8, name: "Timeout Swim Shorts", slug: "timeout-swim-shorts", price: "$ 1.490", image: "/Timeout-Swim-Shorts.jpg", category: "Natación" },
];

export default function FavoritesGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gray-500 uppercase text-xs font-black tracking-widest mb-2 block">Tendencias</span>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">FAVORITOS</h2>
          <p className="text-gray-500 mt-2 text-sm italic">Lo más elegido por nuestros atletas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favorites.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-2xl mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500 border border-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Product Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Quick Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
                  <Link
                    href={`/producto/${product.slug}`}
                    className="btn-premium w-full bg-white text-black hover:bg-neutral-100 !rounded-xl"
                  >
                    VER PRODUCTO
                  </Link>
                </div>
              </div>
              <div className="text-center px-2">
                <p className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">{product.category}</p>
                <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                <p className="font-black text-gray-900 text-lg">{product.price}</p>
                <Link href={`/producto/${product.slug}`} className="inline-block mt-3 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b-2 border-transparent hover:border-black hover:text-black transition-all">
                  Ver detalle
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/products" className="btn-premium">
            Ver todo el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
