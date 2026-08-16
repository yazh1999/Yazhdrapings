import { Button } from "@/components/ui/Button";
import { PleatDivider } from "@/components/ui/PleatDivider";
import { Section } from "@/components/ui/Section";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

export function ClosingCTA() {
  return (
    <>
      <PleatDivider />
      <Section tone="ink">
        <div className="max-w-[46ch]">
          <h2 className="font-display text-display-md">Send us your saree.</h2>
          <p className="mt-6 text-body text-ivory/80">
            Message us with a photo and the date you need it. We&apos;ll tell you
            the price and the day it comes back.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {hasWhatsApp() && (
              <Button
                href={buildWhatsAppUrl()}
                variant="whatsapp"
                data-analytics="whatsapp_click"
                data-analytics-location="home-closing-cta"
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
