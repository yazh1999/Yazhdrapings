import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The circular mark plus the type-set wordmark.
 *
 * The badge is not used alone at this size on purpose: at 44px the script
 * "Drapings" and the tagline inside it are illegible, so a lone mark would read
 * as an unidentified blob in the corner. Pairing it with "Yazh" in Bodoni and
 * யாழ் in Noto Serif Tamil keeps the name readable at every size and keeps the
 * Tamil present, which the brand treats as first-class rather than decoration.
 *
 * Uses mark-circle.png rather than the source JPEG: the badge is round but the
 * JPEG carries a square cream background that shows as a pale box on anything
 * that is not exactly that cream — the ink footer, for one. Regenerate both with
 * `npm run icons` after replacing the logo.
 */
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
      className={cn("flex items-center gap-3", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src="/assets/logo/mark-circle.png"
        // Empty: the wordmark beside it and the link's aria-label already carry
        // the name. Real alt text here would have a screen reader say it twice.
        alt=""
        width={512}
        height={512}
        sizes="44px"
        priority
        className="size-11 shrink-0"
      />

      <span className="block leading-none">
        <span
          className={cn(
            "block font-display text-[1.5rem] leading-none tracking-tight",
            tone === "ink" ? "text-ink" : "text-ivory",
          )}
        >
          Yazh
        </span>
        <span
          aria-hidden="true"
          className="mt-1 block font-tamil text-[0.9rem] leading-none text-gold"
        >
          {site.tamilName}
        </span>
      </span>
    </Link>
  );
}
