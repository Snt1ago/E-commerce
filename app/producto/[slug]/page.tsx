import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetails from "@/app/components/ProductDetails";
import BackButton from "@/app/components/BackButton";
import { getProductBySlug, getProducts, getProductBySlugPreview } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { draftMode } from 'next/headers'


function capitalize(s: string | undefined | null) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}
export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }



  const title = `${product.name} | ${capitalize(product.gender)} | Marca`;
  const description = `${product.name} - Compra ${product.name} para ${product.gender} en Marca. Talles: ${(product.sizes ?? []).join(", ")}. Colores: ${(product.colors ?? []).join(", ")}.`;
  const firstImage = product.images?.[0] ?? '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(firstImage && {
        images: [
          {
            url: firstImage,
            width: 500,
            height: 500,
            alt: product.name,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(firstImage && { images: [firstImage] }),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  const product = isEnabled
    ? await getProductBySlugPreview(slug)
    : await getProductBySlug(slug);

  if (!product) notFound();
  const p = product!;

  return (
    <main className="container mx-auto p-8 pt-24">
      <BackButton href="/" label="Volver al catálogo" />
      <div className="grid md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          {p.images?.[0] && (
            <Image
              src={p.images[0]}
              alt={p.name}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div className="flex flex-col">
          <ProductDetails product={p} />
          {p.description && (
            <div className="prose prose-gray max-w-none mt-6">
              {documentToReactComponents(p.description)}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
