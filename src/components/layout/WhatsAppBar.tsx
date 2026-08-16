import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

/**
 * Present on every page — the WhatsApp CTA is never more than one scroll away.
 * Fixed bottom bar on mobile, floating pill bottom-right on desktop.
 *
 * Renders nothing when the number is unconfigured, so a preview deploy without
 * env vars does not ship a wa.me link to nowhere.
 */
export function WhatsAppBar() {
  if (!hasWhatsApp()) return null;

  return (
    <>
      {/* Mobile: fixed bottom, full width, ink fill, gold top rule. */}
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics="whatsapp_click"
        data-analytics-location="persistent-bar-mobile"
        className="fixed inset-x-0 bottom-0 z-40 flex min-h-14 items-center justify-center border-t border-gold bg-ink px-6 text-center text-small font-semibold text-ivory lg:hidden"
      >
        Message us on WhatsApp
      </a>

      {/* Desktop: floating pill, bottom right. */}
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics="whatsapp_click"
        data-analytics-location="persistent-pill-desktop"
        className="fixed bottom-8 right-8 z-40 hidden min-h-12 items-center gap-2 rounded-fold border border-gold bg-ink px-6 text-small font-semibold text-ivory transition-colors duration-160 ease-out hover:bg-rose lg:inline-flex"
      >
        Message us on WhatsApp
      </a>
    </>
  );
}
