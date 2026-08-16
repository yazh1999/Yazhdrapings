import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Steps } from "@/components/home/Steps";
import { WhyHandSet } from "@/components/home/WhyHandSet";
import { ClosingCTA } from "@/components/home/ClosingCTA";

/**
 * Home — docs/03-pages-and-copy.md.
 *
 * Two sections from the spec are deliberately absent rather than faked:
 *
 *   Gallery preview  — content gate B1. Needs real photographs of real work.
 *                      Stock imagery is ruled out by the brief.
 *   Testimonials     — content gate B2. The three quotes in the spec are
 *                      invented. Publishing fabricated testimonials is
 *                      misleading advertising, so the section is cut until
 *                      real ones exist with written consent.
 *
 * Both slot back in without touching anything around them.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesPreview />
      <Steps />
      <WhyHandSet />
      <ClosingCTA />
    </>
  );
}
