import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { featuredServices } from "@/data/services";
import { formatPriceFrom } from "@/lib/utils";

export function ServicesPreview() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-6 max-w-[20ch] font-display text-display-md">
            Everything between the fold and the front door.
          </h2>
        </div>
        <Link
          href="/services"
          className="relative inline-flex items-center text-small font-semibold text-rose underline-offset-4 after:absolute after:left-0 after:top-1/2 after:h-11 after:w-full after:-translate-y-1/2 after:content-[''] hover:underline"
        >
          See all services &rarr;
        </Link>
      </div>

      <ul className="mt-10 grid gap-px bg-gold/40 md:mt-16 md:grid-cols-3">
        {featuredServices.map((service) => (
          <li
            key={service.slug}
            className="group relative flex bg-sand transition-colors duration-240 ease-out"
          >
            {/* The 6px pleat strip. Slides in from the left on hover and on
                focus-within, so the keyboard path gets the same affordance. */}
            <span
              aria-hidden="true"
              className="pleat-reveal pleats absolute inset-y-0 left-0 w-1.5"
            />

            <div className="p-6 pl-8 lg:p-8 lg:pl-10 xl:p-10 xl:pl-12">
              <h3 className="text-title font-semibold text-ink">
                {/* Stretched link — the whole card is the target, but only one
                    focusable element and one accessible name. */}
                <Link
                  href={`/services#${service.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {service.name}
                </Link>
              </h3>

              <p className="mt-3 text-small text-muted">{service.summary}</p>

              <p className="tabular mt-6 text-numeric text-ink">
                {formatPriceFrom(service.price)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
