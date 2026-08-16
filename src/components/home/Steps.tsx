import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

// Numbered 01–04, justified because it genuinely is a sequence.
const steps = [
  {
    n: "01",
    title: "Tell us",
    body: "Message on WhatsApp with the saree, the fabric, and the date you need it.",
  },
  {
    n: "02",
    title: "We collect",
    body: "Doorstep pickup anywhere in Chennai, or drop it at the studio.",
  },
  {
    n: "03",
    title: "We set",
    body: "Measured to your height, pleated by hand, pressed, left overnight to hold.",
  },
  {
    n: "04",
    title: "Back to you",
    body: "Folded in a garment bag, delivered to your door.",
  },
];

export function Steps() {
  return (
    <Section tone="sand">
      <Eyebrow tone="sand">How it works</Eyebrow>
      <h2 className="mt-6 max-w-[18ch] font-display text-display-md">
        Four steps, and one night.
      </h2>

      <ol className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.n} className="border-t border-gold pt-6">
            <span className="tabular block text-[2.75rem] leading-none text-gold">
              {step.n}
            </span>
            <h3 className="mt-5 text-title font-semibold text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-small text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
