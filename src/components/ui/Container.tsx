import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The page gutter, in one place.
 *
 * `mx-auto w-full max-w-content px-6` used to be copied into Section, Header,
 * Footer (twice), Hero and TrustStrip, which meant the gutter could not be made
 * responsive without editing six files — and those six could silently drift out
 * of alignment with each other. Routing them all through here also gives every
 * component that sits inside a <Section> the whole ladder for free.
 *
 * The ladder:
 *   base  px-5   20px. At 320px — which is also a 640px window at 200% zoom —
 *                24px costs 15% of the line. The design system's 1.5rem is a
 *                grid gutter between columns, not a page edge margin; only the
 *                former is specified, so this is not a deviation.
 *   sm    px-6   24px, the canonical 1.5rem. Landscape phones up.
 *   md    px-8   32px. Tablet portrait.
 *   lg    px-10  40px. "Generous margins" is the stated editorial direction.
 *   xl    px-12  48px. The container hits its 1240px cap at a 1336px viewport,
 *                so this is the only thing that changes between 1280 and 1336.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-content px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
