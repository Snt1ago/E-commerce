"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-end gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {/* Mensaje flotante */}
            <div
                className={`bg-white text-neutral-900 p-4 rounded-2xl shadow-2xl mb-2 relative transition-all duration-300 origin-bottom-right ${isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                    }`}
            >
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-2 -right-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-600 rounded-full p-1 transition-colors"
                >
                    <X className="w-3 h-3" />
                </button>
                <div className="flex flex-col gap-1">
                    <p className="font-bold text-sm">¿Necesitas ayuda? 👋</p>
                    <p className="text-xs text-neutral-600 leading-tight">
                        Escríbenos por privado y te asesoramos con tu pedido.
                    </p>
                </div>
                {/* Triángulo */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 shadow-lg -z-10"></div>
            </div>

            <a
                href="https://wa.me/59894259238"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 active:scale-95"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label="Chatear por WhatsApp"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="fill-current"
                >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
            </a>
        </div>
    );
}
