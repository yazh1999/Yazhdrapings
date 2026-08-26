import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PleatDivider } from "@/components/ui/PleatDivider";
import { Section } from "@/components/ui/Section";
import { sendInServices } from "@/data/services";
import { hasPublicAsset } from "@/lib/assets";
import { cn, formatExpress, formatTurnaround } from "@/lib/utils";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";
import Image from "next/image";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "What happens between drop-off and delivery: how a saree is logged on arrival, how height is measured, why it rests overnight, and how it is folded for return.",
  alternates: { canonical: "/how-it-works" },
};

/**
 * The small details are the point. docs/01-brief.md: specificity is the entire
 * trust strategy, and this page is where a first-timer decides whether handing
 * over an expensive saree feels safe.
 */
const steps = [
  {
    n: "01",
    title: "Tell us",
    image: "/assets/process/01-tell-us.webp",
    body: [
      "Message on WhatsApp with a photograph of the saree, the fabric, and the date you need it. A photograph is enough for us to tell you what it needs and what it costs — you do not have to know the difference between a fall and a pico.",
      "If the date is tight, say so in the first message. We will tell you honestly whether we can make it rather than accept it and hope.",
    ],
  },
  {
    n: "02",
    title: "We collect",
    image: "/assets/process/02-we-collect.webp",
    body: [
      "Doorstep pickup, or drop it at the studio if you are passing. Every saree is photographed the moment it arrives, logged against your name and number, and given a reference you can quote back to us.",
      "That arrival photograph is the record we both work from. If anything is already worn, frayed or marked, we tell you before we start rather than after.",
    ],
  },
  {
    n: "03",
    title: "We set",
    image: "/assets/process/03-we-set.webp",
    body: [
      "The saree is read first — weight, weave and drop — because those decide how it should be handled. Chiffon slips out of a pleat if it is pressed too hot; Kanjivaram holds a crease for months and punishes a wrong one.",
      "Pleats are measured to your height and your blouse-to-floor measurement, not to a standard. Then they are pressed, tacked at the waist, and left overnight so the fold sets rather than springs back.",
    ],
  },
  {
    n: "04",
    title: "Back to you",
    image: "/assets/process/04-back-to-you.webp",
    body: [
      "Folded along the set pleats so nothing is undone in transit, put into a garment bag, photographed again on dispatch, and delivered to your door.",
      "Payment is due then — UPI, cash, or bank transfer. Nothing is taken upfront.",
    ],
  },
];

function Plate({ src, alt }: { src: string; alt: string }) {
  if (hasPublicAsset(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={900}
        sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
        className="aspect-[4/3] w-full border border-gold/40 object-cover"
      />
    );
  }
  // TODO(B1): swaps to the real photograph automatically once the file lands.
  return (
    <div
      aria-hidden="true"
      className="pleats aspect-[4/3] w-full border border-gold/40"
    />
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <Section>
        <Eyebrow>How it works</Eyebrow>
        <h1 className="mt-6 max-w-[20ch] font-display text-display-lg">
          What happens between drop-off and delivery.
        </h1>
        <p className="mt-6 max-w-prose text-body text-muted">
          Four steps and one night. Here is all of it, including the parts most
          people never ask about.
        </p>
      </Section>

      <PleatDivider />

      <Section>
        <div className="space-y-16 md:space-y-24 lg:space-y-28">
          {steps.map((step, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={step.n}
                className="grid items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-16"
              >
                <div
                  className={cn("md:col-span-6 lg:col-span-5", flip && "md:order-2")}
                >
                  <span className="tabular block text-[clamp(2rem,5vw,2.75rem)] leading-none text-gold">
                    {step.n}
                  </span>
                  <h2 className="mt-5 font-display text-display-md">
                    {step.title}
                  </h2>
                  <div className="mt-5 space-y-4 text-body text-muted">
                    {step.body.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                </div>
                <div
                  className={cn("md:col-span-6 lg:col-span-7", flip && "md:order-1")}
                >
                  <Plate src={step.image} alt={`${step.title} — the process`} />
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <PleatDivider />

      <Section tone="sand">
        <h2 className="font-display text-display-md">Turnaround</h2>
        <p className="mt-5 max-w-prose text-small text-muted">
          Standard times, from the day the saree reaches us. Draping appointments
          are scheduled to the function rather than to a turnaround.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-gold">
                <th scope="col" className="py-3 pr-4 text-small font-semibold">
                  Service
                </th>
                <th scope="col" className="py-3 pr-4 text-small font-semibold">
                  Standard
                </th>
                <th scope="col" className="py-3 text-small font-semibold">
                  Express
                </th>
              </tr>
            </thead>
            <tbody>
              {sendInServices.map((s) => (
                <tr key={s.slug} className="border-b border-gold/40">
                  <th scope="row" className="py-4 pr-4 text-body font-normal">
                    {s.name}
                  </th>
                  <td className="tabular py-4 pr-4 text-small text-muted">
                    {formatTurnaround(s.turnaround.standardHours)}
                  </td>
                  <td className="tabular py-4 text-small text-muted">
                    {formatExpress(s.turnaround)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <div className="max-w-prose">
          <h2 className="font-display text-display-md">Ready when you are.</h2>
          <p className="mt-5 text-body text-muted">
            Send a photograph and the date. We&apos;ll tell you the price and the
            day it comes back.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/book">Book a pickup</Button>
            {hasWhatsApp() && (
              <Button
                href={buildWhatsAppUrl()}
                variant="secondary"
                data-analytics="whatsapp_click"
                data-analytics-location="how-it-works:closing"
              >
                Message on WhatsApp
              </Button>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
