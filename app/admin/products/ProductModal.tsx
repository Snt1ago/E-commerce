"use client";

import { X } from "lucide-react";
import ProductForm from "./ProductForm";
import { useEffect, useRef } from "react";

type ProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    product?: any; // We can refine this type if needed, but 'any' allows flexibility with the schema changes for now avoiding lint hell
    title?: string;
};

export default function ProductModal({ isOpen, onClose, product, title }: ProductModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpen) {
            // We can use a real dialog logic or just fixed overlay. 
            // Fixed overlay is often easier to style consistently without browser quirks.
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-900">{title || (product ? "Editar Producto" : "Nuevo Producto")}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    <ProductForm
                        product={product}
                        isEdit={!!product}
                        onSuccess={onClose}
                    />
                </div>
            </div>
        </div>
    );
}
