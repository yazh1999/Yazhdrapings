import { cn } from "@/lib/utils";

type Tone = "ivory" | "sand" | "ink";

// Rose on ivory is 5.22:1 and passes. Rose on sand is 4.46:1 and does NOT pass
// AA at this size, so sand sections take ink instead — docs/02-design-system.md.
// The 24px gold rule stays in every tone.
const toneText: Record<Tone, string> = {
  ivory: "text-rose",
  sand: "text-ink",
  ink: "text-gold",
};

export function Eyebrow({
  children,
  tone = "ivory",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-baseline gap-x-3 gap-y-1 font-body text-eyebrow font-semibold uppercase",
        toneText[tone],
        className,
      )}
    >
      <span aria-hidden="true" className="mb-1 h-px w-6 shrink-0 self-center bg-gold" />
      {children}
    </p>
  );
}
