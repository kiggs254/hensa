import Link from "next/link";
import Image from "next/image";
import { type Product } from "@/lib/catalog";
import { site } from "@/lib/site";
import EnquireButton from "@/components/EnquireButton";
import { WhatsAppIcon, ArrowIcon } from "@/components/icons";

export default function ProductCard({ product }: { product: Product }) {
  // the specific tag ("Notebooks", "Pop Up Banner") is more useful than the
  // broad category, falling back to the product's top-level category name
  const subtitle = product.tags[0] ?? product.categoryName;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_24px_50px_rgba(28,26,22,0.16)]">
      <Link href={`/product/${product.slug}`} className="block p-2.5">
        {/* square frame: source photos are square, so nothing gets cropped —
            a landscape frame clips apparel (hoods, hems) badly */}
        <span className="relative block aspect-square overflow-hidden rounded-xl bg-white">
          <Image
            src={product.localImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
          {product.onSale && (
            <span className="spec absolute right-2 top-2 rounded-full bg-orange px-2 py-0.5 text-[9px] font-bold text-white">
              Sale
            </span>
          )}
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-1.5">
        <Link href={`/product/${product.slug}`} className="flex-1">
          <h3 className="font-display flex items-start gap-1.5 text-[15px] font-bold leading-snug tracking-tight transition-colors group-hover:text-orange sm:text-[17px]">
            <span className="line-clamp-2">{product.name}</span>
            <ArrowIcon className="mt-[3px] h-3.5 w-3.5 flex-none -rotate-45 text-ink-soft/40 transition-all group-hover:translate-x-0.5 group-hover:text-orange sm:mt-1" />
          </h3>
          {subtitle && (
            <p className="spec mt-1.5 text-[9px] text-ink-soft/70">{subtitle}</p>
          )}
        </Link>

        <EnquireButton
          payload={{
            productName: product.name,
            productUrl: `${site.url}/product/${product.slug}`,
          }}
          className="mt-3.5 flex items-center justify-center gap-1.5 self-start whitespace-nowrap rounded-full border border-green/50 px-3.5 py-1.5 text-xs font-semibold text-green-deep transition-all hover:border-green hover:bg-green hover:text-white active:scale-95"
        >
          <WhatsAppIcon className="h-3.5 w-3.5 flex-none" />
          <span className="sm:hidden">Enquire</span>
          <span className="hidden sm:inline">Enquire on WhatsApp</span>
        </EnquireButton>
      </div>
    </article>
  );
}
