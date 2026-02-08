"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createProduct, updateProduct } from "@/actions/product-actions";

type ProductFormProps = {
    product?: {
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
    isEdit?: boolean;
    onSuccess?: () => void; // Callback for modal close
};

export default function ProductForm({ product, isEdit = false, onSuccess }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initial State handling
    // We expect product.images to be an array of strings. 
    // If it's undefined, start with one empty string.
    const [imageUrls, setImageUrls] = useState<string[]>(product?.images && product.images.length > 0 ? product.images : [""]);

    // Parse JSON arrays for display (sizes/colors are still simple comma separated in UI for now, or could make them dynamic too)
    // Keeping sizes/colors as comma-separated string inputs for simplicity based on previous code, unless requested otherwise.
    const initialSizes = product?.sizes ? product.sizes.join(", ") : "";
    const initialColors = product?.colors ? product.colors.join(", ") : "";

    const handleAddImage = () => {
        setImageUrls([...imageUrls, ""]);
    };

    const handleRemoveImage = (index: number) => {
        const newImages = [...imageUrls];
        newImages.splice(index, 1);
        setImageUrls(newImages);
    };

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...imageUrls];
        newImages[index] = value;
        setImageUrls(newImages);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        // Handle Array Fields
        const sizesInput = formData.get("sizes") as string;
        const colorsInput = formData.get("colors") as string;

        const sizesArray = sizesInput.split(",").map(s => s.trim()).filter(Boolean);
        const colorsArray = colorsInput.split(",").map(c => c.trim()).filter(Boolean);
        const finalImages = imageUrls.filter(url => url.trim() !== "");

        if (finalImages.length === 0) {
            setError("Debes agregar al menos una imagen.");
            setLoading(false);
            return;
        }

        formData.set("sizes", JSON.stringify(sizesArray));
        formData.set("colors", JSON.stringify(colorsArray));
        formData.set("images", JSON.stringify(finalImages));
        // Also map the first image to "image" if legacy support needed, but we migrated schema so "images" is key.

        try {
            const result = isEdit && product
                ? await updateProduct(product.id, formData)
                : await createProduct(formData);

            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                if (onSuccess) {
                    onSuccess();
                } else {
                    router.push("/admin/products");
                    router.refresh();
                }
            }
        } catch (err: any) {
            setError(err.message || "Error al guardar el producto");
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header only if not in modal (implies explicit back button needed) */}
            {!onSuccess && (
                <div className="mb-6">
                    <Link
                        href="/admin/products"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a Productos
                    </Link>
                    <h1 className="text-3xl font-extrabold text-black mb-2">
                        {isEdit ? "Editar Producto" : "Nuevo Producto"}
                    </h1>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-600 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className={onSuccess ? "" : "bg-white border border-gray-100 rounded-sm shadow-sm p-8"}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="md:col-span-2">
                        <label htmlFor="name" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Nombre del Producto
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={product?.name}
                            required
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                            placeholder="Ej: Short Deportivo Pro"
                        />
                    </div>

                    {/* Slug */}
                    <div className="md:col-span-2">
                        <label htmlFor="slug" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Slug (URL)
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            defaultValue={product?.slug}
                            required
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                            placeholder="Ej: short-deportivo-pro"
                        />
                        <p className="text-xs text-gray-500 mt-1">Identificador único para la URL</p>
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Categoría
                        </label>
                        <select
                            id="category"
                            name="category"
                            defaultValue={product?.category || "shorts"}
                            required
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        >
                            <option value="shorts">Shorts</option>
                        </select>
                    </div>

                    {/* Gender */}
                    <div>
                        <label htmlFor="gender" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Género
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            defaultValue={product?.gender}
                            required
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        >
                            <option value="">Seleccionar...</option>
                            <option value="hombre">Hombre</option>
                            <option value="mujer">Mujer</option>
                            <option value="ninos">Niños</option>
                        </select>
                    </div>

                    {/* Brand */}
                    <div>
                        <label htmlFor="brand" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Marca
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            defaultValue={product?.brand}
                            required
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                            placeholder="Ej: MGR Sport"
                        />
                    </div>

                    {/* Sport */}
                    <div>
                        <label htmlFor="sport" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Deporte
                        </label>
                        <select
                            id="sport"
                            name="sport"
                            defaultValue={product?.sport}
                            required
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        >
                            <option value="">Seleccionar...</option>
                            <option value="Running">Running</option>
                            <option value="Training">Training</option>
                            <option value="Casual">Casual</option>
                            <option value="Fútbol">Fútbol</option>
                            <option value="Básquet">Básquet</option>
                            <option value="Ciclismo">Ciclismo</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Natación">Natación</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Precio
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            defaultValue={product?.price}
                            required
                            step="0.01"
                            min="0"
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                            placeholder="0.00"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label htmlFor="rating" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Rating (0-5)
                        </label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            defaultValue={product?.rating || 0}
                            required
                            step="0.1"
                            min="0"
                            max="5"
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                            placeholder="4.5"
                        />
                    </div>

                    {/* Images (Multiple) */}
                    <div className="md:col-span-2 space-y-3">
                        <label className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Imágenes del Producto
                        </label>
                        {imageUrls.map((url, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    className="flex-1 h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                    placeholder={`URL de imagen ${index + 1}`}
                                    required={index === 0} // First image required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="h-12 w-12 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                                    disabled={imageUrls.length === 1}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                            <Plus className="w-4 h-4" />
                            Agregar otra imagen
                        </button>
                    </div>

                    {/* Sizes */}
                    <div>
                        <label htmlFor="sizes" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Tallas
                        </label>
                        <input
                            type="text"
                            id="sizes"
                            name="sizes"
                            defaultValue={initialSizes}
                            required
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                            placeholder="S, M, L, XL"
                        />
                    </div>

                    {/* Colors */}
                    <div>
                        <label htmlFor="colors" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-2">
                            Colores
                        </label>
                        <input
                            type="text"
                            id="colors"
                            name="colors"
                            defaultValue={initialColors}
                            required
                            className="w-full h-12 bg-gray-50 border border-gray-200 rounded-sm px-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                            placeholder="Negro, Azul, Rojo"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex items-center justify-end gap-4">
                    {onSuccess && (
                        // If inside modal (onSuccess present), we probably want a cancel button that closes the modal?
                        // The modal usually handles closing, but we can offer a button that might do nothing if not passed.
                        // But for now let's just show Save.
                        <></>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-sm transition-colors uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>{isEdit ? "Actualizar" : "Crear Producto"}</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
