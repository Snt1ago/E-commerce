import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CATEGORIES,
  GENDERS,
  getProductsByCategory,
  getProductsByCategoryAndGender,
  Product
} from "../../../lib/products";
import ProductCatalog from "../../../app/components/ProductCatalog";

export const dynamicParams = false;

type Props = {
  params: {
    category: string[];
  };
};

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generateStaticParams() {
  const params: { category: string[] }[] = [];

  // Single-segment category pages (e.g., /products/remeras)
  for (const cat of CATEGORIES) {
    params.push({ category: [cat] });
  }

  // Category + gender pages (e.g., /products/remeras/hombre)
  for (const cat of CATEGORIES) {
    for (const gender of GENDERS) {
      params.push({ category: [cat, gender] });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string[] }>;
}): Promise<Metadata> {
  const { category: categorySegments } = await params;
  const title = categorySegments.map(capitalize).join(" ") + " | Marca";
  const description = `Compra ${categorySegments.join(
    " "
  )} en Marca. Envíos a todo el país.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string[] }>;
}) {
  const { category: categorySegments } = await params;

  const mainCategory = categorySegments[0];
  const gender = categorySegments[1];

  if (!CATEGORIES.includes(mainCategory)) {
    notFound();
  }

  if (gender && !GENDERS.includes(gender)) {
    notFound();
  }

  let products: Product[] = [];

  if (gender) {
    products = await getProductsByCategoryAndGender(mainCategory, gender);
  } else {
    products = await getProductsByCategory(mainCategory);
  }

  return (
    <ProductCatalog
      products={products}
      category={mainCategory}
      gender={gender ? capitalize(gender) : undefined}
    />
  );
}
