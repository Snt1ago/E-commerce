import { requireAdmin } from "@/lib/auth-utils";
import UserForm from "../UserForm";
import BackButton from "@/app/components/BackButton";

export default async function NewUserPage() {
    await requireAdmin();

    return (
        <div className="max-w-4xl mx-auto">
            <BackButton href="/admin/users" label="Volver a la lista de usuarios" />
            <UserForm />
        </div>
    );
}
