"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { PleatDivider } from "@/components/ui/PleatDivider";
import { Section } from "@/components/ui/Section";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

/**
 * The App Router requires this to be a Client Component. Static pleat field
 * rather than the animation — an error state is not the moment for motion.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in Vercel logs with the digest, which is the only handle we get
    // on a production error.
    console.error("route error", error);
  }, [error]);

  return (
    <Section>
      <div className="max-w-prose">
        <p className="tabular text-numeric text-muted">Error</p>
        <h1 className="mt-4 font-display text-display-lg">
          Something came apart.
        </h1>
        <PleatDivider className="my-8" />
        <p className="text-body text-muted">
          This page did not load. Try it again — and if you were in the middle of
          booking, message us instead. We will pick it up from there.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          {hasWhatsApp() && (
            <Button href={buildWhatsAppUrl()} variant="whatsapp">
              Message on WhatsApp
            </Button>
          )}
        </div>
        {error.digest && (
          <p className="tabular mt-8 text-small text-muted">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </Section>
  );
}
