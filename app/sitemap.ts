import { getAllProducts, CATEGORIES, GENDERS } from "@/lib/products";

export default async function sitemap() {
  const baseUrl = "https://duoshorts.com";

  const products = await getAllProducts();

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/producto/${p.slug}`,
    lastModified: new Date(),
  }));

  const categoryUrls: { url: string; lastModified: Date }[] = [];

  for (const cat of CATEGORIES) {
    categoryUrls.push({
      url: `${baseUrl}/products/${cat}`,
      lastModified: new Date(),
    });

    for (const gender of GENDERS) {
      categoryUrls.push({
        url: `${baseUrl}/products/${cat}/${gender}`,
        lastModified: new Date(),
      });
    }
  }

  return [
    { url: baseUrl, lastModified: new Date() },
    ...productUrls,
    ...categoryUrls,
  ];
}
