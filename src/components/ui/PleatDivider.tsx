import { cn } from "@/lib/utils";

/**
 * The crease. Replaces every horizontal rule on the site — never use a plain
 * <hr>. Decorative, so it is hidden from assistive tech.
 */
export function PleatDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn("pleats h-0.5 w-full opacity-30", className)}
    />
  );
}
