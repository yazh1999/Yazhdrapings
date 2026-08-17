import Link from "next/link";
import { nav } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/40 bg-ivory/95 backdrop-blur-sm">
      <Container className="flex items-center justify-between py-3 lg:py-4">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-5 md:flex lg:gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center text-small font-medium text-ink transition-colors duration-160 ease-out hover:text-rose"
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
      </Container>
    </header>
  );
}
