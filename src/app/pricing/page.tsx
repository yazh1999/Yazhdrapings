import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PleatDivider } from "@/components/ui/PleatDivider";
import { Section } from "@/components/ui/Section";
import { charges, drapingServices, sendInServices } from "@/data/services";
import { stats } from "@/data/site";
import { formatExpress, formatPrice, formatTurnaround } from "@/lib/utils";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";
import type { AppointmentService, SendInService } from "@/types";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "What saree pre-pleating, fall and pico, kuchu, ready-to-wear conversion and draping cost. No hidden charges — what you see is what you pay on delivery.",
  alternates: { canonical: "/pricing" },
};

/** Gold hairlines, mono prices, no zebra striping — docs/02-design-system.md. */
function SendInTable({ rows }: { rows: SendInService[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-gold">
            <th scope="col" className="py-3 pr-4 text-small font-semibold">
              Service
            </th>
            <th scope="col" className="py-3 pr-4 text-small font-semibold">
              Standard
            </th>
            <th scope="col" className="py-3 pr-4 text-small font-semibold">
              Express
            </th>
            <th scope="col" className="py-3 text-right text-small font-semibold">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.slug} className="border-b border-gold/40">
              <th scope="row" className="py-4 pr-4 text-body font-normal">
                {s.name}
              </th>
              <td className="tabular py-4 pr-4 text-small text-muted">
                {formatTurnaround(s.turnaround.standardHours)}
              </td>
              <td className="tabular py-4 pr-4 text-small text-muted">
                {formatExpress(s.turnaround)}
              </td>
              <td className="tabular py-4 text-right text-numeric">
                {formatPrice(s.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DrapingTable({ rows }: { rows: AppointmentService[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-gold">
            <th scope="col" className="py-3 pr-4 text-small font-semibold">
              Service
            </th>
            <th scope="col" className="py-3 pr-4 text-small font-semibold">
              Where
            </th>
            <th scope="col" className="py-3 text-right text-small font-semibold">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.slug} className="border-b border-gold/40">
              <th scope="row" className="py-4 pr-4 text-body font-normal">
                {s.name}
              </th>
              <td className="py-4 pr-4 text-small text-muted">{s.where}</td>
              <td className="tabular py-4 text-right text-numeric">
                {formatPrice(s.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <Section>
        <Eyebrow>Pricing</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] font-display text-display-lg">
          Prices, in full.
        </h1>
        <p className="mt-6 max-w-prose text-body text-muted">
          No hidden charges. What you see is what you pay on delivery, and
          nothing is due until the saree is back with you.
        </p>
      </Section>

      <PleatDivider />

      <Section>
        <h2 className="font-display text-display-md">Draping, by appointment</h2>
        <p className="mt-5 max-w-prose text-small text-muted">
          Draping is quoted on the number of people, the venue and the date, so
          it is priced per booking rather than from a card. Message us with the
          function date and we&apos;ll give you a figure the same day.
        </p>
        <div className="mt-10">
          <DrapingTable rows={drapingServices} />
        </div>
      </Section>

      <Section tone="sand">
        <h2 className="font-display text-display-md">Sent to us</h2>
        <div className="mt-10">
          <SendInTable rows={sendInServices} />
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-display-md">Collection and delivery</h2>
        <div className="mt-10 max-w-2xl space-y-px bg-gold/40">
          {charges.map((c) => (
            <div
              key={c.slug}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 bg-ivory py-4"
            >
              <div>
                <p className="text-body">{c.name}</p>
                <p className="text-small text-muted">{c.appliesTo}</p>
              </div>
              <p className="tabular text-numeric">
                {c.price.note ?? formatPrice(c.price)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <PleatDivider />

      <Section tone="sand">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h2 className="font-display text-display-md">Included</h2>
            <p className="mt-5 text-small text-muted">
              Collection, hand-setting, a steam press, a garment bag, and
              delivery back to your door. Pickup is free above{" "}
              <span className="tabular text-ink">₹{stats.freePickupAbove}</span>.
            </p>
          </div>
          <div>
            <h2 className="font-display text-display-md">Extra</h2>
            <p className="mt-5 text-small text-muted">
              Same-day service, courier outside the local area at actuals, and
              kuchu beadwork beyond the standard set.
            </p>
          </div>
          <div>
            <h2 className="font-display text-display-md">Payment</h2>
            <p className="mt-5 text-small text-muted">
              UPI, cash on delivery, or bank transfer. Nothing due until the
              saree is back with you.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-prose">
          <h2 className="font-display text-display-md">
            Not sure which one you need?
          </h2>
          <p className="mt-5 text-body text-muted">
            Send a photograph of the saree and the date you need it. We&apos;ll
            tell you what it needs and what it costs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {hasWhatsApp() && (
              <Button
                href={buildWhatsAppUrl("pricing")}
                variant="whatsapp"
                data-analytics="whatsapp_click"
                data-analytics-location="pricing:closing"
              >
                Message on WhatsApp
              </Button>
            )}
            <Button href="/book">Book a pickup</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
