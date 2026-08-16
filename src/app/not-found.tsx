import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PleatDivider } from "@/components/ui/PleatDivider";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section>
      <div className="max-w-prose">
        <p className="tabular text-numeric text-muted">404</p>
        <h1 className="mt-4 font-display text-display-lg">
          This fold does not exist.
        </h1>
        <PleatDivider className="my-8" />
        <p className="text-body text-muted">
          The page you were looking for has moved or was never here. The work is
          all still on the site — start from the beginning.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back to the start</Button>
          <Button href="/services" variant="secondary">
            See our services
          </Button>
        </div>
      </div>
    </Section>
  );
}
