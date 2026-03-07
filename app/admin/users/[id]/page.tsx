import { requireAdmin } from "@/lib/auth-utils";
import { getUserById } from "@/actions/user-actions";
import { notFound } from "next/navigation";
import UserForm from "../UserForm";

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
        <div>
            <UserForm user={user} />
        </div>
    );
}
