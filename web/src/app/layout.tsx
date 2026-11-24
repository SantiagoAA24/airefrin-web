import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — Aire acondicionado y refrigeración`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "Venta, instalación, mantenimiento y reparación de aire acondicionado y refrigeración comercial e industrial en Bogotá, Cundinamarca y Meta.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: site.name,
    title: `${site.shortName} — Aire acondicionado y refrigeración`,
    description:
      "Soluciones de climatización y refrigeración en Bogotá, Cundinamarca y Meta.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${montserrat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
