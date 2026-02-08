import { requireAdmin } from "@/lib/auth-utils";
import { getAllProductsAdmin } from "@/actions/product-actions";
import ProductsTable from "./ProductsTable";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    await requireAdmin();
    const params = await searchParams;
    const query = typeof params.q === "string" ? params.q : undefined;
    const category = typeof params.category === "string" ? params.category : undefined;
    const sport = typeof params.sport === "string" ? params.sport : undefined;

    const products = await getAllProductsAdmin(query, category, sport);

    return <ProductsTable products={products} />;
}
