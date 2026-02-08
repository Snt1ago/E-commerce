"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function registerUser(formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return { error: "Failed to create user" };
  }

  // Return success so client can redirect to login or auto-login
  return { success: "User created successfully!" };
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    let redirectPath = "/";

    if (email) {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user?.role === "admin") {
          redirectPath = "/admin/dashboard";
        }
      } catch (dbError) {
        console.error("Error fetching user role for redirect:", dbError);
      }
    }

    await signIn("credentials", { ...Object.fromEntries(formData), redirectTo: redirectPath });
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}
