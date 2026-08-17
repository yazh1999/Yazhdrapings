"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on navigation, or the overlay survives the route change. Adjusting
  // state during render rather than in an effect: this is the pattern React
  // sanctions for state derived from a changing value, it avoids the cascading
  // re-render an effect would cause, and unlike an onClick on each link it also
  // covers browser back/forward while the menu is open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Lock scroll behind the full-screen overlay.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Esc closes and returns focus to the trigger.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Move focus into the panel so the keyboard path does not fall behind it.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="flex size-11 items-center justify-center rounded-fold"
      >
        <span className="sr-only">Open menu</span>
        <span aria-hidden="true" className="flex flex-col gap-1.5">
          <span className="block h-px w-6 bg-ink" />
          <span className="block h-px w-6 bg-ink" />
          <span className="block h-px w-6 bg-ink" />
        </span>
      </button>

      {open &&
        /**
         * Rendered into document.body, not in place.
         *
         * The header carries `backdrop-blur-sm`, and backdrop-filter creates a
         * containing block for fixed-position descendants — exactly like
         * transform does. So `fixed inset-0` on a panel nested inside the header
         * resolved against the header's own 72px box, not the viewport: the
         * "full-screen" overlay rendered as a 72px scrolling strip and the CTAs
         * were unreachable. Measured 72px inside the header vs 360px in body.
         *
         * Portalling fixes it without giving up the header blur. No mounted
         * guard is needed: `open` starts false, so this branch — and the
         * reference to document.body — is never evaluated during SSR.
         */
        createPortal(
          <div
            id="mobile-nav"
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ivory px-5 py-5 sm:px-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[1.5rem]">Menu</span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="flex size-11 items-center justify-center rounded-fold text-ink"
              >
                <span className="sr-only">Close menu</span>
                <span aria-hidden="true" className="text-2xl leading-none">
                  &times;
                </span>
              </button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col gap-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center font-display text-display-md text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 flex-col gap-3 pb-6">
              <Button href="/book">Book a pickup</Button>
              {hasWhatsApp() && (
                <Button href={buildWhatsAppUrl()} variant="whatsapp">
                  Message on WhatsApp
                </Button>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
