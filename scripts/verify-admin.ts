
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function verify() {
    console.log("Verifying admin user...");
    try {
        const user = await prisma.user.findUnique({
            where: { email: "admin@example.com" },
        });

        if (!user) {
            console.error("❌ User admin@example.com NOT FOUND in database.");
            return;
        }

        console.log("✅ User found:", user.email, "Role:", user.role);
        console.log("Hashed Password in DB:", user.password);

        if (!user.password) {
            console.error("❌ User password is null.");
            return;
        }

        console.log("Comparing with 'admin123'...");
        const match = await bcrypt.compare("admin123", user.password);

        if (match) {
            console.log("✅ Password MATCHES!");
        } else {
            console.error("❌ Password does NOT match.");
        }
    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

verify();
