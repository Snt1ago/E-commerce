import prisma from "@/lib/prisma";
import { Product as PrismaProduct } from "@prisma/client";

export type Product = Omit<PrismaProduct, "images" | "sizes" | "colors"> & {
  images: string[];
  sizes: string[];
  colors: string[];
};

// Helper to parse JSON fields
function mapPrismaProduct(p: PrismaProduct): Product {
  return {
    ...p,
    images: JSON.parse(p.images),
    sizes: JSON.parse(p.sizes),
    colors: JSON.parse(p.colors),
  };
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { category },
  });
  return products.map(mapPrismaProduct);
}

export async function getProductsByCategoryAndGender(
  category: string,
  gender: string
): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { category, gender },
  });
  return products.map(mapPrismaProduct);
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany();
  return products.map(mapPrismaProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
  });
  if (!product) return null;
  return mapPrismaProduct(product);
}

// Helper for Search and Filters
export async function getFilteredProducts(
  query?: string,
  brand?: string,
  sport?: string
): Promise<Product[]> {
  const where: any = {};

  if (query) {
    where.OR = [
      { name: { contains: query } }, // Case insensitive in SQLite by default for ASCII, but explicit mode usually needed for Postgres. For SQLite default is fine.
      { brand: { contains: query } },
      { sport: { contains: query } },
    ];
  }

  if (brand) {
    where.brand = brand;
  }

  if (sport) {
    // Handling special cases from static data, simplified for DB
    if (sport === 'Running/Trail') {
      where.sport = 'Running';
    } else if (sport === 'Fitness/Gym/Entrenamiento') {
      where.sport = 'Training';
    } else {
      where.sport = sport;
    }
  }

  const products = await prisma.product.findMany({ where });
  return products.map(mapPrismaProduct);
}

export const CATEGORIES = ["shorts"];
export const GENDERS = ["hombre", "mujer", "ninos"];

