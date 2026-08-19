import raw from "@/data/catalog.json";
import campaign from "@/data/campaign.json";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  priceMax: number | null;
  onSale: boolean;
  description: string;
  categories: string[];
  tags: string[];
  image: string;
  localImage: string;
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  count: number;
}

export const products: Product[] = [...raw, ...campaign] as Product[];

const CATEGORY_META: Omit<Category, "count">[] = [
  {
    slug: "banners",
    name: "Banners",
    blurb: "Pop-up, teardrop, backdrop, X-banners, billboards & gazebos for events and promotions.",
    image: "/categories/banners.jpg",
  },
  {
    slug: "corporate-apparel",
    name: "Corporate Apparel",
    blurb: "Gents' and ladies' corporate shirts, chef jackets and tailored workwear.",
    image: "/categories/corporate-apparel.jpg",
  },
  {
    slug: "corporate-gifts",
    name: "Corporate Gifts",
    blurb: "Executive gift sets, awards, flash disks, desk organisers and card holders.",
    image: "/categories/corporate-gifts.jpg",
  },
  {
    slug: "corporate-stationery",
    name: "Corporate Stationery",
    blurb: "Notebooks, pens, business cards, letterheads, calendars, diaries and more.",
    image: "/categories/corporate-stationery.jpg",
  },
  {
    slug: "individual-gifts",
    name: "Individual Gifts",
    blurb: "Photo books, framed photos, throw pillows, cards and personalised keepsakes.",
    image: "/categories/individual-gifts.jpg",
  },
  {
    slug: "promotional-items",
    name: "Promotional Items",
    blurb: "T-shirts, hoodies, caps, mugs, water bottles, bags and giveaways that carry your brand.",
    image: "/categories/promotional-items.jpg",
  },
  {
    slug: "signages",
    name: "Signage Products",
    blurb: "2D & 3D signage, glass and directional signs that make your space speak.",
    image: "/categories/signages.jpg",
  },
  {
    slug: "printing-accessories",
    name: "Printing Accessories",
    blurb: "Screen-printing meshes and professional consumables for print work.",
    image: "/products/screen-printing-mesh-55t-high-quality.jpg",
  },
  {
    slug: "campaign",
    name: "Campaign & Political",
    blurb: "Election-ready merchandise for every party — t-shirts, caps, banners, lessos, flags and more, in your colours.",
    image: "/categories/campaign.jpg",
  },
];

export const categories: Category[] = CATEGORY_META.map((c) => ({
  ...c,
  count: products.filter((p) => p.categories.includes(c.slug)).length,
}));

export function categoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function productBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsInCategory(slug: string): Product[] {
  return products.filter((p) => p.categories.includes(slug));
}

export function relatedProducts(product: Product, n = 4): Product[] {
  const pool = products.filter(
    (p) =>
      p.id !== product.id &&
      p.categories.some((c) => product.categories.includes(c))
  );
  return pool.slice(0, n);
}
