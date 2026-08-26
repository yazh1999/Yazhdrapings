"use client";

import { useActionState, useState } from "react";
import { submitBooking, type BookingState } from "@/app/book/actions";
import { Button } from "@/components/ui/Button";
import { PleatDivider } from "@/components/ui/PleatDivider";
import { control, Field } from "./Field";
import { services } from "@/data/services";
import { FABRICS, HEIGHTS, earliestDate } from "@/lib/schemas";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

export function BookingForm() {
  const [state, formAction, pending] = useActionState<BookingState | null, FormData>(
    submitBooking,
    null,
  );

  // Controlled only so the second number field can be revealed. Without JS both
  // fields render and the checkbox is honoured server-side — a required input
  // must never hide behind JS the server still demands.
  const [sameWhatsApp, setSameWhatsApp] = useState(true);

  const errors = state && !state.ok ? state.errors : undefined;
  const minDate = earliestDate();

  if (state?.ok) {
    return (
      <div className="max-w-prose">
        <p className="text-eyebrow font-semibold uppercase tracking-[0.18em] text-rose">
          Request received
        </p>
        <h2 className="mt-5 font-display text-display-md">
          We&apos;ll WhatsApp you within 2 hours.
        </h2>
        <PleatDivider className="my-8" />
        <p className="text-body text-muted">
          That message will confirm the price and the pickup slot. If you need it
          sooner than that, message us directly — we watch WhatsApp during
          working hours.
        </p>
        {hasWhatsApp() && (
          <Button href={buildWhatsAppUrl()} variant="whatsapp" className="mt-8">
            Message on WhatsApp
          </Button>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="max-w-2xl" noValidate>
      {/* Spam trap. Visually hidden, never announced, never tab-reachable. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="honeypot">Leave this empty</label>
        <input id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      {state && !state.ok && state.message && (
        <p
          role="alert"
          className="mb-8 rounded-button border border-rose bg-sand px-4 py-3 text-small text-ink"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <Field name="name" label="Your name" error={errors?.name} required>
          {(p) => <input {...p} type="text" autoComplete="name" className={control} />}
        </Field>

        <Field
          name="mobile"
          label="Mobile number"
          hint="10 digits, no country code"
          error={errors?.mobile}
          required
        >
          {(p) => (
            <input
              {...p}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              className={control}
            />
          )}
        </Field>
      </div>

      <div className="mt-6">
        <label className="flex min-h-11 items-center gap-3 text-small text-ink">
          <input
            type="checkbox"
            name="whatsappSame"
            value="true"
            checked={sameWhatsApp}
            onChange={(e) => setSameWhatsApp(e.target.checked)}
            className="size-5 shrink-0 accent-rose"
          />
          My WhatsApp number is the same
        </label>
      </div>

      {!sameWhatsApp && (
        <div className="mt-6">
          <Field
            name="whatsappNumber"
            label="WhatsApp number"
            error={errors?.whatsappNumber}
            required
          >
            {(p) => (
              <input {...p} type="tel" inputMode="numeric" className={control} />
            )}
          </Field>
        </div>
      )}

      <div className="mt-7 grid gap-7 sm:grid-cols-2">
        <Field name="service" label="Service" error={errors?.service} required>
          {(p) => (
            <select {...p} className={control} defaultValue="">
              <option value="" disabled>
                Choose a service
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field name="fabric" label="Fabric" error={errors?.fabric} required>
          {(p) => (
            <select {...p} className={control} defaultValue="">
              <option value="" disabled>
                Choose a fabric
              </option>
              {FABRICS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          name="quantity"
          label="Number of sarees"
          error={errors?.quantity}
          required
        >
          {(p) => (
            <input
              {...p}
              type="number"
              min={1}
              max={20}
              defaultValue={1}
              inputMode="numeric"
              className={control}
            />
          )}
        </Field>

        <Field
          name="height"
          label="Your height"
          hint="So the pleats are set to you, not a standard"
          error={errors?.height}
        >
          {(p) => (
            <select {...p} className={control} defaultValue="">
              <option value="">Prefer not to say</option>
              {HEIGHTS.map((h) => (
                <option key={h.value} value={h.value}>
                  {h.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          name="neededBy"
          label="Need it by"
          hint="Two days minimum"
          error={errors?.neededBy}
          required
        >
          {(p) => <input {...p} type="date" min={minDate} className={control} />}
        </Field>

        <Field
          name="area"
          label="Pickup area"
          hint="Your locality"
          error={errors?.area}
          required
        >
          {(p) => (
            <input {...p} type="text" autoComplete="address-level3" className={control} />
          )}
        </Field>
      </div>

      <div className="mt-7">
        <Field
          name="notes"
          label="Anything else"
          hint="The occasion, the fabric, a date that cannot move"
          error={errors?.notes}
        >
          {(p) => <textarea {...p} rows={4} maxLength={500} className={control} />}
        </Field>
      </div>

      <p className="mt-7 text-small text-muted">
        Have a photograph of the saree? Send it on WhatsApp after you submit —
        we&apos;ll match it to your request.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Request pickup"}
        </Button>
        {hasWhatsApp() && (
          <span className="text-small text-muted">
            Prefer to talk?{" "}
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rose underline-offset-4 hover:underline"
              data-analytics="whatsapp_click"
              data-analytics-location="book:inline"
            >
              Message on WhatsApp
            </a>
          </span>
        )}
      </div>
    </form>
  );
}
