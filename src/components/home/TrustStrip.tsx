import { Container } from "@/components/ui/Container";
import { stats } from "@/data/site";
import { cn } from "@/lib/utils";

// Every figure comes from site.stats. None is typed here — that is what stops
// this strip and the /gallery headline disagreeing.
const items = [
  { value: `${stats.sareesPleated.toLocaleString("en-IN")}+`, label: "sarees pleated" },
  { value: `${stats.standardTurnaroundHours} hrs`, label: "standard turnaround" },
  { value: `${stats.handSetPct}%`, label: "hand-set" },
  { value: "₹0", label: `pickup above ₹${stats.freePickupAbove}` },
];

export function TrustStrip() {
  return (
    <section className="border-b border-gold/40 bg-sand">
      <Container className="py-10 sm:py-14">
        <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "px-2 text-center sm:px-4",
                // Gold hairlines between, never around.
                i % 2 === 1 && "max-md:border-l max-md:border-gold/40",
                i > 0 && "md:border-l md:border-gold/40",
              )}
            >
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="tabular block text-display-md leading-none text-rose">
                  {item.value}
                </span>
                <span className="mt-3 block text-small text-muted">
                  {item.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
