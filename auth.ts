import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log("Authorize called with:", { email: credentials?.email }); // Don't log password

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log("Schema validation passed");

          const user = await getUser(email);
          if (!user) {
            console.log("User not found in DB");
            return null;
          }
          console.log("User found:", user.email, "Rule:", user.role);

          if (!user.password) {
            console.log("User has no password (likely OAuth)");
            return null;
          }

          console.log("Comparing passwords...");
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("Password match result:", passwordsMatch);

          if (passwordsMatch) return user;
        } else {
          console.log("Schema validation failed:", parsedCredentials.error);
        }

        console.log("Invalid credentials (end of flow)");
        return null;
      },
    }),
  ],
});
