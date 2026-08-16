import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { stats } from "@/data/site";

/**
 * No photograph. The hero is a full-bleed field of CSS pleats that fans open on
 * load — a saree service whose homepage opens with a stock model looks like every
 * tailor's site in India. Opening with the fold itself weighs almost nothing and
 * renders instantly on 4G, which is where the customer actually is.
 *
 * Stays a Server Component: the fan is a pure CSS keyframe, so this ships no JS.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden border-b border-gold/40">
      <div className="pleat-fan" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-content px-6 py-24">
        <div className="max-w-[36rem]">
          <Eyebrow>Chennai · Saree pre-pleating</Eyebrow>

          <h1 className="mt-8 font-display text-display-xl text-ink">
            Nine folds,
            <br />
            set overnight.
          </h1>

          <p className="mt-8 max-w-[44ch] text-body text-ink/85">
            Your saree comes back pleated, pressed and pinned — ready to wear in
            under a minute. Cotton to{" "}
            <em className="font-display italic">Kanjivaram</em>, we set them all
            by hand.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/book">Book a pickup</Button>
            <Button href="/gallery" variant="secondary">
              See our work
            </Button>
          </div>

          <p className="mt-10 text-small text-muted">
            Doorstep pickup across Chennai · Back in{" "}
            <span className="tabular text-ink">
              {stats.standardTurnaroundHours} hrs
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
