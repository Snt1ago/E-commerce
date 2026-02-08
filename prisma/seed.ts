import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Import existing products from lib/products.ts
const products = [
    {
        id: "1",
        name: "Short Deportivo Pro",
        slug: "short-deportivo-pro",
        category: "shorts",
        gender: "hombre",
        price: 3500,
        images: ["/Short-Deportivo-Pro.jpg"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["Negro", "Gris"],
        brand: "Nike",
        sport: "Running",
        rating: 4.8,
    },
    {
        id: "2",
        name: "Short Casual de Verano",
        slug: "short-casual-de-verano",
        category: "shorts",
        gender: "mujer",
        price: 2800,
        images: ["/Short-Casual-Verano.png"],
        sizes: ["XS", "S", "M"],
        colors: ["Blanco", "Azul", "Rosa"],
        brand: "Adidas",
        sport: "Casual",
        rating: 4.5,
    },
    {
        id: "5",
        name: "Short Running Junior",
        slug: "short-running-junior",
        category: "shorts",
        gender: "ninos",
        price: 1800,
        images: ["/Short-Running-Junior.jpg"],
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
        images: ["/MGR-Elite-Futbol.png"],
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
        images: ["/Matgeor-Gym-Flex.png"],
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
        images: ["/Enas-Basket-Pro.jpg"],
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
        images: ["/mujer-Timeout-Runner.png"],
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
        images: ["/MGR-Ciclismo-Pro.png"],
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
        images: ["/Enas-Yoga-Comfort.png"],
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
        images: ["/Timeout-Swim-Shorts.jpg"],
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
        images: ["/hombre-Matgeor-Training-Light.png"],
        sizes: ["S", "M", "L"],
        colors: ["Gris"],
        brand: "Matgeor",
        sport: "Training",
        rating: 4.3,
    },
];

async function main() {
    console.log("Starting seed...");

    // Clear existing data safely
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    // Clear existing users to avoid conflicts (optional, but good for seed)
    await prisma.user.deleteMany();
    console.log("Cleared existing orders, products and users");

    // Create Admin User
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
        data: {
            name: "Admin User",
            email: "admin@example.com",
            password: hashedPassword,
            role: "admin",
        },
    });
    console.log(`Created admin user: admin@example.com / ${adminPassword === "admin123" ? "admin123 (Default)" : "********"}`);

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
                images: JSON.stringify(product.images),
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
