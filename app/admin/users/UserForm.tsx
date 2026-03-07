"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createUser, updateUser } from "@/actions/user-actions";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type User = {
    id: string;
    name: string | null;
    email: string;
    role: string;
};

export default function UserForm({ user }: { user?: User }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        role: user?.role || "user",
    });

    const isEditMode = !!user;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isEditMode && !formData.password) {
            setError("La contraseña es obligatoria para un nuevo usuario");
            return;
        }

        startTransition(async () => {
            let res;
            if (isEditMode) {
                res = await updateUser(user!.id, formData);
            } else {
                res = await createUser(formData as any);
            }

            if (res.error) {
                setError(res.error);
            } else {
                router.push("/admin/users");
                router.refresh(); // Ensure the layout/server-components re-fetch
            }
        });
    };

    return (
        <div className="max-w-2xl bg-white border border-gray-100 rounded-sm shadow-sm p-6">
            <h1 className="text-2xl font-extrabold text-black mb-6">
                {isEditMode ? "Editar Usuario" : "Nuevo Usuario"}
            </h1>

            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium border border-red-100 rounded-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black bg-gray-50"
                        placeholder="Ej. Juan Pérez"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black bg-gray-50 disabled:opacity-50"
                        placeholder="Ej. juan@correo.com"
                        disabled={isEditMode} // Usually we don't allow changing email easily, or we do. Let's disable for safety, or keep it open.
                    />
                    {isEditMode && <p className="text-xs text-gray-500 mt-1">El email no se puede cambiar por seguridad.</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Contraseña {isEditMode && <span className="text-gray-400 font-normal">(Opcional: Dejar en blanco para no cambiar)</span>}
                    </label>
                    <input
                        type="password"
                        required={!isEditMode}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black bg-gray-50"
                        placeholder="••••••••"
                        minLength={6}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Rol del Sistema
                    </label>
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black bg-gray-50"
                    >
                        <option value="user">Usuario (Cliente)</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <div className="pt-4 flex items-center gap-4">
                    <Link
                        href="/admin/users"
                        className="px-6 py-2 border border-gray-200 text-gray-700 font-bold rounded-sm hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 px-6 py-2 bg-black hover:bg-gray-900 text-white font-bold rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isEditMode ? "Guardar Cambios" : "Crear Usuario"}
                    </button>
                </div>
            </form>
        </div>
    );
}
