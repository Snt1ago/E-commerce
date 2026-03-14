"use client";

import Link from "next/link";
import { Search, ShoppingCart, User as UserIcon, LogOut, Package, ChevronDown, LayoutDashboard, Menu, X, Settings } from "lucide-react";
import { useCartStore } from "@/app/store/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { isAdminRole } from "@/lib/roles";
import { useSession, signOut } from "next-auth/react";
import PredictiveSearch from "./PredictiveSearch";

export default function Header() {
  const { data: session } = useSession();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMarcasOpen, setIsMarcasOpen] = useState(false);
  const [isDeportesOpen, setIsDeportesOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = isAdminRole((session?.user as any)?.role);
  const firstName = session?.user?.name?.split(" ")[0] || "Usuario";

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
        <PredictiveSearch />

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

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex items-center gap-6">
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
                    <span className="text-[10px] uppercase font-bold text-gray-400 truncate max-w-[120px]">{firstName}</span>
                    <span className="text-xs font-black">Mi Cuenta</span>
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
                        {isAdmin && (
                          <span className="mt-1 w-fit bg-red-50 text-red-600 text-[8px] font-black uppercase px-2 py-0.5 rounded-full border border-red-100">Administrador</span>
                        )}
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        MI PERFIL
                      </Link>

                      <Link
                        href="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-black transition-colors"
                      >
                        <Package className="w-4 h-4" />
                        MIS PEDIDOS
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors border-y border-blue-50"
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
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 top-16 bg-white z-50 md:hidden transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="flex flex-col h-full overflow-y-auto p-4 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 mb-2">Categorías</span>

            <Link href="/products/shorts/hombre" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-lg font-black text-gray-900 border-b border-gray-50 flex items-center justify-between">
              HOMBRE
            </Link>

            <Link href="/products/shorts/mujer" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-lg font-black text-gray-900 border-b border-gray-50 flex items-center justify-between">
              MUJER
            </Link>

            <Link href="/products/shorts/ninos" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 text-lg font-black text-gray-900 border-b border-gray-50 flex items-center justify-between">
              NIÑOS
            </Link>

            {/* Submenu Marcas */}
            <div className="border-b border-gray-50">
              <button
                onClick={() => setIsMarcasOpen(!isMarcasOpen)}
                className="w-full px-4 py-3 text-lg font-black text-gray-900 flex items-center justify-between"
              >
                MARCAS
                <ChevronDown className={cn("w-5 h-5 transition-transform", isMarcasOpen ? "rotate-180" : "")} />
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-300 bg-gray-50",
                isMarcasOpen ? "max-h-[500px] py-2" : "max-h-0"
              )}>
                <Link href="/products?brand=MGR Sport" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">MGR Sport</Link>
                <Link href="/products?brand=Matgeor" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">Matgeor</Link>
                <Link href="/products?brand=Enas" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">Enas</Link>
                <Link href="/products?brand=Timeout" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">Timeout</Link>
              </div>
            </div>

            {/* Submenu Deportes */}
            <div className="border-b border-gray-50">
              <button
                onClick={() => setIsDeportesOpen(!isDeportesOpen)}
                className="w-full px-4 py-3 text-lg font-black text-gray-900 flex items-center justify-between"
              >
                DEPORTES
                <ChevronDown className={cn("w-5 h-5 transition-transform", isDeportesOpen ? "rotate-180" : "")} />
              </button>
              <div className={cn(
                "overflow-hidden transition-all duration-300 bg-gray-50",
                isDeportesOpen ? "max-h-[500px] py-2" : "max-h-0"
              )}>
                <Link href="/products?sport=Running" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">Running/Trail</Link>
                <Link href="/products?sport=Training" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">Fitness/Gym</Link>
                <Link href="/products?sport=Fútbol" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">Fútbol</Link>
                <Link href="/products?sport=Básquet" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">Básquet</Link>
                <Link href="/products?sport=Ciclismo" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">Ciclismo</Link>
                <Link href="/products?sport=Yoga" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">Yoga/Pilates</Link>
                <Link href="/products?sport=Natación" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-2 text-sm font-bold text-gray-600">Natación</Link>
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-gray-100 pt-6 pb-8">
            {mounted && session ? (
              <div className="flex flex-col gap-4 px-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
                    {session.user?.image ? (
                      <img src={session.user.image} alt={session.user.name || ""} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900">{session.user?.name}</span>
                    <span className="text-[10px] font-medium text-gray-400">{session.user?.email}</span>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-sm font-bold text-gray-700"
                >
                  <Settings className="w-5 h-5" />
                  MI PERFIL
                </Link>

                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-sm font-bold text-gray-700"
                >
                  <Package className="w-5 h-5" />
                  MIS PEDIDOS
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-2 text-sm font-bold text-blue-600"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    PANEL DE CONTROL
                  </Link>
                )}

                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 py-2 text-sm font-bold text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  CERRAR SESIÓN
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mx-4 flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl text-sm font-black hover:bg-gray-900 transition-colors"
              >
                <UserIcon className="w-5 h-5" />
                MI CUENTA
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

