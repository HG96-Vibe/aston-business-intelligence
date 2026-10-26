import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://astonbusinessintelligence.co.uk"),
  title: {
    default: "Aston Business Intelligence | Data & BI Consulting, London",
    template: "%s | Aston Business Intelligence",
  },
  description:
    "Aston Business Intelligence helps UK organisations turn data into decisions — BI strategy, analytics, dashboards and data engineering.",
  openGraph: {
    siteName: "Aston Business Intelligence",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
