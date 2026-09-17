"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { type Product, type Category } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

const PAGE_SIZE = 24;

type Sort = "featured" | "name";

export default function ShopClient({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get("category") ?? "";
  const query = searchParams.get("q") ?? "";
  const [sort, setSort] = useState<Sort>("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [activeCategory, query, sort]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory)
      list = list.filter((p) => p.categories.includes(activeCategory));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [activeCategory, query, sort]);

  const setCategory = (slug: string) => {
    router.replace(slug ? `${pathname}?category=${slug}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div>
      {/* category circles */}
      <div className="scrollbar-hide -mx-2 flex gap-5 overflow-x-auto px-2 py-2 lg:justify-between">
        <button
          onClick={() => setCategory("")}
          aria-pressed={!activeCategory}
          className="group flex w-20 flex-none flex-col items-center gap-2.5 text-center sm:w-24"
        >
          <span
            className={`relative block h-20 w-20 overflow-hidden rounded-full bg-white ring-offset-2 ring-offset-paper transition-all duration-300 sm:h-[5.5rem] sm:w-[5.5rem] ${
              !activeCategory
                ? "ring-2 ring-orange"
                : "border border-ink/10 group-hover:border-transparent group-hover:ring-2 group-hover:ring-orange"
            }`}
          >
            <Image
              src="/icon.png"
              alt=""
              fill
              sizes="96px"
              className="object-contain p-5 transition-transform duration-500 group-hover:scale-110"
            />
          </span>
          <span
            className={`text-xs font-semibold leading-tight transition-colors ${
              !activeCategory ? "text-orange" : "text-ink group-hover:text-orange"
            }`}
          >
            All Products ({products.length})
          </span>
        </button>

        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug)}
            aria-pressed={activeCategory === c.slug}
            className="group flex w-20 flex-none flex-col items-center gap-2.5 text-center sm:w-24"
          >
            <span
              className={`relative block h-20 w-20 overflow-hidden rounded-full ring-offset-2 ring-offset-paper transition-all duration-300 sm:h-[5.5rem] sm:w-[5.5rem] ${
                activeCategory === c.slug
                  ? "ring-2 ring-orange"
                  : "border border-ink/10 group-hover:border-transparent group-hover:ring-2 group-hover:ring-orange"
              }`}
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes="96px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </span>
            <span
              className={`text-xs font-semibold leading-tight transition-colors ${
                activeCategory === c.slug
                  ? "text-orange"
                  : "text-ink group-hover:text-orange"
              }`}
            >
              {c.name}
            </span>
          </button>
        ))}
      </div>

      {/* active search + sort */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {query.trim() && (
            <button
              onClick={() =>
                router.replace(
                  activeCategory
                    ? `${pathname}?category=${activeCategory}`
                    : pathname,
                  { scroll: false }
                )
              }
              className="group flex items-center gap-2 rounded-full border border-orange bg-orange/10 px-4 py-2 text-sm font-semibold text-orange transition-colors hover:bg-orange hover:text-white"
            >
              Searching: &ldquo;{query.trim()}&rdquo;
              <span className="text-base leading-none">×</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="spec text-ink-soft">
            {filtered.length} item{filtered.length === 1 ? "" : "s"}
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort products"
            className="rounded-full border border-ink/20 bg-cream px-4 py-2.5 text-sm font-semibold outline-none focus:border-orange"
          >
            <option value="featured">Featured</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="cropmarks mt-10 border border-dashed border-ink/20 p-16 text-center">
          <p className="font-display text-xl font-semibold">
            Nothing matched “{query}”
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Try a different keyword, or ask us directly on WhatsApp — we
            probably make it.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {filtered.slice(0, visible).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {visible < filtered.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full border-2 border-ink px-8 py-3 font-display font-bold transition-all hover:-translate-y-0.5 hover:border-orange hover:text-orange"
              >
                Load more ({filtered.length - visible} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
