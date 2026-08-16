import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// "Yazh" in Bodoni, யாழ் in Noto Serif Tamil beneath at 60% size, gold.
export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "ivory";
}) {
  return (
    <Link
      href="/"
      className={cn("inline-block leading-none", className)}
      aria-label={`${site.name} — home`}
    >
      <span
        className={cn(
          "block font-display text-[1.75rem] tracking-tight",
          tone === "ink" ? "text-ink" : "text-ivory",
        )}
      >
        Yazh
      </span>
      <span
        aria-hidden="true"
        className="mt-0.5 block font-tamil text-[1.05rem] leading-none text-gold"
      >
        {site.tamilName}
      </span>
    </Link>
  );
}
