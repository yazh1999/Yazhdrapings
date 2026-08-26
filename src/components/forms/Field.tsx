import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared field chrome. Labels sit above inputs, never placeholder-only, and the
 * error message is wired with aria-describedby + aria-invalid so a screen reader
 * hears it — docs/02-design-system.md accessibility floor.
 */
export function Field({
  name,
  label,
  hint,
  error,
  required,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string[];
  required?: boolean;
  /** Render prop: the control must spread these onto itself. */
  children: (props: {
    id: string;
    name: string;
    "aria-describedby": string | undefined;
    "aria-invalid": boolean | undefined;
    required: boolean | undefined;
  }) => ReactNode;
}) {
  const describedBy =
    [hint && `${name}-hint`, error?.length && `${name}-error`]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div>
      <label htmlFor={name} className="block text-small font-semibold text-ink">
        {label}
        {required && (
          <span className="text-rose" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>

      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-small text-muted">
          {hint}
        </p>
      )}

      <div className="mt-2">
        {children({
          id: name,
          name,
          "aria-describedby": describedBy,
          "aria-invalid": error?.length ? true : undefined,
          required,
        })}
      </div>

      {error?.length ? (
        <p id={`${name}-error`} className="mt-2 text-small text-rose">
          {error[0]}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Inputs are sand-filled with a gold hairline and a rose focus ring, and inherit
 * --radius-button so they match the pill CTAs rather than fighting them.
 */
export const control = cn(
  "block w-full min-h-12 rounded-button border border-gold/60 bg-sand px-4 py-2.5",
  "text-body text-ink placeholder:text-muted",
  "focus:border-rose focus:outline-none",
  "aria-[invalid=true]:border-rose",
);
