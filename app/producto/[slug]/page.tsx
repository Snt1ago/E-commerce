import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import type { Metadata } from "next";
import ProductDetails from "@/app/components/ProductDetails";

type Props = {
  params: {
    slug: string;
  };
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

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
  const description = `${product.name} - Compra ${product.name} para ${product.gender} en Marca. Talles: ${product.sizes.join(", ")}. Colores: ${product.colors.join(", ")}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.images[0],
          width: 500,
          height: 500,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <main className="p-8 grid md:grid-cols-2 gap-8">
      <Image
        src={product.images[0]}
        alt={product.name}
        width={500}
        height={500}
        priority
      />

      <div>
        <ProductDetails product={product} />
      </div>
    </main>
  );
}
