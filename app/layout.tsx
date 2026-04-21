import type { Metadata } from "next";
import { Poppins } from "next/font/google"; 
import "./globals.css";
import Footer from "@/components/footer"; 
import { Providers } from "@/components/provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
  variable: "--font-poppins", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lokalin Aja",
  description: "Rekomendasi tempat asik di kotamu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable}`}>
      <body className="antialiased font-sans">
        <Providers>
        {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}