import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import CartSidebar from "@/components/CartSidebar";
import FloatingInquiry from "@/components/FloatingInquiry";
import { LanguageProvider } from "@/components/LanguageProvider";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://komma.studio"),
  title: "KOMMA | Produk Inovatif dari Ampas Kopi & Solusi Eco-Hospitality",
  description: "KOMMA mengubah limbah ampas kopi menjadi produk fungsional seperti coaster, briket aromatik, dan amenities hotel. Dukung gaya hidup berkelanjutan bersama KOPAS.",
  keywords: ["Ampas kopi berkelanjutan", "souvenir ramah lingkungan bali", "briket kopi aromatik", "amenities hotel ramah lingkungan", "circular economy indonesia"],
  icons: {
    icon: [
      { url: "/Ratakiri.svg" },
    ],
    apple: [
      { url: "/Ratakiri.svg" },
    ],
    shortcut: ["/Ratakiri.svg"],
  },
  openGraph: {
    title: "KOMMA | Produk Inovatif dari Ampas Kopi",
    description: "Mengubah limbah ampas kopi menjadi produk fungsional dan berkelanjutan.",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/images/profile/hero.png",
        width: 1200,
        height: 630,
        alt: "KOMMA STUDIO",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} font-body antialiased`}>
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <CartSidebar />
            <main className="min-h-screen">
              {children}
            </main>
            <FloatingInquiry />
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
