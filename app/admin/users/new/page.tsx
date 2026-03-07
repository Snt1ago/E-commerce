import { requireAdmin } from "@/lib/auth-utils";
import UserForm from "../UserForm";

export default async function NewUserPage() {
    await requireAdmin();

    return (
        <div>
            <UserForm />
        </div>
    );
}
