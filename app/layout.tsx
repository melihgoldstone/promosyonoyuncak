import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Promosyon Oyuncak - Toptan Oyuncak Satışı",
  description: "Türkiye'nin güvenilir toptan promosyon oyuncak tedarikçisi. Güvenli ödeme, hızlı teslimat.",
  keywords: "promosyon oyuncak, toptan oyuncak, oyuncak toptan satış, promosyon ürünleri",
  authors: [{ name: "Promosyon Oyuncak" }],
  openGraph: {
    title: "Promosyon Oyuncak - Toptan Oyuncak Satışı",
    description: "Türkiye'nin güvenilir toptan promosyon oyuncak tedarikçisi",
    type: "website",
    locale: "tr_TR",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
