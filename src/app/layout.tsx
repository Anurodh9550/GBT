import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LayoutSwitcher from "@/components/LayoutSwitcher";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.trust,
    template: `%s | ${siteConfig.trust}`,
  },
  description: `${siteConfig.trust} - ${siteConfig.tagline}. Admissions open for UG & PG courses at ${siteConfig.name}.`,
  icons: {
    icon: siteConfig.logo,
    apple: siteConfig.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-800">
        <LayoutSwitcher>{children}</LayoutSwitcher>
      </body>
    </html>
  );
}
