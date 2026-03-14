import { requireAdmin } from "@/lib/auth-utils";
import { getUserById } from "@/actions/user-actions";
import { notFound } from "next/navigation";
import UserForm from "../UserForm";
import BackButton from "@/app/components/BackButton";

export default async function EditUserPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    await requireAdmin();
    const resolvedParams = await params;

    const user = await getUserById(resolvedParams.id);

    if (!user) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <BackButton href="/admin/users" label="Volver a la lista de usuarios" />
            <UserForm user={user} />
        </div>
    );
}
