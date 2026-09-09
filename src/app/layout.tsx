import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Wayanad Problems | Voice of Wayanad",
  description: "A community platform to report, discuss, and track problems across Wayanad district. Together, we make our voices heard.",
  openGraph: {
    title: "Wayanad Problems | Voice of Wayanad",
    description: "A community platform to report, discuss, and track problems across Wayanad district.",
    url: "https://wayanad-problems.vercel.app",
    siteName: "Wayanad Problems",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col font-sans bg-zinc-950 text-zinc-100 antialiased`}>
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
