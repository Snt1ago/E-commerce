import { requireAdmin } from "@/lib/auth-utils";
import Link from "next/link";
import { Package, TrendingUp } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
    await requireAdmin();

    const productCount = await prisma.product.count();
    const products = await prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    });

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-black mb-2">Dashboard</h1>
                <p className="text-gray-600">Bienvenido al panel de administración</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-sm flex items-center justify-center">
                            <Package className="w-6 h-6" />
                        </div>
                        <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">
                        Total Productos
                    </p>
                    <p className="text-3xl font-extrabold text-black">{productCount}</p>
                </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-black">
                        Productos Recientes
                    </h2>
                    <Link
                        href="/admin/products"
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider"
                    >
                        Ver Todos
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Producto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Marca
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                                    Precio
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-black">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {product.brand}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-black">
                                        ${product.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
