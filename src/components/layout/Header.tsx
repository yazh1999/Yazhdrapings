import Link from "next/link";
import { nav } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/40 bg-ivory/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-6 py-3">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small font-medium text-ink transition-colors duration-160 ease-out hover:text-rose"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/book" className="hidden lg:inline-flex">
            Book a pickup
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
