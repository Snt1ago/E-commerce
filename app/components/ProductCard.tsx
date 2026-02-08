import Link from "next/link";
import Image from "next/image";
import { Short } from "@/lib/getShortsByGender";

type Props = {
  product: Short;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/producto/${product.slug}`}>
      <article className="border p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
        />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </article>
    </Link>
  );
}
