import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { stats } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a pickup",
  description:
    "Request a doorstep pickup for saree pre-pleating, fall and pico, kuchu, or book a draping appointment. We reply on WhatsApp within 2 hours.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <Section>
      <Eyebrow>Book</Eyebrow>
      <h1 className="mt-6 max-w-[18ch] font-display text-display-lg">
        Request a pickup.
      </h1>
      <p className="mt-6 max-w-prose text-body text-muted">
        Tell us what the saree needs and when you need it back. We&apos;ll
        WhatsApp you within 2 hours with the price and a pickup slot — nothing is
        due until the saree is back with you. Standard turnaround is{" "}
        <span className="tabular text-ink">{stats.standardTurnaroundHours} hrs</span>.
      </p>

      <div className="mt-14">
        <BookingForm />
      </div>
    </Section>
  );
}
