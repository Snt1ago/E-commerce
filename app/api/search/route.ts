import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json([]);
    }

    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { brand: { contains: query } },
                ],
            },
            take: 5, // Limit real-time suggestions
        });

        const formattedProducts = products.map(p => ({
            ...p,
            images: JSON.parse(p.images),
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("Predictive search API error:", error);
        return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
    }
}

