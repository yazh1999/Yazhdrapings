import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/types";
import { hasPublicAsset } from "@/lib/assets";
import { cn, formatPrice, formatExpress, formatTurnaround } from "@/lib/utils";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

/**
 * The facts under each service, which differ by kind — that is the whole reason
 * Service is a union. A send-in service has a turnaround; a draping appointment
 * has a place and a duration, and no turnaround anyone could answer.
 */
function facts(service: Service): Array<{ label: string; value: string }> {
  if (service.kind === "appointment") {
    return [
      { label: "Where", value: service.where },
      ...(service.durationMins
        ? [{ label: "Allow", value: `${service.durationMins} mins` }]
        : []),
      ...(service.covers ? [{ label: "Covers", value: service.covers }] : []),
    ];
  }

  return [
    { label: "Turnaround", value: formatTurnaround(service.turnaround.standardHours) },
    { label: "Express", value: formatExpress(service.turnaround) },
  ];
}

/**
 * Plate. Falls back to the pleat field until the photograph exists — not a grey
 * "image placeholder" box: the motif reads as intentional, and the brief rules
 * out stock photography outright.
 */
function Plate({ service }: { service: Service }) {
  if (hasPublicAsset(service.image)) {
    return (
      <Image
        src={service.image}
        alt={`${service.name} — work by Yazh Drapings`}
        width={1200}
        height={900}
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="aspect-[4/3] w-full border border-gold/40 object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pleats aspect-[4/3] w-full border border-gold/40"
    />
  );
}

export function ServiceBlock({
  service,
  flip,
}: {
  service: Service;
  /** Alternate the image side. A centred column all the way down is the template answer. */
  flip: boolean;
}) {
  const rows = facts(service);

  return (
    <article
      id={service.slug}
      // Anchored from the footer and the home cards. scroll-mt clears the
      // sticky header, or the heading lands underneath it.
      className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16"
    >
      <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
        <h3 className="font-display text-display-md">{service.name}</h3>

        {service.tamilName && (
          <p className="mt-2 font-tamil text-[1.05rem] text-gold">
            {service.tamilName}
          </p>
        )}

        <p className="mt-5 text-body text-muted">{service.description}</p>

        <dl className="mt-7 space-y-2 border-t border-gold/40 pt-5">
          {rows.map((row) => (
            <div key={row.label} className="flex gap-4 text-small">
              <dt className="w-28 shrink-0 text-muted">{row.label}</dt>
              <dd className="text-ink">{row.value}</dd>
            </div>
          ))}
          <div className="flex gap-4 pt-1">
            <dt className="w-28 shrink-0 text-small text-muted">Price</dt>
            <dd className="tabular text-numeric text-ink">
              {formatPrice(service.price)}
            </dd>
          </div>
        </dl>

        {hasWhatsApp() && (
          <Button
            href={buildWhatsAppUrl(service.name)}
            variant="whatsapp"
            className="mt-7"
            data-analytics="whatsapp_click"
            data-analytics-location={`services:${service.slug}`}
          >
            Book on WhatsApp
          </Button>
        )}
      </div>

      <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
        <Plate service={service} />
      </div>
    </article>
  );
}
