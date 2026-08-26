import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

/**
 * Shared chrome for /privacy, /terms and /care-policy.
 *
 * `lastUpdated` is prominent on purpose: a policy with no date is worth very
 * little, and the DPDP Act expects a notice a person can actually evaluate.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <Section>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-6 max-w-[20ch] font-display text-display-lg">{title}</h1>
      <p className="mt-6 max-w-prose text-body text-muted">{intro}</p>
      <p className="tabular mt-4 text-small text-muted">
        Last updated: {lastUpdated}
      </p>

      <div className="mt-14 max-w-prose space-y-10">{children}</div>
    </Section>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-display-md">{heading}</h2>
      <div className="mt-5 space-y-4 text-body text-muted">{children}</div>
    </section>
  );
}

/**
 * Visible, deliberately. These pages state obligations the business has to
 * honour, and an unresolved placeholder must be impossible to miss in review —
 * not a comment only a developer sees.
 */
export function Unconfirmed({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-rose bg-sand px-4 py-3 text-small text-ink">
      <strong className="font-semibold">To confirm before launch —</strong>{" "}
      {children}
    </p>
  );
}
