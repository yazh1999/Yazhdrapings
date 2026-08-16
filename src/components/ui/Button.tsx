import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "whatsapp";

// 48px min height, 2px radius, no shadows. Depth comes from the pleat gradient;
// a drop shadow on an ivory page is the fastest way to look generic.
const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-fold px-6 " +
  "font-body text-[0.9375rem] font-semibold tracking-wide transition-colors " +
  "duration-160 ease-out disabled:cursor-not-allowed disabled:opacity-45";

const variants: Record<Variant, string> = {
  // rose -> magenta on hover, 160ms. Both pass AA against ivory text.
  primary: "bg-rose text-ivory hover:bg-magenta",
  // Gold is the line color of the brand — border only, never the text color.
  secondary: "border border-gold bg-transparent text-ink hover:bg-sand",
  whatsapp: "border border-gold bg-ink text-ivory hover:bg-rose",
};

type Props = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: never } & Omit<ComponentProps<"button">, "className">)
);

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: Props) {
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    const external = href.startsWith("http");

    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
