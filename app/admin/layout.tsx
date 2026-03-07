import { requireAdmin } from "@/lib/auth-utils";
import Link from "next/link";
import { Package, LayoutDashboard, LogOut, ShoppingBag, Users } from "lucide-react";
import { signOut } from "@/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await requireAdmin();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 md:min-h-screen bg-white md:border-r border-b md:border-b-0 border-gray-100 flex flex-col shrink-0">
                {/* Logo/Header */}
                <div className="p-6 border-b border-gray-100 uppercase tracking-tighter">
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <img src="/logo.svg" alt="DuoShorts Logo" className="w-8 h-8" />
                        <span className="text-xl font-extrabold tracking-tight">Admin</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-2 md:p-4 overflow-x-auto md:flex-1 hide-scrollbar">
                    <ul className="flex md:flex-col gap-2 min-w-max md:min-w-0">
                        <li>
                            <Link
                                href="/admin/dashboard"
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors font-medium"
                            >
                                <LayoutDashboard className="w-5 h-5" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/products"
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors font-medium"
                            >
                                <Package className="w-5 h-5" />
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/orders"
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors font-medium"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Pedidos
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/users"
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors font-medium"
                            >
                                <Users className="w-5 h-5" />
                                Usuarios
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* User Info & Logout */}
                <div className="p-4 md:border-t border-gray-100 flex md:flex-col justify-between items-center md:items-stretch gap-4 bg-gray-50 md:bg-white">
                    <div className="md:mb-3 md:px-4">
                        <p className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                            Usuario
                        </p>
                        <p className="text-sm font-medium text-black truncate">
                            {session.user?.email}
                        </p>
                    </div>
                    <form
                        action={async () => {
                            "use server";
                            await signOut();
                        }}
                    >
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-4 py-2 md:py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-sm transition-colors font-medium border border-gray-200 md:border-none focus:outline-none"
                        >
                            <LogOut className="w-5 h-5" />
                            Cerrar Sesión
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto w-full">
                <div className="container mx-auto p-4 md:p-8">{children}</div>
            </main>
        </div>
    );
}
