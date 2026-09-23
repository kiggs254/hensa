"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

/**
 * Horizontal category strip that shows every item when they fit, and only
 * becomes scrollable once they don't. While scrollable it grows an arrow at
 * each end, but only on the side that can still move, so the first and last
 * items are never sitting under a button at rest.
 */
export default function CategoryStrip({
  children,
  ariaLabel,
  viewportRef,
  viewportClassName = "",
  arrowClassName = "top-12 sm:top-[3.25rem]",
  fitAlign = "justify-center",
}: {
  children: ReactNode;
  ariaLabel: string;
  /** optional: lets the parent keep its own handle on the scrolling element */
  viewportRef?: RefObject<HTMLDivElement | null>;
  viewportClassName?: string;
  /** vertical placement of the arrows, aligned to the avatar rather than the label */
  arrowClassName?: string;
  /** how the items sit while they all fit and nothing is scrolling */
  fitAlign?: "justify-center" | "justify-start";
}) {
  const inner = useRef<HTMLDivElement | null>(null);
  const [scrollable, setScrollable] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /**
   * Width of the items themselves, measured from the first and last flex
   * child rather than from scrollWidth. A hover popover is absolutely
   * positioned but still counts towards scrollWidth, so the last item's
   * popover would otherwise report ~64px of overflow that does not exist and
   * leave the strip permanently "scrollable" with a dead gap at the end.
   */
  const maxScrollOf = (el: HTMLElement) => {
    const kids = el.children;
    if (!kids.length) return 0;
    const first = kids[0].getBoundingClientRect();
    const last = kids[kids.length - 1].getBoundingClientRect();
    const cs = getComputedStyle(el);
    const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    return Math.max(0, last.right - first.left + pad - el.clientWidth);
  };

  const measure = useCallback(() => {
    const el = inner.current;
    if (!el) return;
    const max = maxScrollOf(el);
    setScrollable(max > 1);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const el = inner.current;
    // hand the scrolling element to the parent (child effects run first, so a
    // parent effect that wants to scroll a selected item into view sees it)
    if (viewportRef) viewportRef.current = el;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);
    window.addEventListener("resize", measure);
    // fonts land after first paint and change label widths, so re-measure then
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, children, viewportRef]);

  const nudge = (dir: 1 | -1) => {
    const el = inner.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = Math.max(180, el.clientWidth * 0.8);
    // clamp to the items' own extent, never into the popover's phantom overflow
    const left = Math.min(
      Math.max(0, el.scrollLeft + dir * step),
      maxScrollOf(el)
    );
    el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "absolute z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-cream/90 text-ink shadow-[0_6px_18px_rgba(28,26,22,0.14)] backdrop-blur transition-all hover:scale-105 hover:bg-ink hover:text-cream";
  const fade = "pointer-events-none absolute inset-y-0 z-20 w-12 sm:w-16";

  return (
    <div className="relative">
      <div
        ref={inner}
        onScroll={measure}
        aria-label={ariaLabel}
        className={`scrollbar-hide flex overflow-x-auto ${
          scrollable ? "justify-start" : fitAlign
        } ${viewportClassName}`}
      >
        {children}
      </div>

      {scrollable && !atStart && (
        <>
          <span
            aria-hidden
            className={`${fade} left-0 bg-gradient-to-r from-paper via-paper/85 to-transparent`}
          />
          <button
            type="button"
            aria-label="Show previous categories"
            onClick={() => nudge(-1)}
            className={`${arrow} ${arrowClassName} left-0`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {scrollable && !atEnd && (
        <>
          <span
            aria-hidden
            className={`${fade} right-0 bg-gradient-to-l from-paper via-paper/85 to-transparent`}
          />
          <button
            type="button"
            aria-label="Show more categories"
            onClick={() => nudge(1)}
            className={`${arrow} ${arrowClassName} right-0`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
