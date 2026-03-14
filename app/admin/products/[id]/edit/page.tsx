import { requireAdmin } from "@/lib/auth-utils";
import { getProductById } from "@/actions/product-actions";
import ProductForm from "../../ProductForm";
import BackButton from "@/app/components/BackButton";
import { notFound } from "next/navigation";

export default async function EditProductPage({
    params,
}: {
    params: { id: string };
}) {
    await requireAdmin();
    const product = await getProductById(params.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <BackButton href="/admin/products" label="Volver a la lista de productos" />
            <ProductForm product={product} isEdit />
        </div>
    );
}
