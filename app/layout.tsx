import type { Metadata, Viewport } from "next";
import "./globals.css";
import ToolbarClient from "../components/ToolbarClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.solusix.com.br"),
  title: "SoluSix - Suprimentos profissionais sem complicação",
  description:
    "Do inox ao detergente: clicou, chegou. Receba detergente e secante premium em 48h e acesse nosso catálogo em expansão.",
  keywords: "suprimentos, detergente, secante, limpeza, B2B, B2C, marketplace",
  authors: [{ name: "SoluSix" }],
  openGraph: {
    title: "SoluSix - Suprimentos profissionais sem complicação",
    description: "Do inox ao detergente: clicou, chegou.",
    url: "https://www.solusix.com.br",
    siteName: "SoluSix",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SoluSix - Suprimentos profissionais",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoluSix - Suprimentos profissionais sem complicação",
    description: "Do inox ao detergente: clicou, chegou.",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "development" && <ToolbarClient />}
      </body>
    </html>
  );
}
