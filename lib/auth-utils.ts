import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "admin") {
        redirect("/");
    }
    return session;
}

export async function isAdmin() {
    const session = await auth();
    return session?.user && (session.user as any).role === "admin";
}
