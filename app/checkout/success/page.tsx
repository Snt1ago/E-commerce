import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Pago Exitoso!</h1>
        <p className="text-gray-600 mb-8">
          Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando.
          Recibirás un correo de confirmación en breve.
        </p>
        <Link
          href="/"
          className="inline-block w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}
