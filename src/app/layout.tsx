import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body>{children}</body>
    </html>
  );
}
