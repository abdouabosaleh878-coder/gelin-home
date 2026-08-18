import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { organizationJsonLd } from "@/lib/seo";

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.beltone-demo.com"),
  title: {
    default: "Beltone Hearing Care | Personalized Hearing Solutions",
    template: "%s | Beltone Hearing Care",
  },
  description:
    "Beltone helps you hear more of what matters. Book a free hearing assessment, explore modern hearing aids, and find a hearing-care clinic near you.",
  openGraph: {
    title: "Beltone Hearing Care | Personalized Hearing Solutions",
    description:
      "Personalized hearing solutions designed around your life, your needs, and the people you love.",
    url: "https://www.beltone-demo.com",
    siteName: "Beltone Hearing Care",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beltone Hearing Care | Personalized Hearing Solutions",
    description:
      "Personalized hearing solutions designed around your life, your needs, and the people you love.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand-50 text-ink-900 pb-20 sm:pb-0">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
