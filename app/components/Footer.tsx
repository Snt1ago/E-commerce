import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="DuoShorts Logo" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Shorts deportivos diseñados para el movimiento. Calidad, tecnología y estilo en cada prenda.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Compra</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/products/hombre" className="hover:text-black transition-colors">Hombre</Link></li>
              <li><Link href="/products/mujer" className="hover:text-black transition-colors">Mujer</Link></li>
              <li><Link href="/products/ninos" className="hover:text-black transition-colors">Niños</Link></li>
              <li><Link href="/products/ofertas" className="hover:text-black transition-colors">Ofertas</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Ayuda</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/envios" className="hover:text-black transition-colors">Envíos</Link></li>
              <li><Link href="/cambios" className="hover:text-black transition-colors">Cambios y devoluciones</Link></li>
              <li><Link href="/talles" className="hover:text-black transition-colors">Guía de talles</Link></li>
              <li><Link href="/contacto" className="hover:text-black transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider">Síguenos</h4>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-black transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-black transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-medium uppercase tracking-widest text-gray-400">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>© 2024 DuoShorts. Todos los derechos reservados.</p>
            <span className="hidden md:inline text-gray-200">|</span>
            <p className="flex items-center gap-1">
              Desarrollado por
              <Link
                href="https://github.com/Snt1ago"
                target="_blank"
                className="text-black font-black hover:text-blue-600 transition-colors underline decoration-2 underline-offset-4"
              >
                Snt1ago
              </Link>
            </p>
          </div>
          <div className="flex gap-6 mt-6 md:mt-0">
            <Link href="#" className="hover:text-gray-600">Políticas de Privacidad</Link>
            <Link href="#" className="hover:text-gray-600">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
