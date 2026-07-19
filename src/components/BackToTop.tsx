"use client";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Back to top"
      className="group flex items-center gap-2.5 text-xs font-semibold text-cream/50 transition-colors hover:text-orange"
    >
      {/* registration target */}
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 transition-colors group-hover:border-orange">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 1v22M1 12h22" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
      Back to top
    </button>
  );
}
