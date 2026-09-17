"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { type Product, type Category, type SubCategory } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

const PAGE_SIZE = 24;

type Sort = "featured" | "name";

/** One category avatar in the strip. */
function Circle({
  image,
  iconMode = false,
  label,
  selected,
  hasChildren = false,
  onClick,
}: {
  image?: string;
  iconMode?: boolean;
  label: string;
  selected: boolean;
  hasChildren?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className="group flex w-20 flex-none flex-col items-center gap-2.5 text-center sm:w-24"
    >
      <span
        className={`relative block h-20 w-20 overflow-hidden rounded-full bg-white ring-offset-2 ring-offset-paper transition-all duration-300 sm:h-[5.5rem] sm:w-[5.5rem] ${
          selected
            ? "ring-2 ring-orange"
            : "border border-ink/10 group-hover:border-transparent group-hover:ring-2 group-hover:ring-orange"
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes="96px"
            className={`transition-transform duration-500 group-hover:scale-110 ${
              iconMode ? "object-contain p-5" : "object-cover"
            }`}
          />
        ) : null}
      </span>
      <span
        className={`flex items-center gap-1 text-xs font-semibold leading-tight transition-colors ${
          selected ? "text-orange" : "text-ink group-hover:text-orange"
        }`}
      >
        {label}
        {hasChildren && (
          <svg
            viewBox="0 0 24 24"
            className="h-3 w-3 flex-none text-ink-soft transition-colors group-hover:text-orange"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </button>
  );
}

export default function ShopClient({
  products,
  categories,
  initialCategory = "",
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // The active category comes from the route (/catalog/<slug>), not a query param.
  const activeCategory = initialCategory;
  const query = searchParams.get("q") ?? "";
  const [sort, setSort] = useState<Sort>("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const catBySlug = useMemo(() => {
    const m = new Map<string, Category>();
    for (const c of categories) m.set(c.slug, c);
    return m;
  }, [categories]);
  const parentBySub = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of categories)
      for (const s of c.children ?? []) m.set(s.slug, c.slug);
    return m;
  }, [categories]);

  // Drill view is derived from the URL: a subcategory shows its parent's strip;
  // a top-level category that has children shows its own subcategories.
  const drillParent = useMemo(() => {
    const sub = parentBySub.get(activeCategory);
    if (sub) return sub;
    const cat = catBySlug.get(activeCategory);
    return cat?.children?.length ? activeCategory : null;
  }, [activeCategory, parentBySub, catBySlug]);

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
  }, [activeCategory, query, sort, products]);

  const setCategory = (slug: string) => {
    router.push(slug ? `/catalog/${slug}` : "/catalog", { scroll: false });
  };
  const onBack = () => router.push("/catalog", { scroll: false });

  const parent = drillParent ? catBySlug.get(drillParent) : null;

  return (
    <div>
      {/* category strip — top-level, or a parent's subcategories */}
      {parent ? (
        <div key={parent.slug} className="strip-in">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-cream px-3.5 py-1.5 text-sm font-semibold text-ink transition-colors hover:border-orange hover:text-orange"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden
              >
                <path
                  d="M15 6l-6 6 6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All categories
            </button>
            <span className="font-display text-lg font-extrabold tracking-tight text-ink">
              {parent.name}
            </span>
          </div>
          <div className="scrollbar-hide -mx-2 flex gap-5 overflow-x-auto px-2 py-2">
            <Circle
              image={parent.image}
              label={`All ${parent.name}`}
              selected={activeCategory === parent.slug}
              onClick={() => setCategory(parent.slug)}
            />
            {parent.children!.map((s: SubCategory) => (
              <Circle
                key={s.slug}
                image={s.image}
                label={s.name}
                selected={activeCategory === s.slug}
                onClick={() => setCategory(s.slug)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          key="root"
          className="strip-in scrollbar-hide -mx-2 flex gap-5 overflow-x-auto px-2 py-2 lg:justify-between"
        >
          <Circle
            iconMode
            image="/icon.png"
            label="All Products"
            selected={!activeCategory}
            onClick={() => setCategory("")}
          />
          {categories.map((c) => (
            <Circle
              key={c.slug}
              image={c.image}
              label={c.name}
              hasChildren={!!c.children?.length}
              selected={activeCategory === c.slug}
              onClick={() => setCategory(c.slug)}
            />
          ))}
        </div>
      )}

      {/* active search + sort */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {query.trim() && (
            <button
              onClick={() => router.replace(pathname, { scroll: false })}
              className="group flex items-center gap-2 rounded-full border border-orange bg-orange/10 px-4 py-2 text-sm font-semibold text-orange transition-colors hover:bg-orange hover:text-white"
            >
              Searching: &ldquo;{query.trim()}&rdquo;
              <span className="text-base leading-none">×</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
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
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
