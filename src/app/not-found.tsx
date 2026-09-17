import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center">
      <p className="spec text-orange">Error 404 · Misprint</p>
      <h1 className="font-display mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
        This page didn&apos;t make it off the press.
      </h1>
      <p className="mt-5 max-w-md text-ink-soft">
        The page you&apos;re looking for was moved, renamed or never printed.
        The catalogue, however, is very much alive.
      </p>
      <Link
        href="/catalog"
        className="group mt-9 flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-display font-bold text-cream transition-all hover:-translate-y-0.5 hover:bg-orange"
      >
        Back to the catalog
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
