"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/types";
import { galleryCategories } from "@/data/gallery";
import { cn } from "@/lib/utils";

/**
 * Filter chips, masonry grid and lightbox in one client component.
 *
 * They are together rather than split three ways because they share one piece
 * of state — the filtered list — and splitting it would mean lifting that state
 * into a fourth component that does nothing else.
 */
export function GalleryBrowser({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const visible =
    category === "all" ? items : items.filter((i) => i.category === category);

  // Esc closes, arrows move. Focus returns to the thumbnail that opened it.
  useEffect(() => {
    if (openIndex === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenIndex(null);
        lastTrigger.current?.focus();
      }
      if (e.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? null : (i + 1) % visible.length));
      }
      if (e.key === "ArrowLeft") {
        setOpenIndex((i) =>
          i === null ? null : (i - 1 + visible.length) % visible.length,
        );
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, visible.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [openIndex]);

  const open = openIndex !== null ? visible[openIndex] : null;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {galleryCategories.map((c) => {
          const active = category === c.value;
          const count =
            c.value === "all"
              ? items.length
              : items.filter((i) => i.category === c.value).length;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => {
                setCategory(c.value);
                setOpenIndex(null);
              }}
              aria-pressed={active}
              disabled={count === 0 && c.value !== "all"}
              className={cn(
                "inline-flex min-h-11 items-center rounded-button border px-5 text-small font-semibold transition-colors duration-160 ease-out",
                active
                  ? "border-rose bg-rose text-ivory"
                  : "border-gold bg-transparent text-ink hover:bg-sand",
                "disabled:cursor-not-allowed disabled:opacity-45",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 max-w-prose text-body text-muted">
          No work in this category yet. Try{" "}
          <button
            type="button"
            onClick={() => setCategory("silk")}
            className="font-display italic text-rose underline-offset-4 hover:underline"
          >
            Silk
          </button>{" "}
          or{" "}
          <button
            type="button"
            onClick={() => setCategory("cotton")}
            className="font-display italic text-rose underline-offset-4 hover:underline"
          >
            Cotton
          </button>
          .
        </p>
      ) : (
        // CSS columns give masonry without a layout library. Each item is
        // break-inside-avoid so a card never splits across a column.
        <div className="mt-12 columns-2 gap-4 lg:columns-3 lg:gap-6">
          {visible.map((item, i) => (
            <figure key={item.id} className="mb-4 break-inside-avoid lg:mb-6">
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setOpenIndex(i);
                }}
                className="block w-full cursor-zoom-in"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="w-full border border-gold/40"
                />
              </button>
              <figcaption className="tabular mt-2 text-small text-muted">
                {item.fabric}
                {item.pleatCount ? ` · ${item.pleatCount} pleats` : ""} ·{" "}
                {item.service}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {open && (
        <div
          ref={dialogRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={open.alt}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/95 p-4"
          onClick={() => {
            setOpenIndex(null);
            lastTrigger.current?.focus();
          }}
        >
          <button
            type="button"
            onClick={() => {
              setOpenIndex(null);
              lastTrigger.current?.focus();
            }}
            className="absolute right-4 top-4 flex size-11 items-center justify-center text-2xl text-ivory"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden="true">&times;</span>
          </button>

          <Image
            src={open.src}
            alt={open.alt}
            width={open.width}
            height={open.height}
            sizes="90vw"
            className="max-h-[80svh] w-auto max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="tabular mt-4 text-center text-small text-ivory/80">
            {open.fabric}
            {open.pleatCount ? ` · ${open.pleatCount} pleats` : ""} ·{" "}
            {open.service}
          </p>
        </div>
      )}
    </div>
  );
}
