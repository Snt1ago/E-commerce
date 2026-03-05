"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authenticate } from "@/actions/auth-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Mail, Lock, Loader2, ArrowRight, LogIn } from "lucide-react";

const schema = z.object({
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(1, "La contraseña es obligatoria"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        setError(null);
        setIsPending(true);

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        try {
            const result = await authenticate(undefined, formData);
            if (result) {
                setError(result);
            }
        } catch (err: any) {
            if (err.message === "NEXT_REDIRECT") throw err;
            setError("Credenciales inválidas o error de servidor");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="w-full bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
            <div className="p-8 md:p-12">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-black text-white mb-6">
                        <LogIn className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-black mb-2 tracking-tight">Bienvenido</h1>
                    <p className="text-gray-600 text-sm">Ingresa tus credenciales para continuar.</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm flex items-center gap-3 text-red-600 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-gray-600 tracking-wider" htmlFor="email">
                            Correo Electrónico
                        </label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-black">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                {...register("email")}
                                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm pl-12 pr-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                disabled={isPending}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-600 font-medium">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold uppercase text-gray-600 tracking-wider" htmlFor="password">
                                Contraseña
                            </label>
                            <Link href="#" className="text-xs text-gray-600 hover:text-black transition-colors font-medium">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-black">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                {...register("password")}
                                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm pl-12 pr-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all"
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                disabled={isPending}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-600 font-medium">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="btn-premium w-full mt-4 !rounded-xl"
                    >
                        {isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Iniciar Sesión
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">O continúa con</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <form action={async () => {
                        const { loginWithGoogle } = await import("@/actions/auth-actions");
                        await loginWithGoogle();
                    }}>
                        <button
                            type="submit"
                            className="w-full h-12 bg-white border border-gray-200 text-gray-700 font-semibold rounded-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </button>
                    </form>
                </div>

                <div className="text-center text-sm text-gray-600 mt-10">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/auth/register" className="text-black hover:underline font-semibold">
                        Regístrate ahora
                    </Link>
                </div>
            </div>
        </div>
    );
}
