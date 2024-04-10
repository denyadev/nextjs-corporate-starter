import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import i18nConfig from "../../../i18nConfig";

export const metadata: Metadata = {
  title: "DOTSapp",
  description: "Convention App",
};

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string; slug: string[] };
}) {
  return (
    <html lang={params.lang}>
      <body className={`${GeistSans.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ lang: locale }));
}
