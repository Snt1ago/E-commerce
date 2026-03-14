"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
    href: string;
    label: string;
    className?: string;
}

export default function BackButton({ href, label, className = "" }: BackButtonProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-black transition-colors mb-6 group ${className}`}
        >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            {label}
        </Link>
    );
}
