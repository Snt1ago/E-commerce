import ProductCard from "./ProductCard";
import { Short } from "@/lib/getShortsByGender";

type Props = {
  shorts: Short[];
};

export default function ProductGrid({ shorts }: Props) {
  return (
    <div className="grid grid-cols-3 gap-6 mt-8">
      {shorts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}