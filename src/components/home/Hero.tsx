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
 * The scrim also covers the left of the image, where the banner's own headline,
 * subtitle and service icons are baked into the pixels. Those cannot stay
 * visible: our live headline would be the second one on screen, and baked text
 * earns nothing for "saree pre pleating Chennai", which docs/01-brief.md makes
 * a top-three ranking target.
 *
 * Stays a Server Component: the fan is a pure CSS keyframe and the picture is
 * built at render time.
 */
export function Hero() {
  return (
    <section
      className={cn(
        "relative isolate flex min-h-[88svh] items-center overflow-hidden border-b border-gold/40",
        hasPhoto && "bg-ink",
      )}
    >
      <HeroBackground />
      <div
        className={hasPhoto ? "hero-scrim--dark" : "hero-scrim"}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-content px-6 py-24">
        <div className="max-w-[36rem]">
          <Eyebrow tone={hasPhoto ? "ink" : "ivory"}>
            Chennai · Saree pre-pleating
          </Eyebrow>

          <h1
            className={cn(
              "mt-8 font-display text-display-xl",
              hasPhoto ? "text-ivory" : "text-ink",
            )}
          >
            Nine folds,
            <br />
            set overnight.
          </h1>

          <p
            className={cn(
              "mt-8 max-w-[44ch] text-body",
              hasPhoto ? "text-ivory/85" : "text-ink/85",
            )}
          >
            Your saree comes back pleated, pressed and pinned — ready to wear in
            under a minute. Cotton to{" "}
            <em className="font-display italic">Kanjivaram</em>, we set them all
            by hand.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
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
              "mt-10 text-small",
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
