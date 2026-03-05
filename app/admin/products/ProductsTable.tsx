"use client";

import { useState, useCallback, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Pencil, Trash2, Plus, Search, Loader2 } from "lucide-react";
import { deleteProduct } from "@/actions/product-actions";
import ProductModal from "./ProductModal";

type Product = {
    id: string;
    name: string;
    slug: string;
    category: string;
    gender: string;
    price: number;
    images: string[];
    sizes: string[];
    colors: string[];
    brand: string;
    sport: string;
    rating: number;
};

export default function ProductsTable({ products }: { products: Product[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

    // Delete Confirmation State
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // Filter States (sync with URL)
    const handleSearch = useCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    }, [searchParams, pathname, router]);

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    };

    const openCreateModal = () => {
        setEditingProduct(undefined);
        setIsModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const confirmDelete = (id: string) => {
        setDeleteId(id);
    };

    const executeDelete = async () => {
        if (!deleteId) return;

        await deleteProduct(deleteId);
        setDeleteId(null);
        router.refresh();
    };

    return (
        <div>
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-black mb-2">Productos</h1>
                    <p className="text-gray-600">Gestiona todos los productos de la tienda</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm transition-colors uppercase tracking-wider text-sm w-full md:w-auto justify-center"
                >
                    <Plus className="w-5 h-5" />
                    Nuevo Producto
                </button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 border border-gray-100 rounded-sm shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, marca..."
                        className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
                        defaultValue={searchParams.get("q")?.toString()}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                <select
                    className="h-10 px-4 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
                    defaultValue={searchParams.get("sport")?.toString() || "all"}
                    onChange={(e) => handleFilterChange("sport", e.target.value)}
                >
                    <option value="all">Todos los Deportes</option>
                    <option value="Running">Running</option>
                    <option value="Training">Training</option>
                    <option value="Fútbol">Fútbol</option>
                    <option value="Básquet">Básquet</option>
                    <option value="Ciclismo">Ciclismo</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Natación">Natación</option>
                </select>
                <select
                    className="h-10 px-4 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
                    defaultValue={searchParams.get("category")?.toString() || "all"}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                    <option value="all">Todas las Categorías</option>
                    <option value="shorts">Shorts</option>
                    {/* Add more categories if available */}
                </select>
            </div>

            <div className={`bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Imagen
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Marca
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Deporte
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Género
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Precio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Rating
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.length > 0 ? products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="w-16 h-16 relative rounded-sm overflow-hidden bg-gray-100">
                                            {product.images?.[0] ? (
                                                <Image
                                                    src={
                                                        product.images[0].startsWith('http') ||
                                                            product.images[0].startsWith('/') ||
                                                            product.images[0].startsWith('data:')
                                                            ? product.images[0]
                                                            : `/${product.images[0]}`
                                                    }
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-black">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {product.brand}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {product.sport}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                                        {product.gender}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-black">
                                        ${product.price}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {product.rating.toFixed(1)} ⭐
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(product)}
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-colors"
                                                title="Editar"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => confirmDelete(product.id)}
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
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        No se encontraron productos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={editingProduct}
            />

            {/* Delete Confirmation Dialog */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-sm shadow-xl p-6 animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Confirmar Eliminación</h3>
                        <p className="text-gray-600 mb-6 text-sm">
                            ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
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
