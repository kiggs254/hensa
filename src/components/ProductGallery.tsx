"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Product photos: one large image plus a thumbnail per photo. Every photo is in
 * the server HTML (with its alt text), so Google Images can index all of them;
 * picking a thumbnail just swaps the large one.
 */
export default function ProductGallery({
  images,
  name,
  badge,
}: {
  images: { url: string; alt: string }[];
  name: string;
  badge?: string;
}) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : [];
  const current = list[active] ?? list[0];

  return (
    <div>
      <div className="cropmarks relative border border-ink/10 bg-white p-3">
        <div className="relative aspect-square overflow-hidden">
          {current && (
            <Image
              key={current.url}
              src={current.url}
              alt={current.alt || name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority={active === 0}
            />
          )}
        </div>
        {badge && (
          <span className="spec absolute left-6 top-6 bg-ink/85 px-2.5 py-1.5 text-cream backdrop-blur">{badge}</span>
        )}
      </div>

      {list.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6" aria-label={`${name} photos`}>
          {list.map((img, i) => (
            <li key={img.url}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1} of ${list.length}`}
                aria-current={i === active ? "true" : undefined}
                className={`relative block aspect-square w-full overflow-hidden rounded-lg border bg-white transition-all ${
                  i === active ? "border-orange ring-2 ring-orange/40" : "border-ink/10 hover:border-orange/60"
                }`}
              >
                <Image src={img.url} alt={img.alt || `${name}, photo ${i + 1}`} fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
