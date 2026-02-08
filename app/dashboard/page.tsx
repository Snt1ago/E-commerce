
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { auth } from "@/auth";
import { getUserOrders } from "@/actions/order-actions";
import { redirect } from "next/navigation";
import { Package, Clock, CheckCircle2, Truck, XCircle, ShoppingBag } from "lucide-react";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/auth/login");
    }

    const orders = await getUserOrders(session.user.email);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDIENTE": return "bg-amber-100 text-amber-700 border-amber-200";
            case "PAGADO": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "ENVIADO": return "bg-blue-100 text-blue-700 border-blue-200";
            case "CANCELADO": return "bg-rose-100 text-rose-700 border-rose-200";
            default: return "bg-neutral-100 text-neutral-700 border-neutral-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PENDIENTE": return <Clock className="w-4 h-4" />;
            case "PAGADO": return <CheckCircle2 className="w-4 h-4" />;
            case "ENVIADO": return <Truck className="w-4 h-4" />;
            case "CANCELADO": return <XCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
                <div className="mb-10">
                    <h1 className="text-4xl font-black tracking-tight text-neutral-900 mb-2">Mi Cuenta</h1>
                    <p className="text-neutral-500 font-medium">Bienvenido, {session.user.name}. Aquí puedes ver el estado de tus pedidos.</p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-neutral-100 shadow-sm flex flex-col items-center">
                        <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-10 h-10 text-neutral-300" />
                        </div>
                        <h2 className="text-xl font-bold text-neutral-900 mb-2">Aún no tienes pedidos</h2>
                        <p className="text-neutral-500 mb-8 max-w-sm">Explora nuestro catálogo y encuentra los mejores shorts para tu entrenamiento.</p>
                        <a href="/products" className="bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all">
                            Ir a la tienda
                        </a>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <h2 className="text-sm font-black uppercase tracking-widest text-neutral-400">Tus últimos pedidos</h2>
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-6 border-b border-neutral-50">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Número de Pedido</p>
                                        <p className="text-lg font-black text-neutral-900">#{order.orderNumber}</p>
                                        <p className="text-xs text-neutral-500">{new Date(order.createdAt).toLocaleDateString('es-UY', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                    <div className="flex flex-col sm:items-end gap-3">
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black border ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </span>
                                        <p className="text-2xl font-black text-neutral-900">
                                            <span className="text-sm mr-1">$</span>
                                            {order.total.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8 bg-neutral-50/50">
                                    <div className="grid grid-cols-1 gap-6">
                                        {order.items.map((item: any) => (
                                            <div key={item.id} className="flex gap-4 items-center">
                                                <div className="w-16 h-16 bg-white rounded-xl border border-neutral-100 overflow-hidden flex-shrink-0">
                                                    {item.product?.images?.[0] ? (
                                                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-neutral-100"></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-black text-neutral-900 uppercase truncate">{item.product?.name || 'Producto'}</p>
                                                    <p className="text-xs text-neutral-500 font-bold uppercase tracking-tight">Talle: {item.size} • Qty: {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-black text-neutral-900">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-white border-t border-neutral-50 flex justify-end">
                                    <button className="text-[10px] font-black uppercase tracking-widest text-neutral-900 hover:underline">
                                        Ver factura detallada
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
