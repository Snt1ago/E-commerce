"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import slugify from "slugify";

// Helper to check if user is admin
async function requireAdmin() {
    const session = await auth();
    // Adjusted check to be safer with types, assuming role exists on user adapter
    if (!session?.user || (session.user as any).role !== "admin") {
        throw new Error("Unauthorized: Admin access required");
    }
    return session;
}

// Get all products (admin view) with filters
export async function getAllProductsAdmin(
    query?: string,
    category?: string,
    sport?: string
) {
    await requireAdmin();

    const where: any = {};

    if (query) {
        where.OR = [
            { name: { contains: query } },
            { brand: { contains: query } },
            { sport: { contains: query } },
        ];
    }

    if (category && category !== "all") {
        where.category = category;
    }

    if (sport && sport !== "all") {
        where.sport = sport;
    }

    const products = await prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
    });

    // Parse JSON fields for frontend usage if needed, OR return raw and let component handle it.
    // Since this is a server action returning to a component, returning plain JS objects is better.
    return products.map(p => ({
        ...p,
        images: JSON.parse(p.images),
        sizes: JSON.parse(p.sizes),
        colors: JSON.parse(p.colors)
    }));
}

// Get product by ID
export async function getProductById(id: string) {
    await requireAdmin();
    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) return null;

    return {
        ...product,
        images: JSON.parse(product.images),
        sizes: JSON.parse(product.sizes),
        colors: JSON.parse(product.colors)
    };
}

// Create product
export async function createProduct(formData: FormData) {
    await requireAdmin();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const gender = formData.get("gender") as string;
    const price = parseFloat(formData.get("price") as string);
    // Expecting images to be a JSON string of URLs
    const images = formData.get("images") as string;
    const sizes = formData.get("sizes") as string; // JSON string
    const colors = formData.get("colors") as string; // JSON string
    const brand = formData.get("brand") as string;
    const sport = formData.get("sport") as string;
    const rating = parseFloat(formData.get("rating") as string) || 0;

    try {
        let baseSlug = slug || slugify(name, { lower: true, strict: true });
        let uniqueSlug = baseSlug;
        let counter = 1;

        while (true) {
            const existing = await prisma.product.findUnique({ where: { slug: uniqueSlug } });
            if (!existing) break;
            uniqueSlug = `${baseSlug}-${counter}`;
            counter++;
        }

        await prisma.product.create({
            data: {
                name,
                slug: uniqueSlug,
                category,
                gender,
                price,
                images,
                sizes,
                colors,
                brand,
                sport,
                rating,
            },
        });

        revalidatePath("/admin/products");
        revalidatePath("/products");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        console.error("Create Product Error:", error);
        if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
            return { error: "Ya existe un producto con esta URL (Slug). Por favor, intenta con otra (ej. agregando un número al final)." };
        }
        return { error: error.message || "Failed to create product" };
    }
}

// Update product
export async function updateProduct(id: string, formData: FormData) {
    await requireAdmin();

    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const gender = formData.get("gender") as string;
    const price = parseFloat(formData.get("price") as string);
    const images = formData.get("images") as string;
    const sizes = formData.get("sizes") as string;
    const colors = formData.get("colors") as string;
    const brand = formData.get("brand") as string;
    const sport = formData.get("sport") as string;
    const rating = parseFloat(formData.get("rating") as string) || 0;

    try {
        await prisma.product.update({
            where: { id },
            data: {
                name,
                slug,
                category,
                gender,
                price,
                images,
                sizes,
                colors,
                brand,
                sport,
                rating,
            },
        });

        revalidatePath("/admin/products");
        revalidatePath("/products");
        revalidatePath("/");
        revalidatePath(`/producto/${slug}`); // Adjust path if needed

        return { success: true };
    } catch (error: any) {
        return { error: error.message || "Failed to update product" };
    }
}

// Delete product
export async function deleteProduct(id: string) {
    await requireAdmin();

    try {
        await prisma.product.delete({
            where: { id },
        });

        revalidatePath("/admin/products");
        revalidatePath("/products");
        revalidatePath("/");

        return { success: true };
    } catch (error: any) {
        return { error: error.message || "Failed to delete product" };
    }
}
