import { getImageProps } from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { heroImage, stats } from "@/data/site";
import { cn } from "@/lib/utils";

const hasPhoto = heroImage.enabled;

/**
 * Art direction via getImageProps + <picture>, per the Next 16 docs, but only
 * when a portrait crop actually exists. Two <Image> components toggled with
 * `hidden` would not do: a display:none image is still fetched, so a phone
 * would download the desktop file as well as its own.
 *
 * With no portrait crop, one file is used at every size and positioned right,
 * so a portrait screen fills with the drape rather than the empty left panel.
 */
function HeroBackground() {
  if (!hasPhoto) {
    return <div className="pleat-fan" aria-hidden="true" />;
  }

  const common = {
    alt: heroImage.alt,
    sizes: "100vw",
    quality: 68,
    priority: true,
  };

  const {
    props: { srcSet: desktop, ...rest },
  } = getImageProps({ ...common, ...heroImage.desktop });

  const mobile = heroImage.mobile
    ? getImageProps({ ...common, ...heroImage.mobile }).props.srcSet
    : null;

  return (
    <picture>
      {mobile && <source media="(min-width: 1024px)" srcSet={desktop} />}
      {mobile && <source srcSet={mobile} />}
      {/* alt is already inside `rest`; repeating it is for the linter, which
          cannot see through the spread. Same value, so nothing is overridden. */}
      <img
        {...rest}
        alt={heroImage.alt}
        className="absolute inset-0 size-full object-cover object-right lg:object-center"
      />
    </picture>
  );
}

/**
 * Hero.
 *
 * When a photograph backs it, the whole section flips to a dark treatment —
 * ivory type over ink rather than ink over ivory. That is not a style choice.
 * The branding photography is near-black, and the ink headline that reads at
 * 17.5:1 on ivory is invisible on it.
 *
 * The banner's own headline, subtitle and service icons are stripped out of the
 * asset by scripts/generate-hero.mjs rather than hidden under the scrim, so the
 * only headline on screen is this one — live, indexable text. Baked text earns
 * nothing for "saree pre pleating Chennai", which docs/01-brief.md makes a
 * top-three ranking target, and a screen reader cannot read it.
 *
 * Sized as a compact band, not a viewport-filling hero: the services and the
 * price are what convert, and a full-height hero pushes both below the fold.
 *
 * Stays a Server Component: the fan is a pure CSS keyframe and the picture is
 * built at render time.
 */
export function Hero() {
  return (
    <section
      className={cn(
        // A compact band. Note this is a FLOOR, not a ceiling — min-height
        // cannot cap anything, and an earlier attempt to bound the hero with
        // min-h alone did nothing at all: the headline simply grew past it.
        // The real height control is the type size on the h1 below.
        "relative isolate flex min-h-[clamp(20rem,44svh,25rem)] items-center overflow-hidden border-b border-gold/40",
        hasPhoto && "bg-ink",
      )}
    >
      <HeroBackground />
      <div
        className={hasPhoto ? "hero-scrim--dark" : "hero-scrim"}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-content px-6 py-12">
        <div className="max-w-[36rem]">
          <Eyebrow tone={hasPhoto ? "ink" : "ivory"}>
            Chennai · Saree pre-pleating
          </Eyebrow>

          <h1
            className={cn(
              "mt-5 font-display text-display-hero",
              hasPhoto ? "text-ivory" : "text-ink",
            )}
          >
            Nine folds,
            <br />
            set overnight.
          </h1>

          <p
            className={cn(
              "mt-5 max-w-[42ch] text-body",
              hasPhoto ? "text-ivory/85" : "text-ink/85",
            )}
          >
            Your saree comes back pleated, pressed and pinned — ready to wear in
            under a minute. Cotton to{" "}
            <em className="font-display italic">Kanjivaram</em>, we set them all
            by hand.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/book">Book a pickup</Button>
            <Button
              href="/gallery"
              variant={hasPhoto ? "secondaryOnInk" : "secondary"}
            >
              See our work
            </Button>
          </div>

          <p
            className={cn(
              "mt-6 text-small",
              hasPhoto ? "text-ivory/65" : "text-muted",
            )}
          >
            Doorstep pickup across Chennai · Back in{" "}
            <span className={cn("tabular", hasPhoto ? "text-gold" : "text-ink")}>
              {stats.standardTurnaroundHours} hrs
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
