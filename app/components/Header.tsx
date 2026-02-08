"use client";

import Link from "next/link";
import { Search, ShoppingCart, User as UserIcon, LogOut, Package, ChevronDown, LayoutDashboard } from "lucide-react";
import { useCartStore } from "@/app/store/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img
            src="/logo.svg"
            alt="DuoShorts Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-gray-600 shrink-0">
          <div className="relative group">
            <button className="hover:text-black transition-colors flex items-center gap-1 py-4">
              MARCAS
            </button>
            <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/products?brand=MGR Sport" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">MGR Sport</Link>
              <Link href="/products?brand=Matgeor" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Matgeor</Link>
              <Link href="/products?brand=Enas" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Enas</Link>
              <Link href="/products?brand=Timeout" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Timeout</Link>
            </div>
          </div>

          <div className="relative group">
            <button className="hover:text-black transition-colors flex items-center gap-1 py-4">
              DEPORTES
            </button>
            <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/products?sport=Running" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Running/Trail</Link>
              <Link href="/products?sport=Training" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Fitness/Gym</Link>
              <Link href="/products?sport=Fútbol" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Fútbol</Link>
              <Link href="/products?sport=Básquet" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Básquet</Link>
              <Link href="/products?sport=Ciclismo" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Ciclismo</Link>
              <Link href="/products?sport=Yoga" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Yoga/Pilates</Link>
              <Link href="/products?sport=Natación" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">Natación</Link>
            </div>
          </div>

          <Link href="/products/shorts/hombre" className="hover:text-black transition-colors">
            HOMBRE
          </Link>
          <Link href="/products/shorts/mujer" className="hover:text-black transition-colors">
            MUJER
          </Link>
          <Link href="/products/shorts/ninos" className="hover:text-black transition-colors">
            NIÑOS
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Buscar shorts, marcas..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-700 shrink-0">

          <button className="lg:hidden">
            <Search className="w-5 h-5" />
          </button>

          <Link href="/cart" className="flex items-center gap-2 hover:text-black transition-colors">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden xl:inline">Mi Carrito</span>
          </Link>

          {mounted && session ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 hover:text-black transition-colors group"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200 group-hover:border-black transition-colors">
                  {session.user?.image ? (
                    <img src={session.user.image} alt={session.user.name || ""} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className="hidden xl:flex flex-col items-start leading-none">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Hola,</span>
                  <span className="text-xs font-black truncate max-w-[100px]">{session.user?.name?.split(' ')[0]}</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 transition-transform", showUserMenu ? "rotate-180" : "")} />
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 shadow-2xl rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-50 flex flex-col">
                      <span className="text-xs font-black uppercase text-gray-900 truncate">{session.user?.name}</span>
                      <span className="text-[10px] font-medium text-gray-400 truncate">{session.user?.email}</span>
                      {(session.user as any).role === 'admin' && (
                        <span className="mt-1 w-fit bg-red-50 text-red-600 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-red-100">Administrador</span>
                      )}
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      MIS PEDIDOS
                    </Link>

                    {(session.user as any).role === 'admin' && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        PANEL DE CONTROL
                      </Link>
                    )}

                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50 mt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      CERRAR SESIÓN
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/auth/login" className="flex items-center gap-2 hover:text-black transition-colors">
              <UserIcon className="w-5 h-5" />
              <span className="hidden xl:inline">Mi Cuenta</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
