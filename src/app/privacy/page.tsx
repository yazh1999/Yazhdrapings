import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalPage,
  LegalSection,
  Unconfirmed,
} from "@/components/ui/LegalPage";
import { contact, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What personal data this site collects, why, who else sees it, how long it is kept, and your rights under the Digital Personal Data Protection Act 2023.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/**
 * Required by the DPDP Act 2023 the moment the booking form takes a mobile
 * number — not a Phase 4 nicety. Drafted from the requirements in
 * docs/03-pages-and-copy.md; it still needs a lawyer's eye before launch, and
 * the unconfirmed items below are the ones a template cannot answer.
 */
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="What we collect, and why."
      intro={`${site.name} collects the minimum needed to quote a price, arrange a pickup and return your saree. This notice says what that is in plain language.`}
      lastUpdated="[DATE — set when this is signed off]"
    >
      <Unconfirmed>
        this page is a working draft. Have it checked against the DPDP Act 2023
        by someone qualified, and fill in every bracketed item below, before the
        booking form goes live.
      </Unconfirmed>

      <LegalSection heading="What we collect">
        <p>When you submit the pickup request form, we collect:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Your name</li>
          <li>Your mobile number, and your WhatsApp number if it differs</li>
          <li>The service and fabric you selected, and how many sarees</li>
          <li>Your height range, if you choose to give it</li>
          <li>The date you need the saree by</li>
          <li>Your pickup locality</li>
          <li>Anything you write in the notes field</li>
        </ul>
        <p>
          If you message us on WhatsApp, that conversation and any photographs
          you send are held in WhatsApp under Meta&apos;s own terms.
        </p>
        <p>
          We also use website analytics, which set cookies and record which
          pages were visited. Analytics do not load until you accept them.
        </p>
      </LegalSection>

      <LegalSection heading="Why we collect it">
        <p>
          To quote a price, arrange a collection, return the saree to the right
          person, and answer you. Nothing else. We do not sell it, we do not
          share it for advertising, and we do not send marketing you did not ask
          for.
        </p>
      </LegalSection>

      <LegalSection heading="Who else sees it">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong className="text-ink">Resend</strong> — delivers the booking
            request to our inbox
          </li>
          <li>
            <strong className="text-ink">Vercel</strong> — hosts this site and
            processes server logs
          </li>
          <li>
            <strong className="text-ink">Google Analytics</strong> — website
            analytics, only after you accept
          </li>
          <li>
            <strong className="text-ink">Meta (WhatsApp)</strong> — if you
            message us there
          </li>
          <li>
            Our delivery partner, who receives only the name, number and address
            needed for collection
          </li>
        </ul>
        <Unconfirmed>
          name the actual delivery partner here. &ldquo;Third parties may
          include&rdquo; is not a disclosure.
        </Unconfirmed>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          Booking emails and order records are kept for [RETENTION PERIOD] and
          then deleted. Arrival and dispatch photographs of your saree are kept
          for [RETENTION PERIOD] so that any dispute can be settled fairly.
        </p>
        <Unconfirmed>
          set real retention periods, and actually delete on them. A stated
          period that is not honoured is worse than none.
        </Unconfirmed>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>Under the Digital Personal Data Protection Act 2023 you may:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Ask what personal data we hold about you</li>
          <li>Ask us to correct anything wrong</li>
          <li>Ask us to erase it, once we no longer need it for your order</li>
          <li>Withdraw consent for analytics at any time</li>
          <li>Raise a grievance, and have it answered</li>
        </ul>
        <p>
          Ask by phone on{" "}
          <a href={`tel:${contact.phone}`} className="text-rose underline-offset-4 hover:underline">
            {contact.phone}
          </a>{" "}
          or in writing to the studio at {site.address.street},{" "}
          {site.address.locality}, {site.address.region}{" "}
          {site.address.postalCode}.
        </p>
        <Unconfirmed>
          the Act requires a named, reachable grievance contact with a working
          email address. Add the name and address here.
        </Unconfirmed>
      </LegalSection>

      <LegalSection heading="Analytics and cookies">
        <p>
          Analytics load only after you accept them. Decline and no analytics
          cookies are set. You can change your mind by clearing this site&apos;s
          data in your browser, which will bring the choice back.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          If this notice changes, the date at the top changes with it. The
          related pages are our{" "}
          <Link href="/terms" className="text-rose underline-offset-4 hover:underline">
            terms
          </Link>{" "}
          and our{" "}
          <Link href="/care-policy" className="text-rose underline-offset-4 hover:underline">
            care policy
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
