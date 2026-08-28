import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Shorts Studio",
  description: "Turn a single idea into a scroll-stopping YouTube Short, TikTok, or Reel — script, voice, visuals, captions, and export, generated automatically.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
