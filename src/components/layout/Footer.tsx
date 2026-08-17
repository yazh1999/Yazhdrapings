import Link from "next/link";
import { contact, footerLegal, nav, site } from "@/data/site";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { PleatDivider } from "@/components/ui/PleatDivider";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <PleatDivider className="opacity-60" />

      <Container className="py-14 md:py-16">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-10">
          {/* 1 — Wordmark and the one line. */}
          <div className="lg:col-span-3">
            <p className="font-display text-[1.6rem] leading-none">{site.name}</p>
            <p
              aria-hidden="true"
              className="mt-1 font-tamil text-[1.05rem] leading-none text-gold"
            >
              {site.tamilName}
            </p>
            <p className="mt-4 max-w-[26ch] text-small text-ivory/70">
              {site.tagline}
            </p>
          </div>

          {/* 2 — Services. */}
          <nav aria-label="Services" className="lg:col-span-4">
            <h2 className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold">
              Services
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 sm:grid-cols-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="flex min-h-11 items-center text-small text-ivory/80 transition-colors duration-160 ease-out hover:text-gold"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3 — Contact. NAP must match Google Business Profile exactly. */}
          <div className="lg:col-span-3">
            <h2 className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold">
              Contact
            </h2>
            <address className="mt-4 space-y-2 not-italic text-small text-ivory/80">
              <p>
                {site.address.street}
                <br />
                {site.address.locality}
                <br />
                {site.address.region} {site.address.postalCode}
              </p>
              {contact.phone && (
                <p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="tabular relative inline-flex items-center transition-colors duration-160 ease-out after:absolute after:left-0 after:top-1/2 after:h-11 after:w-full after:-translate-y-1/2 after:content-[''] hover:text-gold"
                  >
                    {contact.phone}
                  </a>
                </p>
              )}
              <p>{site.hours.weekdays}</p>
              <p>{site.hours.sunday}</p>
            </address>
          </div>

          {/* 4 — Elsewhere. */}
          <div className="lg:col-span-2">
            <h2 className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold">
              Elsewhere
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 sm:grid-cols-1">
              {contact.instagram && (
                <li>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center text-small text-ivory/80 transition-colors duration-160 ease-out hover:text-gold"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center text-small text-ivory/80 transition-colors duration-160 ease-out hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* A line of pleat gradient across the full width above the copyright. */}
      <PleatDivider className="opacity-60" />

      <Container className="flex flex-col gap-4 py-6 pb-24 text-small text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {site.name}. Made in {site.address.locality}.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {footerLegal.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center transition-colors duration-160 ease-out hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
