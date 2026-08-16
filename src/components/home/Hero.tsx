import { getImageProps } from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { heroImage, stats } from "@/data/site";

/**
 * Hero background.
 *
 * Art direction via getImageProps + <picture>, which is how Next 16 documents
 * it. Two <Image> components toggled with `hidden` would not work: a
 * display:none image is still fetched, so the phone would download the 2400px
 * desktop file as well as its own.
 *
 * Falls back to the CSS pleat field when no photograph is configured — see
 * heroImage in data/site.ts.
 */
function HeroBackground() {
  if (!heroImage.enabled) {
    return <div className="pleat-fan" aria-hidden="true" />;
  }

  const common = {
    alt: heroImage.alt,
    sizes: "100vw",
    quality: 68,
    priority: true,
  };

  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, ...heroImage.desktop });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, ...heroImage.mobile });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* alt is already inside `rest`; repeating it is for the linter, which
          cannot see through the spread. Same value, so nothing is overridden. */}
      <img
        {...rest}
        alt={heroImage.alt}
        className="absolute inset-0 size-full object-cover"
      />
    </picture>
  );
}

/**
 * The hero deliberately has no photograph in the original design — a saree
 * service whose homepage opens with a stock model looks like every tailor's
 * site in India, and the CSS field costs nothing on 4G. A real photograph of
 * real work is a legitimate upgrade on that; stock imagery is not.
 *
 * Stays a Server Component either way: the fan is a pure CSS keyframe.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden border-b border-gold/40">
      <HeroBackground />
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
