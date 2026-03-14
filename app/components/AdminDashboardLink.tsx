"use client";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { isAdminRole } from "@/lib/roles";

export default function AdminDashboardLink() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAdminRole((session?.user as any)?.role)) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 pt-6">
      <Link
        href="/admin/dashboard"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
      >
        <LayoutDashboard className="w-4 h-4" />
        Ir al Panel de Control
      </Link>
    </div>
  );
}
