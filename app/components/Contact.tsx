"use client";

import { useState } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mpwryqep", {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
                setTimeout(() => {
                    setStatus("idle");
                }, 3000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section className="py-20 bg-neutral-50" id="contacto">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                    {/* Info Side */}
                    <div className="bg-neutral-900 text-white p-10 md:p-16 md:w-2/5 flex flex-col justify-between">
                        <div>
                            <h2 className="text-4xl font-black mb-6 tracking-tighter uppercase">Contáctanos</h2>
                            <p className="text-gray-400 mb-10 font-light text-lg">
                                ¿Tienes alguna duda sobre nuestros productos o tu pedido? Escríbenos y te responderemos lo antes posible.
                            </p>

                            <div className="space-y-6">
                                <a href="mailto:soporte@duoshorts.com" className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                                        <Mail className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold uppercase tracking-wider text-sm mb-1 group-hover:text-blue-400 transition-colors">Email</h3>
                                        <p className="text-gray-400">soporte@duoshorts.com</p>
                                    </div>
                                </a>

                                <a href="https://wa.me/59894259238" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center shrink-0 group-hover:bg-green-600 transition-colors">
                                        <Phone className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold uppercase tracking-wider text-sm mb-1 group-hover:text-green-400 transition-colors">Teléfono</h3>
                                        <p className="text-gray-400">+598 94 259 238</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold uppercase tracking-wider text-sm mb-1">Ubicación</h3>
                                        <p className="text-gray-400">Montevideo, Uruguay</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-neutral-800">
                            <p className="font-medium text-blue-400 uppercase tracking-widest text-sm">
                                Rendimiento sin límites
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-10 md:p-16 md:w-3/5">
                        <h3 className="text-2xl font-black mb-6 tracking-tight text-neutral-900 uppercase">Envíanos un mensaje</h3>

                        {status === "success" ? (
                            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl flex items-start gap-4 text-green-800 animate-in fade-in duration-300">
                                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0 mt-1">
                                    <Send className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold uppercase tracking-widest text-sm mb-1">¡Mensaje enviado!</p>
                                    <p className="text-sm font-medium">Gracias por contactarnos. Te responderemos en breve.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Nombre</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="Tu nombre completo"
                                            className="w-full bg-neutral-100 border-none text-neutral-900 placeholder-neutral-400 px-5 py-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder="tu@email.com"
                                            className="w-full bg-neutral-100 border-none text-neutral-900 placeholder-neutral-400 px-5 py-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Asunto</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        placeholder="¿En qué podemos ayudarte?"
                                        className="w-full bg-neutral-100 border-none text-neutral-900 placeholder-neutral-400 px-5 py-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Mensaje</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        placeholder="Escribe tu mensaje aquí..."
                                        className="w-full bg-neutral-100 border-none text-neutral-900 placeholder-neutral-400 px-5 py-4 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium resize-none"
                                    ></textarea>
                                </div>

                                {status === "error" && (
                                    <p className="text-red-500 text-sm font-medium">Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-wider"
                                >
                                    {status === "submitting" ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Enviar Mensaje
                                            <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
