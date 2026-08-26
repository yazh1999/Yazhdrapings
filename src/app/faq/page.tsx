import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { faqs } from "@/data/faqs";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "How long pleats hold, what happens if a saree is damaged, how pleat length is measured, same-day service, and how to pay.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  // Mirrors the visible copy exactly. Structured data that disagrees with the
  // page is a manual-action risk, so both render from the same array.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Eyebrow>Questions</Eyebrow>
      <h1 className="mt-6 max-w-[18ch] font-display text-display-lg">
        Questions, answered.
      </h1>

      {/* Native <details>. No JS, and it works before hydration. */}
      <div className="mt-14 max-w-prose border-t border-gold/40">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-gold/40">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-body font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden="true"
                className="shrink-0 text-2xl leading-none text-rose transition-transform duration-200 ease-out group-open:rotate-90"
              >
                &rsaquo;
              </span>
            </summary>
            <p className="pb-5 text-body text-muted">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-14 max-w-prose">
        <p className="text-body text-muted">
          Something not covered here? Ask us directly — we answer during working
          hours.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {hasWhatsApp() && (
            <Button
              href={buildWhatsAppUrl("a question")}
              variant="whatsapp"
              data-analytics="whatsapp_click"
              data-analytics-location="faq:closing"
            >
              Ask on WhatsApp
            </Button>
          )}
          <Button href="/contact" variant="secondary">
            Contact details
          </Button>
        </div>
      </div>
    </Section>
  );
}
