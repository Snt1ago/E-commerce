export type Short = {
  id: number;
  name: string;
  slug: string;
  gender: "hombre" | "mujer" | "ninos";
  price: number;
  image: string;
  sizes: string[];
  colors: string[];
};

const shorts: Short[] = [
  {
    id: 1,
    name: "Short Deportivo Pro",
    slug: "short-deportivo-pro",
    gender: "hombre",
    price: 30,
    image: "/shorts/short-1.jpg",
    sizes: ["S", "M", "L"],
    colors: ["Negro"],
  },
  {
    id: 2,
    name: "Short Casual de Verano",
    slug: "short-casual-de-verano",
    gender: "mujer",
    price: 25,
    image: "/shorts/short-2.jpg",
    sizes: ["XS", "S", "M"],
    colors: ["Blanco", "Azul"],
  },
];

export function getShortsByGender(gender: Short["gender"]) {
  return shorts.filter((s) => s.gender === gender);
}

export function getAllShorts(): Short[] {
  return shorts;
}

export function getShortBySlug(slug: string): Short | undefined {
  return shorts.find((s) => s.slug === slug);
}
