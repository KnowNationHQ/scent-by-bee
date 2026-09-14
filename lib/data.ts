export type Product = {
  id: string
  name: string
  category: string
  price: number
  slug: string
  image: string
  description: string
  sizes: string[]
  colors: string[]
}

export const categories = [
  { name: "Eau de Parfum", slug: "edp", image: "/products/edp.svg" },
  { name: "Eau de Toilette", slug: "edt", image: "/products/edt.svg" },
  { name: "Gift Sets", slug: "gift-sets", image: "/products/gift-set.svg" },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Velvet Oud",
    category: "edp",
    price: 85000,
    slug: "velvet-oud",
    image: "/products/velvet-oud.svg",
    description: "Rich oud wood layered with rose and amber. Warm, smoky, unforgettable.",
    sizes: ["30ml", "50ml", "100ml"],
    colors: ["Original", "Intense"],
  },
  {
    id: "2",
    name: "Citrus Bloom",
    category: "edp",
    price: 72000,
    slug: "citrus-bloom",
    image: "/products/citrus-bloom.svg",
    description: "Bright bergamot and neroli over a soft musk base. Fresh without being fleeting.",
    sizes: ["30ml", "50ml", "100ml"],
    colors: ["Original", "Noir"],
  },
  {
    id: "3",
    name: "Midnight Musk",
    category: "edt",
    price: 58000,
    slug: "midnight-musk",
    image: "/products/midnight-musk.svg",
    description: "A clean, skin-like musk with hints of lavender and cedar. Your everyday signature.",
    sizes: ["30ml", "50ml"],
    colors: ["Original"],
  },
  {
    id: "4",
    name: "Golden Sahara",
    category: "edt",
    price: 62000,
    slug: "golden-sahara",
    image: "/products/golden-sahara.svg",
    description: "Spiced saffron and cardamom melt into sandalwood. Dry warmth, bottled.",
    sizes: ["30ml", "50ml"],
    colors: ["Original"],
  },
  {
    id: "5",
    name: "The Discovery Set",
    category: "gift-sets",
    price: 45000,
    slug: "discovery-set",
    image: "/products/discovery-set.svg",
    description: "Five 10ml samples of our most-loved scents. The perfect way to find your signature.",
    sizes: ["5 × 10ml"],
    colors: ["Original"],
  },
  {
    id: "6",
    name: "Duo Luxe",
    category: "gift-sets",
    price: 130000,
    slug: "duo-luxe",
    image: "/products/duo-luxe.svg",
    description: "Two full-size bottles, one gift box. Choose any two from the collection.",
    sizes: ["2 × 50ml"],
    colors: ["Mix & Match"],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
