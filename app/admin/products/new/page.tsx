import { requireAdmin } from "@/lib/auth-utils";
import ProductForm from "../ProductForm";

export default async function NewProductPage() {
    await requireAdmin();

    return <ProductForm />;
}
