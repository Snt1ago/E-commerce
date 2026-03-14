import { auth } from "@/auth";
import { isAdminRole } from "@/lib/roles";
import { redirect } from "next/navigation";

export async function requireAdmin() {
    const session = await auth();
    if (!session?.user || !isAdminRole((session.user as any).role)) {
        redirect("/");
    }
    return session;
}

export async function isAdmin() {
    const session = await auth();
    return session?.user && isAdminRole((session.user as any).role);
}


