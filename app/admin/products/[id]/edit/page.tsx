import { requireAdmin } from "@/lib/auth-utils";
import { getProductById } from "@/actions/product-actions";
import ProductForm from "../../ProductForm";
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

    return <ProductForm product={product} isEdit />;
}
