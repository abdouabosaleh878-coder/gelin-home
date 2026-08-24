import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { organizationJsonLd } from "@/lib/seo";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.currentswimacademy-demo.com"),
  title: {
    default: "Current Swim Academy | Swim Lessons for Every Age",
    template: "%s | Current Swim Academy",
  },
  description:
    "Current Swim Academy offers swim lessons and training for every age and ability across five Austin-area locations — from Parent & Baby Swim to competitive team training and adult fitness.",
  openGraph: {
    title: "Current Swim Academy | Swim Lessons for Every Age",
    description:
      "Swim lessons and training for every age and ability, from Parent & Baby Swim to competitive team training and adult fitness.",
    url: "https://www.currentswimacademy-demo.com",
    siteName: "Current Swim Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Current Swim Academy | Swim Lessons for Every Age",
    description:
      "Swim lessons and training for every age and ability, from Parent & Baby Swim to competitive team training and adult fitness.",
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
