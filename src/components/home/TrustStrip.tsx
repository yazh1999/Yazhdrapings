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
      <div className="mx-auto w-full max-w-content px-6 py-14">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "px-4 text-center",
                // Gold hairlines between, never around.
                i % 2 === 1 && "border-l border-gold/40",
                i > 0 && "lg:border-l lg:border-gold/40",
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
      </div>
    </section>
  );
}
