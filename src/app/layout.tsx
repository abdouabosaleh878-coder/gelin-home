import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { organizationJsonLd } from "@/lib/seo";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.beltoneholding-demo.com"),
  title: {
    default: "Beltone Holding | Financial Services Group",
    template: "%s | Beltone Holding",
  },
  description:
    "Beltone Holding is a Cairo-headquartered financial-services group listed on the Egyptian Exchange (EGX: BTFH), spanning investment banking, asset management, financing, and advisory businesses across Africa.",
  openGraph: {
    title: "Beltone Holding | Financial Services Group",
    description:
      "A diversified financial-services group across investment banking, asset management, financing, and advisory businesses.",
    url: "https://www.beltoneholding-demo.com",
    siteName: "Beltone Holding",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beltone Holding | Financial Services Group",
    description:
      "A diversified financial-services group across investment banking, asset management, financing, and advisory businesses.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-ink-900">
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
      </body>
    </html>
  );
}
