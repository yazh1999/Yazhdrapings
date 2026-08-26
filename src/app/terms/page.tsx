import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPage,
  LegalSection,
  Unconfirmed,
} from "@/components/ui/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "What you are agreeing to when you submit a pickup request: how an order is confirmed, how prices are quoted, payment, cancellation and turnaround.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="What you are agreeing to."
      intro="Short and specific. These are the terms for saree draping, pre-pleating and finishing work carried out by us."
      lastUpdated="[DATE — set when this is signed off]"
    >
      <Unconfirmed>
        working draft. Every bracketed figure below is a commercial decision for
        the client, and the whole page needs their sign-off in writing.
      </Unconfirmed>

      <LegalSection heading="A request is not yet an order">
        <p>
          Submitting the pickup form is a <em>request</em>. The order exists once
          we reply with a price and a slot and you accept it — normally on
          WhatsApp, within two working hours. Until then nothing is booked and
          nothing is owed.
        </p>
      </LegalSection>

      <LegalSection heading="Prices">
        <p>
          The price card is indicative. The price you are quoted on WhatsApp is
          the price you pay. A quote can differ from the card where the saree
          turns out to need more work than the photograph showed — heavier
          fabric, existing damage, a larger kuchu set — and we tell you before
          starting, never after.
        </p>
        <p>Draping is quoted per booking, on the number of people, the venue and the date.</p>
      </LegalSection>

      <LegalSection heading="Payment">
        <p>
          UPI, cash on delivery, or bank transfer. Payment is due when the saree
          is returned to you. Nothing is taken upfront.
        </p>
        <Unconfirmed>
          confirm whether a deposit is required for bridal bookings, and if so
          how much and whether it is refundable.
        </Unconfirmed>
      </LegalSection>

      <LegalSection heading="Cancellation">
        <p>
          Cancel free of charge any time before we collect the saree. Once work
          has started, the labour already done is chargeable at [CANCELLATION
          CHARGE]. Ready-to-wear conversion cannot be cancelled once cutting has
          begun, because it cannot be undone — we confirm with you before we cut.
        </p>
        <p>
          For a draping appointment, cancelling within [NOTICE PERIOD] of the
          function is chargeable at [CHARGE], because the slot cannot be refilled.
        </p>
        <Unconfirmed>
          set the cancellation charge, the notice period for draping, and the
          bridal terms.
        </Unconfirmed>
      </LegalSection>

      <LegalSection heading="Turnaround">
        <p>
          Turnaround times are targets from the day the saree reaches us, not
          guarantees. If we are going to miss one we will tell you as soon as we
          know, and you can take the saree back unworked at no charge.
        </p>
      </LegalSection>

      <LegalSection heading="Your saree, while it is with us">
        <p>
          Covered in full by our{" "}
          <Link
            href="/care-policy"
            className="text-rose underline-offset-4 hover:underline"
          >
            care policy
          </Link>
          , which forms part of these terms.
        </p>
      </LegalSection>

      <LegalSection heading="Uncollected work">
        <p>
          If a finished saree cannot be delivered and is not collected within
          [PERIOD], we will contact you on the number given. After [PERIOD] we
          may charge storage at [RATE].
        </p>
        <Unconfirmed>
          set both periods and the storage rate, or remove this section.
        </Unconfirmed>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of India, and any dispute falls to
          the courts of {site.address.district ?? site.address.region},{" "}
          {site.address.region}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
