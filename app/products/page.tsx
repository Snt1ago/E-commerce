import Link from "next/link";
import Image from "next/image";
import { getFilteredProducts } from "@/lib/products";

// Helper to format currency
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams as required in Next.js 15+ (context says Next 16)
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const brand = typeof params.brand === "string" ? params.brand : undefined;
  const sport = typeof params.sport === "string" ? params.sport : undefined;

  const products = await getFilteredProducts(q, brand, sport);

  // Determine Title
  let title = "Catálogo Completo";
  if (q) title = `Resultados para "${q}"`;
  else if (brand) title = `Productos ${brand}`;
  else if (sport) title = `Shorts de ${sport}`;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black">Inicio</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-black">Productos</Link>
            {(brand || sport || q) && (
              <>
                <span>/</span>
                <span className="font-semibold text-gray-900">{title}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-2">{products.length} productos encontrados</p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/producto/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge for Sport/Brand */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.brand && (
                      <span className="bg-black/80 text-white text-[10px] px-2 py-1 font-bold uppercase tracking-wider">
                        {product.brand}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{product.sport} • {product.gender}</p>
                  <h3 className="font-medium text-gray-900 group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                  <p className="font-bold text-gray-900">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500 mb-6">Intenta con otros términos de búsqueda o filtros.</p>
            <Link href="/products" className="px-6 py-2 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors">
              Ver todo el catálogo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
