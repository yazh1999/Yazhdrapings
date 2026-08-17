import type { Metadata } from "next";
import { ServiceBlock } from "@/components/services/ServiceBlock";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PleatDivider } from "@/components/ui/PleatDivider";
import { Section } from "@/components/ui/Section";
import { drapingServices, sendInServices, services } from "@/data/services";
import { site } from "@/data/site";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bridal, wedding, reception and party saree draping by appointment, plus hand pre-pleating, fall & pico, kuchu and ready-to-wear conversion.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Section>
        <Eyebrow>What we do</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] font-display text-display-lg">
          What we do.
        </h1>
        {/* Derived, never typed. Adding a service must not leave a stale count. */}
        <p className="mt-6 max-w-prose text-body text-muted">
          {services.length} services, two ways of working. We come to you and
          drape on the day, or you send the saree over and it comes back set.
          All of it by hand.
        </p>
      </Section>

      <PleatDivider />

      {/* Draping first — the logo leads with it, and a bridal booking is worth
          many times a pleating job. */}
      <Section>
        <Eyebrow>Draped on the day</Eyebrow>
        <h2 className="mt-6 max-w-[24ch] font-display text-display-md">
          We come to you, and we allow enough time.
        </h2>

        <div className="mt-10 space-y-16 md:mt-16 md:space-y-24 lg:space-y-28">
          {drapingServices.map((service, i) => (
            <ServiceBlock
              key={service.slug}
              service={service}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </Section>

      <PleatDivider />

      <Section tone="sand">
        <Eyebrow tone="sand">Sent to us, set and returned</Eyebrow>
        <h2 className="mt-6 max-w-[24ch] font-display text-display-md">
          Leave it with us overnight.
        </h2>

        <div className="mt-10 space-y-16 md:mt-16 md:space-y-24 lg:space-y-28">
          {sendInServices.map((service, i) => (
            <ServiceBlock
              key={service.slug}
              service={service}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </Section>

      <PleatDivider />

      <Section>
        <div className="max-w-prose">
          <h2 className="font-display text-display-md">
            Not sure what your saree needs?
          </h2>
          <p className="mt-5 text-body text-muted">
            Send a photograph on WhatsApp with the date you need it. We&apos;ll
            tell you what it needs, what it costs, and the day it comes back.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {hasWhatsApp() && (
              <Button
                href={buildWhatsAppUrl()}
                variant="whatsapp"
                data-analytics="whatsapp_click"
                data-analytics-location="services:closing"
              >
                Message on WhatsApp
              </Button>
            )}
            <Button href="/pricing" variant="secondary">
              See the price card
            </Button>
          </div>
          <p className="mt-8 text-small text-muted">
            {site.hours.weekdays} · {site.hours.sunday}
          </p>
        </div>
      </Section>
    </>
  );
}
