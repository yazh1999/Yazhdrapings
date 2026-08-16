import { cn } from "@/lib/utils";

/**
 * Six vertical pleat bars falling into place left to right, 80ms apart. It reads
 * as a saree being set, and it is the only loading animation on the site.
 * Animates transform and opacity only — same compositor rule as the hero.
 */
export function PleatLoader({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("flex h-16 items-end justify-center gap-1.5", className)}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          className="pleat-loader-bar block h-full w-1.5 rounded-fold bg-rose"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
}
