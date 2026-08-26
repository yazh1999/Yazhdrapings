import type { Metadata } from "next";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { gallery } from "@/data/gallery";
import { stats } from "@/data/site";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Finished saree work — hand-set pleats, fall and pico, kuchu tassels and bridal draping. Filter by fabric.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <Section>
        <Eyebrow>Our work</Eyebrow>
        {/* Interpolated, not spelled out, so it can never drift from the trust
            strip the way "two thousand" vs 2,400+ did in the first draft. */}
        <h1 className="mt-6 max-w-[18ch] font-display text-display-lg">
          {stats.sareesPleated.toLocaleString("en-IN")} sarees, and counting.
        </h1>
        <p className="mt-6 max-w-prose text-body text-muted">
          Every photograph here is work that left this studio. Nothing is stock,
          and nothing is borrowed.
        </p>

        <div className="mt-14">
          <GalleryBrowser items={gallery} />
        </div>
      </Section>

      {gallery.length === 0 && (
        <Section tone="sand">
          <div className="max-w-prose">
            <h2 className="font-display text-display-md">
              The photographs are being shot.
            </h2>
            <p className="mt-5 text-body text-muted">
              Rather than fill this page with stock imagery of sarees we never
              touched, it stays empty until there are real photographs of real
              work. In the meantime, ask and we&apos;ll send you pictures of
              recent jobs on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {hasWhatsApp() && (
                <Button
                  href={buildWhatsAppUrl("recent work")}
                  variant="whatsapp"
                  data-analytics="whatsapp_click"
                  data-analytics-location="gallery:empty"
                >
                  Ask to see recent work
                </Button>
              )}
              <Button href="/services" variant="secondary">
                See what we do
              </Button>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
