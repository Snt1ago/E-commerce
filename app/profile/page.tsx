import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import UserProfileForm from "@/app/profile/UserProfileForm";
import BackButton from "../components/BackButton";

export default async function ProfilePage() {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-sm shadow-sm max-w-md w-full text-center">
                    <h1 className="text-2xl font-black mb-2">No autenticado</h1>
                    <p className="text-gray-600 mb-6">Inicia sesión para ver tu perfil.</p>
                </div>
            </div>
        );
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true, name: true, email: true }
    });

    if (!user) {
        return <div>Usuario no encontrado</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-3xl pt-12">
                <BackButton href="/" label="Volver al inicio" />
                <h1 className="text-3xl font-extrabold text-black mb-2">Mi Perfil</h1>
                <p className="text-gray-600 mb-8">Administra tu información personal y contraseña.</p>

                <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm border border-gray-100">
                    <UserProfileForm user={user} />
                </div>
            </div>
        </div>
    );
}
