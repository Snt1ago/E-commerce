
import { getAllOrders } from "@/actions/order-actions";
import OrdersTable from "./OrdersTable";
import { Package } from "lucide-react";

export default async function AdminOrdersPage() {
    const orders = await getAllOrders();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Package className="w-5 h-5" />
                        <h2 className="text-sm font-black uppercase tracking-widest">Gestión de Ventas</h2>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                        Pedidos
                    </h1>
                </div>
            </div>

            <OrdersTable initialOrders={orders} />
        </div>
    );
}
