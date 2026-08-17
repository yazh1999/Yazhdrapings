import type { ElementType, ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

type Tone = "ivory" | "sand" | "ink";

// Vertical rhythm lives here and nowhere else, so no two selectors fight over
// margins — docs/02-design-system.md.
const tones: Record<Tone, string> = {
  ivory: "bg-ivory text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-ivory",
};

export function Section({
  tone = "ivory",
  as: Tag = "section",
  className,
  innerClassName,
  children,
}: {
  tone?: Tone;
  as?: ElementType;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("py-section", tones[tone], className)}>
      <Container className={innerClassName}>{children}</Container>
    </Tag>
  );
}
