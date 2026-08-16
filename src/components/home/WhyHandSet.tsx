import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

/**
 * The differentiator. Asymmetric by design — text at 5 of 12, plate at 7,
 * because a centred column all the way down is the template answer.
 *
 * TODO(B1): the plate is a pleat field until the photography lands. When it
 * does, this becomes a next/image of a close crop of the fold stack — see
 * public/assets/README.md. Deliberately not a labelled "image placeholder":
 * the motif reads as intentional, and stock photography is ruled out.
 */
export function WhyHandSet() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow>Why it matters</Eyebrow>

          <h2 className="mt-6 font-display text-display-md">
            A machine can fold. It cannot read a fabric.
          </h2>

          <div className="mt-8 space-y-5 text-body text-muted">
            <p>
              <em className="font-display italic text-ink">Organza</em> springs
              back. <em className="font-display italic text-ink">Kanjivaram</em>{" "}
              holds a crease for months and punishes a wrong one. Chiffon slips
              out of a pleat if it&apos;s pressed too hot.
            </p>
            <p>
              Every saree that comes in gets read first — weight, weave, drop —
              and then set to your height, not a standard.
            </p>
            <p className="text-ink">That&apos;s why we take a night over it.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="pleats aspect-[4/3] w-full border border-gold/40" />
        </div>
      </div>
    </Section>
  );
}
