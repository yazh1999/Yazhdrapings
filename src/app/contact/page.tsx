import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PleatDivider } from "@/components/ui/PleatDivider";
import { Section } from "@/components/ui/Section";
import { contact, site } from "@/data/site";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: `Saree draping and pre-pleating in ${site.address.locality}. Phone, WhatsApp, studio address and opening hours.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapsQuery = encodeURIComponent(
    `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}`,
  );

  return (
    <>
      <Section>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-6 max-w-[18ch] font-display text-display-lg">
          Come and find us.
        </h1>
        <p className="mt-6 max-w-prose text-body text-muted">
          WhatsApp is the fastest way to reach us, and it is where bookings get
          confirmed. Call if you would rather talk it through.
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="md:col-span-5">
            <h2 className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-rose">
              Studio
            </h2>
            <address className="mt-4 space-y-1 not-italic text-body text-ink">
              <p>{site.address.street}</p>
              <p>{site.address.locality}</p>
              <p>
                {site.address.region}{" "}
                <span className="tabular">{site.address.postalCode}</span>
              </p>
            </address>

            <h2 className="mt-10 text-eyebrow font-semibold uppercase tracking-[0.18em] text-rose">
              Hours
            </h2>
            <p className="mt-4 text-body text-ink">{site.hours.weekdays}</p>
            <p className="text-body text-muted">{site.hours.sunday}</p>

            <h2 className="mt-10 text-eyebrow font-semibold uppercase tracking-[0.18em] text-rose">
              Phone
            </h2>
            {contact.phone ? (
              <p className="mt-4">
                <a
                  href={`tel:${contact.phone}`}
                  className="tabular relative inline-flex min-h-11 items-center text-body text-ink underline-offset-4 hover:underline"
                >
                  {contact.phone}
                </a>
              </p>
            ) : (
              <p className="mt-4 text-small text-muted">
                Phone number not configured.
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              {hasWhatsApp() && (
                <Button
                  href={buildWhatsAppUrl()}
                  variant="whatsapp"
                  data-analytics="whatsapp_click"
                  data-analytics-location="contact:primary"
                >
                  Message on WhatsApp
                </Button>
              )}
              <Button href="/book" variant="secondary">
                Book a pickup
              </Button>
            </div>
          </div>

          <div className="md:col-span-7">
            {/* No API key needed for the embed form, and it degrades to a link
                if the iframe is blocked. */}
            <iframe
              title={`Map to ${site.name}`}
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full border border-gold/40"
            />
            <p className="mt-3 text-small text-muted">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex min-h-11 items-center font-semibold text-rose underline-offset-4 hover:underline"
              >
                Open in Google Maps &rarr;
              </a>
            </p>
          </div>
        </div>
      </Section>

      <PleatDivider />

      <Section tone="sand">
        <div className="max-w-prose">
          <h2 className="font-display text-display-md">
            Sending a saree from further away?
          </h2>
          <p className="mt-5 text-body text-muted">
            We take sarees by insured courier from anywhere in {site.address.region}.
            Message us first and we&apos;ll tell you how to pack it and what the
            courier costs both ways.
          </p>
        </div>
      </Section>
    </>
  );
}
