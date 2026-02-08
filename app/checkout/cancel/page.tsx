import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pago Cancelado</h1>
        <p className="text-gray-600 mb-8">
          El proceso de pago ha sido cancelado. No se ha realizado ningún cargo a tu cuenta.
          Si tuviste algún problema, puedes intentar nuevamente o contactarnos.
        </p>
        <div className="space-y-4">
          <Link
            href="/cart"
            className="inline-block w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            Volver al carrito
          </Link>
          <Link
            href="/"
            className="inline-block w-full text-gray-500 font-medium hover:text-gray-700 transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
