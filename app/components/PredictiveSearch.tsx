"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/products";

export default function PredictiveSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounced search effect
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                if (res.ok) {
                    const data = await res.json();
                    setResults(data);
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsOpen(false);
            router.push(`/products?q=${encodeURIComponent(query)}`);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="hidden lg:flex flex-1 max-w-sm relative z-50">
            <form onSubmit={handleSubmit} className="w-full relative group">
                <input
                    type="text"
                    placeholder="Buscar shorts, marcas..."
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-all placeholder:text-gray-400 font-medium tracking-wide"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => query.trim() && setIsOpen(true)}
                />
                <Search className={cn(
                    "w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                    isOpen ? "text-blue-600" : "text-gray-400"
                )} />

                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        ) : (
                            <X className="w-4 h-4" />
                        )}
                    </button>
                )}
            </form>

            {/* Dropdown Results */}
            {(isOpen && query.trim() !== "") && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white/90 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">

                    {isLoading && results.length === 0 ? (
                        <div className="p-8 flex flex-col items-center justify-center text-gray-400 gap-3">
                            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                            <span className="text-sm font-medium">Buscando...</span>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="flex flex-col">
                            <div className="px-5 py-3 border-b border-gray-100/50 bg-gray-50/50">
                                <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                                    Resultados Populares
                                </span>
                            </div>

                            <ul className="max-h-[380px] overflow-y-auto custom-scrollbar p-2">
                                {results.map((product) => (
                                    <li key={product.id}>
                                        <Link
                                            href={`/producto/${product.slug}`}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="relative w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                                                {product.images?.[0] ? (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <Search className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                                                    {product.name}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-xs font-black uppercase text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-sm">
                                                        {product.brand}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right pl-3">
                                                <p className="font-black text-sm text-gray-900">${product.price}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-2 border-t border-gray-100/50 bg-gray-50/50">
                                <button
                                    onClick={handleSubmit}
                                    className="w-full py-2.5 text-center text-sm font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    Ver todos los resultados para "{query}"
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <p className="font-bold text-gray-900 text-sm">No se encontraron resultados</p>
                            <p className="text-xs text-gray-500 mt-1">Intenta buscar con otra palabra clave</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
