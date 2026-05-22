import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, EB_Garamond } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Nggak Dulu as a Service",
  description: "Generator kalimat penolakan Bahasa Indonesia plus public API untuk bilang nggak dulu dengan sopan, lucu, atau tegas.",
  openGraph: {
    title: "Nggak Dulu as a Service",
    description: "Indonesian rejection generator and public API for saying no without making things awkward.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} ${ebGaramond.variable} scroll-smooth antialiased`}>
      <body>{children}</body>
    </html>
  );
}
