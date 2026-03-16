import Link from "next/link";
import Image from "next/image";
import { Short } from "@/lib/getShortsByGender";
import { type Product } from '@/lib/contentful';

type Props = {
  product: Short | Product
};


export default function ProductCard({ product }: Props) {
  const imageUrl = 'image' in product ? product.image : (product.images?.[0] || '/placeholder.jpg');
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="border rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={300}
        />
        <div className="p-4">
          <h2 className="font-semibold">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}
