import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import {
  LegalPage,
  LegalSection,
  Unconfirmed,
} from "@/components/ui/LegalPage";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Care policy",
  description:
    "How your saree is handled, photographed and protected while it is with us — and exactly what happens if something goes wrong.",
  alternates: { canonical: "/care-policy" },
  robots: { index: true, follow: true },
};

/**
 * The most commercially valuable of the three. docs/01-brief.md ranks proof of
 * care as the second priority on the whole site, and /about links here rather
 * than repeating it.
 */
export default function CarePolicyPage() {
  return (
    <LegalPage
      eyebrow="Care policy"
      title="Your saree, while it is with us."
      intro="Handing an expensive saree to someone you have not met takes trust. This page says exactly how it is handled, what is covered, and what happens if something goes wrong."
      lastUpdated="[DATE — set when this is signed off]"
    >
      <Unconfirmed>
        every number and promise on this page is a commitment the business has
        to honour. Write it with the client, get sign-off in writing, and keep
        the site copy and their real practice identical.
      </Unconfirmed>

      <LegalSection heading="On arrival">
        <p>
          Every saree is photographed the moment it reaches us and logged against
          your name, your number and an order reference. If it arrives with
          existing wear, fraying, staining or a weak seam, we photograph that too
          and tell you before we start any work.
        </p>
        <p>
          That arrival photograph is the record we both work from. You can ask
          for a copy at any time.
        </p>
      </LegalSection>

      <LegalSection heading="While we work">
        <p>
          Sarees are kept flat or hung, away from direct sun, and never stacked
          under heavier fabric. Silk and tissue are handled on a separate table
          from cotton. Nothing is left in the studio overnight unattended beyond
          the resting period the pleats need.
        </p>
      </LegalSection>

      <LegalSection heading="On dispatch">
        <p>
          Photographed again, folded along the set pleats, and placed in a
          garment bag. The dispatch photograph is what shows the condition the
          saree left in.
        </p>
      </LegalSection>

      <LegalSection heading="If we damage your saree">
        <p>
          If damage happens while the saree is in our care, we cover repair, or
          replacement where repair is not possible.
        </p>
        <Unconfirmed>
          state the actual arrangement: is there an insurance policy, who
          underwrites it, and what is the per-saree limit? If there is no policy,
          say what the arrangement actually is. A stated limit that is honoured
          beats an implied unlimited guarantee that is not.
        </Unconfirmed>
      </LegalSection>

      <LegalSection heading="High-value and bridal sarees">
        <p>
          Tell us the value when you book and we will confirm in writing that it
          is recorded before we collect. A saree whose value has not been
          declared is covered only to [DEFAULT LIMIT].
        </p>
        <Unconfirmed>
          set the default limit and the declared-value process for bridal work.
        </Unconfirmed>
      </LegalSection>

      <LegalSection heading="What counts as damage, and what does not">
        <p>
          Damage means something we caused: a scorch, a tear, a stain, a seam
          opened in handling.
        </p>
        <p>
          Fabric behaving as fabric does is not damage. Chiffon and georgette
          relax out of a set over time. Silk shows a crease line where it has
          been folded. Zari darkens with age. Old thread gives way at a stress
          point it was already failing at. Where we can see that risk in advance
          we tell you before starting.
        </p>
      </LegalSection>

      <LegalSection heading="If something goes wrong">
        <p>
          Tell us within [PERIOD] of delivery, with a photograph. We will compare
          it against the arrival and dispatch photographs and come back to you
          within [RESPONSE TIME]. If it is ours, we agree repair or replacement
          with you and cover the cost.
        </p>
        <Unconfirmed>
          set the reporting window and the response time.
        </Unconfirmed>
      </LegalSection>

      <LegalSection heading="Aftercare">
        <p>
          A pre-pleated saree is dry clean only, and the cleaner must be told it
          is pleated. A normal wash will drop the set and it will need redoing —
          which we will do, at the usual price.
        </p>
      </LegalSection>

      <LegalSection heading="Ask us anything">
        <p>
          If you are about to hand over a bridal saree and want to talk any of
          this through first, message us. We would rather answer the question
          than have you worry about it.
        </p>
        {hasWhatsApp() && (
          <div className="pt-2">
            <Button
              href={buildWhatsAppUrl("the care policy")}
              variant="whatsapp"
              data-analytics="whatsapp_click"
              data-analytics-location="care-policy:closing"
            >
              Ask on WhatsApp
            </Button>
          </div>
        )}
      </LegalSection>
    </LegalPage>
  );
}
