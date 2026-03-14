"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { isAdminRole } from "@/lib/roles";

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().optional(),
});

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type AuthenticateResult =
  | { error: string }
  | { success: true; redirectTo: string };

export async function registerUser(formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password, role } = validatedFields.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role === "admin" ? "admin" : "user",
      },
    });

    const redirectPath = isAdminRole(user.role) ? "/admin/dashboard" : "/";

    // No realizar el signin desde el server; devolver la ruta para que el cliente
    // haga el `signIn` y establezca correctamente las cookies/sesión.
    return { success: true, redirectTo: redirectPath };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { error: "Failed to create user or login" };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
): Promise<AuthenticateResult> {
  void prevState;

  try {
    const email = ((formData.get("email") as string) || "").trim();
    const password = ((formData.get("password") as string) || "").trim();
    const validatedFields = LoginSchema.safeParse({ email, password });

    if (!validatedFields.success) {
      return { error: "Credenciales invalidas. Verifica tu email y contrasena." };
    }

    const user = await prisma.user.findUnique({ where: { email } });
    const redirectPath = isAdminRole(user?.role) ? "/admin/dashboard" : "/dashboard";

    // No realizar el signin desde el server aquí; devolver la ruta de redirección
    // y permitir que el cliente haga el signIn para garantizar que la sesión
    // y las cookies se establezcan correctamente antes de navegar.
    return { success: true, redirectTo: redirectPath };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales invalidas. Verifica tu email y contrasena." };
        default:
          return { error: "Ocurrio un error. Intentalo de nuevo." };
      }
    }

    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}
