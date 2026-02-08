const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Import existing products from lib/products.ts
const products = [
  {
    id: "1",
    name: "Short Deportivo Pro",
    slug: "short-deportivo-pro",
    category: "shorts",
    gender: "hombre",
    price: 30,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44c6b?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L"],
    colors: ["Negro"],
    brand: "Nike",
    sport: "Running",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Short Casual de Verano",
    slug: "short-casual-de-verano",
    category: "shorts",
    gender: "mujer",
    price: 25,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600",
    sizes: ["XS", "S", "M"],
    colors: ["Blanco", "Azul"],
    brand: "Adidas",
    sport: "Casual",
    rating: 4.0,
  },
  {
    id: "5",
    name: "Short Running Junior",
    slug: "short-running-junior",
    category: "shorts",
    gender: "ninos",
    price: 18,
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=600",
    sizes: ["6", "8", "10", "12"],
    colors: ["Rojo", "Negro"],
    brand: "Puma",
    sport: "Running",
    rating: 4.7,
  },
  {
    id: "101",
    name: "MGR Elite Futbol",
    slug: "mgr-elite-futbol",
    category: "shorts",
    gender: "hombre",
    price: 1290,
    image: "https://images.unsplash.com/photo-1517963879466-e825c1515983?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Azul"],
    brand: "MGR Sport",
    sport: "Fútbol",
    rating: 4.8,
  },
  {
    id: "102",
    name: "Matgeor Gym Flex",
    slug: "matgeor-gym-flex",
    category: "shorts",
    gender: "mujer",
    price: 1590,
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=600",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Rosa", "Gris"],
    brand: "Matgeor",
    sport: "Training",
    rating: 4.6,
  },
  {
    id: "103",
    name: "Enas Basket Pro",
    slug: "enas-basket-pro",
    category: "shorts",
    gender: "hombre",
    price: 1890,
    image: "https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=600",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Rojo", "Blanco"],
    brand: "Enas",
    sport: "Básquet",
    rating: 4.9,
  },
  {
    id: "104",
    name: "Timeout Runner",
    slug: "timeout-runner",
    category: "shorts",
    gender: "mujer",
    price: 1390,
    image: "https://images.unsplash.com/photo-1552674605-469523170d9e?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L"],
    colors: ["Negro", "Verde"],
    brand: "Timeout",
    sport: "Running",
    rating: 4.5,
  },
  {
    id: "105",
    name: "MGR Ciclismo Pro",
    slug: "mgr-ciclismo-pro",
    category: "shorts",
    gender: "hombre",
    price: 2290,
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L"],
    colors: ["Negro/Rojo"],
    brand: "MGR Sport",
    sport: "Ciclismo",
    rating: 4.7,
  },
  {
    id: "106",
    name: "Enas Yoga Comfort",
    slug: "enas-yoga-comfort",
    category: "shorts",
    gender: "mujer",
    price: 1190,
    image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L"],
    colors: ["Lavanda"],
    brand: "Enas",
    sport: "Yoga",
    rating: 4.8,
  },
  {
    id: "107",
    name: "Timeout Swim Shorts",
    slug: "timeout-swim-shorts",
    category: "shorts",
    gender: "hombre",
    price: 1490,
    image: "https://images.unsplash.com/photo-1560263018-88e995G4b679?auto=format&fit=crop&q=80&w=600",
    sizes: ["M", "L", "XL"],
    colors: ["Azul Marino"],
    brand: "Timeout",
    sport: "Natación",
    rating: 4.4,
  },
  {
    id: "108",
    name: "Matgeor Training Light",
    slug: "matgeor-training-light",
    category: "shorts",
    gender: "hombre",
    price: 990,
    image: "https://images.unsplash.com/photo-1518617691760-99863439067b?auto=format&fit=crop&q=80&w=600",
    sizes: ["S", "M", "L"],
    colors: ["Gris"],
    brand: "Matgeor",
    sport: "Training",
    rating: 4.3,
  },
];

async function main() {
  console.log("Starting seed...");

  // Clear existing products
  await prisma.product.deleteMany();
  console.log("Cleared existing products");

  // Seed products
  for (const product of products) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        gender: product.gender,
        price: product.price,
        image: product.image,
        sizes: JSON.stringify(product.sizes),
        colors: JSON.stringify(product.colors),
        brand: product.brand,
        sport: product.sport,
        rating: product.rating,
      },
    });
    console.log(`Created product: ${product.name}`);
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
