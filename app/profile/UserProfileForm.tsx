"use client";

import { useState, useTransition } from "react";
import { updateProfile, deleteAccount } from "@/actions/user-actions";
import { Loader2, AlertTriangle } from "lucide-react";
import { signOut } from "next-auth/react";

type User = {
    id: string;
    name: string | null;
    email: string;
};

export default function UserProfileForm({ user }: { user: User }) {
    const [isPending, startTransition] = useTransition();
    const [isDeleting, startDeleteTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");

    const [formData, setFormData] = useState({
        name: user.name || "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password && formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        startTransition(async () => {
            const res = await updateProfile(user.id, {
                name: formData.name,
                password: formData.password || undefined,
            });

            if (res.error) {
                setError(res.error);
            } else {
                setSuccess("Perfil actualizado correctamente");
                setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
            }
        });
    };

    const handleDeleteAccount = () => {
        if (deleteConfirmText !== "ELIMINAR") return;

        startDeleteTransition(async () => {
            const res = await deleteAccount(user.id);
            if (res.success) {
                await signOut({ callbackUrl: "/" });
            } else {
                setError(res.error || "No se pudo eliminar la cuenta");
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm font-medium border border-red-100 rounded-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="p-3 bg-green-50 text-green-700 text-sm font-medium border border-green-100 rounded-sm">
                        {success}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full px-4 py-2 border border-gray-200 rounded-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-1">El correo electrónico no se puede cambiar.</p>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
                    />
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Cambiar Contraseña</h3>
                    <p className="text-sm text-gray-500 mb-4">Deja estos campos en blanco si no deseas cambiar tu contraseña.</p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
                                minLength={6}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">
                                Confirmar Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
                                minLength={6}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full md:w-auto px-8 py-3 bg-black hover:bg-gray-900 text-white font-bold rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        Guardar Cambios
                    </button>
                </div>
            </form>

            {/* Danger Zone: Delete Account */}
            <div className="mt-10 pt-8 border-t-2 border-red-200">
                <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h3 className="text-lg font-bold text-red-700">Zona de Peligro</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                    Una vez que elimines tu cuenta, todos tus datos serán borrados permanentemente. Esta acción no se puede deshacer.
                </p>

                {!showDeleteConfirm ? (
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-6 py-2 border-2 border-red-300 text-red-600 font-bold rounded-sm hover:bg-red-50 transition-colors text-sm"
                    >
                        Eliminar Mi Cuenta
                    </button>
                ) : (
                    <div className="bg-red-50 border border-red-200 rounded-sm p-4 space-y-3">
                        <p className="text-sm font-medium text-red-700">
                            Escribe <span className="font-black">ELIMINAR</span> para confirmar:
                        </p>
                        <input
                            type="text"
                            value={deleteConfirmText}
                            onChange={(e) => setDeleteConfirmText(e.target.value)}
                            placeholder="ELIMINAR"
                            className="w-full px-4 py-2 border border-red-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-red-500 bg-white text-sm"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteConfirm(false);
                                    setDeleteConfirmText("");
                                }}
                                className="px-4 py-2 border border-gray-200 text-gray-700 font-semibold rounded-sm hover:bg-gray-50 text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleteConfirmText !== "ELIMINAR" || isDeleting}
                                className="px-4 py-2 bg-red-600 text-white font-bold rounded-sm hover:bg-red-700 text-sm disabled:opacity-50 flex items-center gap-2"
                            >
                                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                                Eliminar Cuenta Permanentemente
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
