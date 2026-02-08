
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export default async function TestLoginPage() {
    async function testLogin(formData: FormData) {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log("Testing login for:", email);

        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return redirect("/test-login?error=UserNotFound");
            }

            const match = await bcrypt.compare(password, user.password);

            if (match) {
                redirect("/test-login?success=true");
            } else {
                redirect("/test-login?error=PasswordMismatch");
            }
        } catch (error: any) {
            if (error.message === "NEXT_REDIRECT") throw error;
            console.error("Test login error:", error);
            redirect(`/test-login?error=${error.message}`);
        }
    }

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Test DB Login</h1>
            <form action={testLogin} className="flex flex-col gap-4 max-w-sm">
                <input name="email" placeholder="Email" className="border p-2" />
                <input name="password" type="password" placeholder="Password" className="border p-2" />
                <button type="submit" className="bg-blue-500 text-white p-2">Test Login</button>
            </form>
        </div>
    );
}
