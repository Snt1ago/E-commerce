import { requireAdmin } from "@/lib/auth-utils";
import ProductForm from "../ProductForm";
import BackButton from "@/app/components/BackButton";

export default async function NewProductPage() {
    await requireAdmin();

    return (
        <div className="max-w-4xl mx-auto">
            <BackButton href="/admin/products" label="Volver a la lista de productos" />
            <ProductForm />
        </div>
    );
}
