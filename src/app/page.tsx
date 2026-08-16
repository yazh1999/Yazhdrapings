import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PleatDivider } from "@/components/ui/PleatDivider";
import { Section } from "@/components/ui/Section";
import { featuredServices } from "@/data/services";
import { stats } from "@/data/site";
import { formatPriceFrom } from "@/lib/utils";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

/**
 * CHECKPOINT 1 — foundation preview, not the real home page.
 *
 * Its job is to make the pleat gradient judgeable at the three sizes it has to
 * survive (full-bleed hero, 2px divider, 6px card strip) and to prove the chrome
 * works. Milestone 2 replaces this entirely with the real sections from
 * docs/03-pages-and-copy.md.
 */
export default function Home() {
  return (
    <>
      {/* Full-bleed pleat field. No photograph — the fold itself is the hero. */}
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
        <div className="pleat-fan" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-content px-6">
          <div className="max-w-[20ch] bg-ivory/85 p-6 backdrop-blur-[2px] sm:p-10">
            <Eyebrow>Chennai · Saree pre-pleating</Eyebrow>
            <h1 className="mt-6 font-display text-display-xl">
              Nine folds, set overnight.
            </h1>
          </div>
        </div>
      </section>

      <Section>
        <p className="max-w-prose text-body text-muted">
          Foundation preview. The tokens, fonts, primitives and chrome are in
          place. The pleat gradient appears below at the three sizes it has to
          work at — judge it here before Milestone 2 builds on it.
        </p>

        <div className="mt-12 space-y-4">
          <p className="text-eyebrow font-semibold uppercase text-muted">
            Divider — 2px at 30%
          </p>
          <PleatDivider />
        </div>

        <div className="mt-12 space-y-4">
          <p className="text-eyebrow font-semibold uppercase text-muted">
            Card strip — 6px
          </p>
          <div className="flex">
            <div className="pleats w-1.5 shrink-0" />
            <div className="flex-1 bg-sand p-6">
              <p className="text-small text-ink">
                The strip slides in from the left on hover. That is the entire
                interaction — no lift, no shadow, no scale.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <p className="text-eyebrow font-semibold uppercase text-muted">
            Full bleed
          </p>
          <div className="pleats h-32 w-full" />
        </div>
      </Section>

      {/* Trust strip — every number from site.stats, none typed here. */}
      <Section tone="sand">
        <Eyebrow tone="sand">Where we are</Eyebrow>
        <dl className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {[
            { value: `${stats.sareesPleated.toLocaleString("en-IN")}+`, label: "sarees pleated" },
            { value: `${stats.standardTurnaroundHours} hrs`, label: "standard turnaround" },
            { value: `${stats.handSetPct}%`, label: "hand-set" },
            { value: `₹0`, label: `pickup above ₹${stats.freePickupAbove}` },
          ].map((item) => (
            <div key={item.label}>
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="tabular block text-display-md text-rose">
                  {item.value}
                </span>
                <span className="mt-1 block text-small text-muted">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Prices from services.ts — never typed into JSX. */}
      <Section>
        <Eyebrow>What we do</Eyebrow>
        <h2 className="mt-6 font-display text-display-md">
          Everything between the fold and the front door.
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredServices.map((service) => (
            <li key={service.slug} className="flex bg-sand">
              <div className="w-1.5 shrink-0 bg-transparent transition-colors duration-240 ease-out group-hover:bg-rose" />
              <div className="p-6">
                <h3 className="text-title font-semibold">{service.name}</h3>
                <p className="mt-2 text-small text-muted">{service.summary}</p>
                <p className="tabular mt-4 text-numeric text-ink">
                  {formatPriceFrom(service.price)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="ink">
        <h2 className="font-display text-display-md">Send us your saree.</h2>
        <p className="mt-4 max-w-prose text-body text-ivory/80">
          Message us with a photo and the date you need it. We&apos;ll tell you
          the price and the day it comes back.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {hasWhatsApp() && (
            <Button href={buildWhatsAppUrl()} variant="whatsapp">
              Message on WhatsApp
            </Button>
          )}
          <Button href="/book">Book a pickup</Button>
        </div>
      </Section>
    </>
  );
}
