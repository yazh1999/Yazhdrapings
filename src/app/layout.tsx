import type { Metadata } from "next";
import { Bodoni_Moda, DM_Mono, Manrope, Noto_Serif_Tamil } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppBar } from "@/components/layout/WhatsAppBar";
import { contact, site } from "@/data/site";

// Didone. Hairline-to-thick contrast mirrors the lit and shadowed edge of a
// pleat. Preloaded — it carries the hero, which is the LCP element.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

// Tamil and mono are not on the critical path, so they do not preload.
const tamilSerif = Noto_Serif_Tamil({
  variable: "--font-tamil-serif",
  subsets: ["tamil"],
  display: "swap",
  preload: false,
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(contact.siteUrl),
  title: {
    default: `${site.name} — Saree Pre-Pleating in Chennai`,
    template: `%s | ${site.name} — Saree Pre-Pleating in Chennai`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: `${site.name} — Saree Pre-Pleating in Chennai`,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${manrope.variable} ${tamilSerif.variable} ${dmMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-fold focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-11 focus:items-center focus:bg-rose focus:px-4 focus:text-ivory"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppBar />
      </body>
    </html>
  );
}
