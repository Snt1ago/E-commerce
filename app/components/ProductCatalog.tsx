"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp, X, Star } from "lucide-react";
import { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  category: string;
  gender?: string;
};

type FilterState = {
  brands: string[];
  sports: string[];
  sizes: string[];
  colors: string[];
  priceRange: string[];
  rating: number | null;
};

export default function ProductCatalog({
  products: initialProducts,
  category,
  gender,
}: Props) {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    sports: [],
    sizes: [],
    colors: [],
    priceRange: [],
    rating: null,
  });

  const [sortOption, setSortOption] = useState("featured");

  // Derive available options from products (or hardcode for consistent UI as per design)
  const brands = Array.from(new Set(initialProducts.map((p) => p.brand).filter(Boolean)));
  const sports = ["Running", "Training", "Casual"]; // Fixed list from type
  const sizes = Array.from(new Set(initialProducts.flatMap((p) => p.sizes)));
  const colors = Array.from(new Set(initialProducts.flatMap((p) => p.colors)));

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
      if (filters.sports.length > 0 && !filters.sports.includes(product.sport)) return false;
      if (
        filters.sizes.length > 0 &&
        !product.sizes.some((s) => filters.sizes.includes(s))
      )
        return false;
      if (
        filters.colors.length > 0 &&
        !product.colors.some((c) => filters.colors.includes(c))
      )
        return false;
      if (filters.priceRange.length > 0) {
        const matchesPrice = filters.priceRange.some((range) => {
          if (range === "$0 - $50") return product.price >= 0 && product.price <= 50;
          if (range === "$50 - $100") return product.price > 50 && product.price <= 100;
          if (range === "$100+") return product.price > 100;
          return false;
        });
        if (!matchesPrice) return false;
      }
      if (filters.rating && product.rating < filters.rating) return false;
      return true;
    });
  }, [initialProducts, filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return 0; // featured/default
    });
  }, [filteredProducts, sortOption]);

  const toggleFilter = (key: keyof FilterState, value: string | number) => {
    setFilters((prev) => {
      if (key === "rating") {
        return { ...prev, rating: prev.rating === value ? null : (value as number) };
      }
      const list = prev[key] as string[];
      if (list.includes(value as string)) {
        return { ...prev, [key]: list.filter((item) => item !== value) };
      } else {
        return { ...prev, [key]: [...list, value as string] };
      }
    });
  };

  const clearAll = () => {
    setFilters({
      brands: [],
      sports: [],
      sizes: [],
      colors: [],
      priceRange: [],
      rating: null,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 capitalize">
        <Link href="/" className="hover:text-black">Inicio</Link> &gt;{" "}
        <Link href={`/products/${category}`} className="hover:text-black">{category}</Link>
        {gender && (
          <>
            {" "}
            &gt; <span className="text-black font-medium">{gender}</span>
          </>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold capitalize">
              {gender || category}
            </h1>
          </div>

          <button onClick={clearAll} className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black py-1">
            Limpiar todo
          </button>

          {/* Filters */}
          <FilterSection title="Marca" open>
            {brands.map(brand => (
              <Checkbox
                key={brand}
                label={brand}
                checked={filters.brands.includes(brand)}
                onChange={() => toggleFilter("brands", brand)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Deporte" open>
            {sports.map(sport => (
              <Checkbox
                key={sport}
                label={sport}
                checked={filters.sports.includes(sport)}
                onChange={() => toggleFilter("sports", sport)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Talla" open>
            {sizes.map(size => (
              <Checkbox
                key={size}
                label={size}
                checked={filters.sizes.includes(size)}
                onChange={() => toggleFilter("sizes", size)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Color" open>
            {colors.map(color => (
              <Checkbox
                key={color}
                label={color}
                checked={filters.colors.includes(color)}
                onChange={() => toggleFilter("colors", color)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Precio" open>
            {["$0 - $50", "$50 - $100", "$100+"].map(range => (
              <Checkbox
                key={range}
                label={range}
                checked={filters.priceRange.includes(range)}
                onChange={() => toggleFilter("priceRange", range)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Valoraciones" open>
            {[4, 3, 2, 1].map((r) => (
              <div key={r} className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id={`rating-${r}`}
                  checked={filters.rating === r}
                  onChange={() => toggleFilter("rating", r)}
                  className="w-4 h-4 border-gray-300 rounded focus:ring-black"
                />
                <label htmlFor={`rating-${r}`} className="flex items-center text-sm text-gray-700 cursor-pointer">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < r ? "currentColor" : "none"} className={i < r ? "" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="ml-2 text-xs">& Up</span>
                </label>
              </div>
            ))}
          </FilterSection>

        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              {/* Active Tags */}
              {[...filters.brands, ...filters.sports, ...filters.sizes, ...filters.colors].map(tag => (
                <span key={tag} className="inline-flex items-center px-3 py-1 bg-gray-100 text-xs font-medium rounded-full">
                  {tag}
                  <button onClick={() => {
                    if (filters.brands.includes(tag)) toggleFilter("brands", tag);
                    else if (filters.sports.includes(tag)) toggleFilter("sports", tag);
                    else if (filters.sizes.includes(tag)) toggleFilter("sizes", tag);
                    else if (filters.colors.includes(tag)) toggleFilter("colors", tag);
                  }} className="ml-2 hover:text-red-500"><X size={12} /></button>
                </span>
              ))}
              {filters.rating && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-xs font-medium rounded-full">
                  {filters.rating} Stars & Up
                  <button onClick={() => toggleFilter("rating", filters.rating as number)} className="ml-2 hover:text-red-500"><X size={12} /></button>
                </span>
              )}
            </div>

            <div className="flex items-center">
              <label className="text-sm text-gray-500 mr-2">Sort by</label>
              <select
                className="text-sm border-none bg-transparent font-medium focus:ring-0 cursor-pointer"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No products found matching your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Link key={product.id} href={`/producto/${product.slug}`} className="group block">
                  <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
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
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                      {product.brand}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold text-lg">${product.price}</p>
                      <div className="flex items-center text-yellow-400 text-xs">
                        <Star size={12} fill="currentColor" />
                        <span className="ml-1 text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 group"
      >
        <span className="font-semibold text-sm group-hover:text-gray-700">{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={cn(
        "w-5 h-5 border rounded flex items-center justify-center transition-colors",
        checked ? "bg-black border-black" : "border-gray-300 group-hover:border-gray-400"
      )}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <span className={cn("text-sm", checked ? "font-medium text-black" : "text-gray-600")}>{label}</span>
    </label>
  );
}
