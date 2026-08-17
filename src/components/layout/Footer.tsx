import Link from "next/link";
import { contact, footerLegal, nav, site } from "@/data/site";
import { services } from "@/data/services";
import { PleatDivider } from "@/components/ui/PleatDivider";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <PleatDivider className="opacity-60" />

      <div className="mx-auto w-full max-w-content px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* 1 — Wordmark and the one line. */}
          <div>
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
          <nav aria-label="Services">
            <h2 className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold">
              Services
            </h2>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="text-small text-ivory/80 transition-colors duration-160 ease-out hover:text-gold"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3 — Contact. NAP must match Google Business Profile exactly. */}
          <div>
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
                    className="tabular transition-colors duration-160 ease-out hover:text-gold"
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
          <div>
            <h2 className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-gold">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-2">
              {contact.instagram && (
                <li>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-small text-ivory/80 transition-colors duration-160 ease-out hover:text-gold"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-small text-ivory/80 transition-colors duration-160 ease-out hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* A line of pleat gradient across the full width above the copyright. */}
      <PleatDivider className="opacity-60" />

      <div className="mx-auto flex w-full max-w-content flex-col gap-4 px-6 py-6 pb-24 text-small text-ivory/60 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
        <p>
          &copy; {year} {site.name}. Made in {site.address.locality}.
        </p>
        <ul className="flex flex-wrap gap-6">
          {footerLegal.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition-colors duration-160 ease-out hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
