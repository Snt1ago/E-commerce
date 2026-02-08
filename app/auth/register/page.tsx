import RegisterForm from "./RegisterForm";
import Link from "next/link";
import { X } from "lucide-react";

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-gray-50">
      {/* Global Close Button */}
      <Link
        href="/"
        className="absolute top-8 right-8 z-50 p-2 text-gray-600 hover:text-black transition-colors"
      >
        <X className="w-6 h-6" />
      </Link>

      <div className="w-full max-w-lg">
        <RegisterForm />
      </div>
    </main>
  );
}
