"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                // Do not select password
            }
        });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
}

export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user");
    }
}

export async function createUser(data: { name: string; email: string; password?: string; role: string }) {
    try {
        let hashedPassword = null;
        if (data.password) {
            hashedPassword = await bcrypt.hash(data.password, 10);
        }

        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role,
            },
        });

        revalidatePath("/admin/users");
        return { success: true, user: { id: newUser.id, email: newUser.email } };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Failed to create user. Email may already exist." };
    }
}

export async function updateUser(id: string, data: { name?: string; email?: string; password?: string; role?: string }) {
    try {
        const updateData: any = { ...data };

        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        } else {
            delete updateData.password; // Do not update if not provided
        }

        await prisma.user.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: "Failed to update user" };
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({
            where: { id },
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}

// ── Client Profile Actions ──────────────────────────────────────────

export async function updateProfile(id: string, data: { name?: string; password?: string }) {
    try {
        const updateData: any = {};

        if (data.name) updateData.name = data.name;

        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }

        await prisma.user.update({
            where: { id },
            data: updateData,
        });

        revalidatePath("/profile");
        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "No se pudo actualizar el perfil" };
    }
}

export async function deleteAccount(id: string) {
    try {
        await prisma.user.delete({
            where: { id },
        });

        return { success: true };
    } catch (error) {
        console.error("Error deleting account:", error);
        return { success: false, error: "No se pudo eliminar la cuenta" };
    }
}

