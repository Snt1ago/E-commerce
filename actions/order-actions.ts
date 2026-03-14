
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAllOrders() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}

export async function updateOrderStatus(orderId: string, status: string) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
        revalidatePath("/admin/orders");
        return { success: true };
    } catch (error) {
        console.error("Error updating order status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

export async function getUserOrders(email: string) {
    try {
        const orders = await prisma.order.findMany({
            where: { customerEmail: email },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return orders.map((order) => ({
            ...order,
            items: order.items.map((item) => ({
                ...item,
                product: item.product
                    ? {
                        ...item.product,
                        images: JSON.parse(item.product.images),
                        sizes: JSON.parse(item.product.sizes),
                        colors: JSON.parse(item.product.colors),
                    }
                    : null,
            })),
        }));
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return [];
    }
}

