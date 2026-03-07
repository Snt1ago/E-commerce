import { requireAdmin } from "@/lib/auth-utils";
import { getUsers } from "@/actions/user-actions";
import UsersTable from "./UsersTable";

export default async function UsersPage() {
    await requireAdmin();
    const users = await getUsers();

    return <UsersTable users={users} />;
}
