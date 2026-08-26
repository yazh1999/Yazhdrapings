import { z } from "zod";

/**
 * One schema, validating on both the client and the server — docs/04-architecture.md.
 * The field list here is the contract with the table in docs/03-pages-and-copy.md;
 * if one changes, change both in the same commit.
 */
const mobile = z
  .string()
  .transform((s) => s.replace(/[\s-]/g, ""))
  .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit mobile number"));

export const bookingSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name"),
    mobile,
    // Unchecked checkboxes are absent from FormData, so the default is false and
    // the UI ships it checked. Not z.boolean() — FormData values are strings.
    whatsappSame: z.coerce.boolean().default(false),
    whatsappNumber: z.union([mobile, z.literal("")]).optional(),
    service: z.string().min(1, "Choose a service"),
    fabric: z.enum(["cotton", "silk", "georgette", "chiffon", "organza", "unsure"], {
      message: "Choose a fabric, or pick Not sure",
    }),
    quantity: z.coerce
      .number()
      .int()
      .min(1, "At least one")
      .max(20, "Twenty at a time, maximum"),
    height: z.string().optional(),
    neededBy: z.string().min(1, "Choose a date"),
    area: z.string().trim().min(2, "Which part of town?"),
    notes: z.string().max(500, "Keep it under 500 characters").optional(),
    // Absent when a bot strips hidden inputs, so .optional() — a required
    // honeypot rejects legitimate submissions from anything that drops them.
    honeypot: z.string().max(0).optional(),
  })
  .refine(
    (d) => d.whatsappSame || (d.whatsappNumber && d.whatsappNumber.length === 10),
    {
      message: "Enter the WhatsApp number, or tick that it is the same",
      path: ["whatsappNumber"],
    },
  )
  // Validated server-side too. A client-side `min` attribute is a hint, not a
  // constraint, and this one carries an operational promise.
  .refine(
    (d) => {
      const wanted = new Date(`${d.neededBy}T00:00:00+05:30`);
      const earliest = new Date();
      earliest.setHours(0, 0, 0, 0);
      earliest.setDate(earliest.getDate() + 2);
      return !Number.isNaN(wanted.getTime()) && wanted >= earliest;
    },
    {
      message: "We need at least two days. Message us on WhatsApp if it is urgent.",
      path: ["neededBy"],
    },
  );

export type BookingInput = z.infer<typeof bookingSchema>;

export const FABRICS = [
  { value: "cotton", label: "Cotton" },
  { value: "silk", label: "Silk" },
  { value: "georgette", label: "Georgette" },
  { value: "chiffon", label: "Chiffon" },
  { value: "organza", label: "Organza" },
  { value: "unsure", label: "Not sure" },
] as const;

export const HEIGHTS = [
  { value: "under-150", label: "Under 150 cm" },
  { value: "150-155", label: "150–155 cm" },
  { value: "155-160", label: "155–160 cm" },
  { value: "160-165", label: "160–165 cm" },
  { value: "165-170", label: "165–170 cm" },
  { value: "over-170", label: "Over 170 cm" },
  { value: "unsure", label: "Not sure — talk me through it" },
] as const;

/** Today + 2 days, in the yyyy-mm-dd the date input wants. IST. */
export function earliestDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().slice(0, 10);
}
