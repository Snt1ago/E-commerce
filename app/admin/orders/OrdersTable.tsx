
"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    Eye,
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
    ChevronDown
} from "lucide-react";
import { updateOrderStatus } from "@/actions/order-actions";

interface OrdersTableProps {
    initialOrders: any[];
}

export default function OrdersTable({ initialOrders }: OrdersTableProps) {
    const [orders, setOrders] = useState(initialOrders);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDIENTE": return "bg-amber-100 text-amber-700 border-amber-200";
            case "PAGADO": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "ENVIADO": return "bg-blue-100 text-blue-700 border-blue-200";
            case "CANCELADO": return "bg-rose-100 text-rose-700 border-rose-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PENDIENTE": return <Clock className="w-3 h-3" />;
            case "PAGADO": return <CheckCircle2 className="w-3 h-3" />;
            case "ENVIADO": return <Truck className="w-3 h-3" />;
            case "CANCELADO": return <XCircle className="w-3 h-3" />;
            default: return null;
        }
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        const result = await updateOrderStatus(orderId, newStatus);
        if (result.success) {
            setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por # o cliente..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                            className="w-full pl-10 pr-8 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Todos los estados</option>
                            <option value="PENDIENTE">Pendientes</option>
                            <option value="PAGADO">Pagados</option>
                            <option value="ENVIADO">Enviados</option>
                            <option value="CANCELADO">Cancelados</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Pedido</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Cliente</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Fecha</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Total</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Estado</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-black text-gray-900 dark:text-white">#{order.orderNumber}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900 dark:text-white">{order.customerName}</span>
                                                <span className="text-xs text-gray-500">{order.customerEmail}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 font-black text-sm text-gray-900 dark:text-white">
                                            ${order.total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <select
                                                    className="text-xs border border-gray-200 dark:border-gray-700 rounded p-1 bg-white dark:bg-gray-800 outline-none"
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                >
                                                    <option value="PENDIENTE">PENDIENTE</option>
                                                    <option value="PAGADO">PAGADO</option>
                                                    <option value="ENVIADO">ENVIADO</option>
                                                    <option value="CANCELADO">CANCELADO</option>
                                                </select>
                                                <button className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No se encontraron pedidos
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
