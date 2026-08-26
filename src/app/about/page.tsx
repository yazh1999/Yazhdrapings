import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PleatDivider } from "@/components/ui/PleatDivider";
import { Section } from "@/components/ui/Section";
import { site, stats } from "@/data/site";
import { hasPublicAsset } from "@/lib/assets";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About",
  description: `Named for the yazh, the old Tamil harp. Saree draping and hand pre-pleating in ${site.address.locality}, ${site.address.region}.`,
  alternates: { canonical: "/about" },
};

const FOUNDER_IMAGE = "/assets/studio/founder.webp";
const STUDIO_IMAGE = "/assets/studio/studio.webp";

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
  // TODO(B4): founder and studio photographs. Swaps automatically on next build.
  return (
    <div
      aria-hidden="true"
      className="pleats aspect-[4/3] w-full border border-gold/40"
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <Section>
        <Eyebrow>{site.tamilName}</Eyebrow>
        <h1 className="mt-6 max-w-[16ch] font-display text-display-lg">
          Named for a harp.
        </h1>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="md:col-span-6 lg:col-span-5">
            <div className="space-y-5 text-body text-muted">
              <p>
                The <em className="font-display italic text-ink">yazh</em> is an
                old Tamil instrument — a frame strung with parallel lines, each
                one tuned by hand. Set a saree well and it looks the same way:
                nine folds, evenly spaced, catching the light on one edge and
                shadow on the other.
              </p>
              <p>
                {/* PLACEHOLDER — year, neighbourhood and the founding story must
                    come from the client. Content gate B4. */}
                We started in [year] in {site.address.locality}, pleating for
                family before it became a business. We still set every saree by
                hand, still read the fabric before we touch it, and still call
                you if something needs a decision.
              </p>
              <p className="text-ink">
                {stats.sareesPleated.toLocaleString("en-IN")}+ sarees later,
                that has not changed.
              </p>
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-7">
            <Plate src={FOUNDER_IMAGE} alt="The founder at work" />
          </div>
        </div>
      </Section>

      <PleatDivider />

      {/* docs/03-pages-and-copy.md: "This paragraph closes more bridal orders
          than anything else on the site. Do not skip it." */}
      <Section tone="sand">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="md:col-span-6 lg:col-span-7 md:order-2">
            <Plate src={STUDIO_IMAGE} alt="The studio" />
          </div>

          <div className="md:col-span-6 lg:col-span-5 md:order-1">
            <Eyebrow tone="sand">Care</Eyebrow>
            <h2 className="mt-6 font-display text-display-md">
              What happens to your saree while it is with us.
            </h2>
            <div className="mt-6 space-y-5 text-body text-muted">
              <p>
                Every saree is photographed the moment it arrives and again on
                dispatch, and logged against your name and number. If anything
                is already worn or marked, we tell you before we start.
              </p>
              <p>
                {/* PLACEHOLDER — the insurance arrangement, its limit and the
                    declared-value process for a high-value bridal saree must be
                    confirmed in writing with the client. Content gate B3. */}
                If we damage a saree, we cover repair or replacement. The full
                terms, the declared-value process for a bridal saree, and what
                counts as damage rather than fabric behaviour are on the care
                policy.
              </p>
            </div>
            <Button href="/care-policy" variant="secondary" className="mt-8">
              Read the care policy
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-prose">
          <h2 className="font-display text-display-md">Come and talk to us.</h2>
          <p className="mt-5 text-body text-muted">
            The studio is at {site.address.street}, {site.address.locality}.
            Message first if you are coming with a bridal saree — we will set
            aside the time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {hasWhatsApp() && (
              <Button
                href={buildWhatsAppUrl()}
                variant="whatsapp"
                data-analytics="whatsapp_click"
                data-analytics-location="about:closing"
              >
                Message on WhatsApp
              </Button>
            )}
            <Button href="/contact" variant="secondary">
              Contact and hours
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
