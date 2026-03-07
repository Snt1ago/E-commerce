"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { deleteUser } from "@/actions/user-actions";

type User = {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: Date;
};

export default function UsersTable({ users }: { users: User[] }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const confirmDelete = (id: string) => {
        setDeleteId(id);
    };

    const executeDelete = async () => {
        if (!deleteId) return;
        await deleteUser(deleteId);
        setDeleteId(null);
        router.refresh();
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-black mb-2">Usuarios</h1>
                    <p className="text-gray-600">Gestiona los usuarios y administradores del sistema</p>
                </div>
                <Link
                    href="/admin/users/new"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm transition-colors uppercase tracking-wider text-sm w-full md:w-auto justify-center"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Usuario
                </Link>
            </div>

            <div className="bg-white p-4 border border-gray-100 rounded-sm shadow-sm mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Rol
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Fecha Registro
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-black">
                                        {user.name || "Sin nombre"}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${user.role === 'admin'
                                                ? 'bg-purple-100 text-purple-700'
                                                : 'bg-green-100 text-green-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-colors"
                                                title="Editar"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => confirmDelete(user.id)}
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                                                title="Eliminar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No se encontraron usuarios.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-sm shadow-xl p-6 animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Confirmar Eliminación</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 border border-gray-200 text-gray-700 font-semibold rounded-sm hover:bg-gray-50 text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={executeDelete}
                                className="px-4 py-2 bg-red-600 text-white font-bold rounded-sm hover:bg-red-700 text-sm"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
