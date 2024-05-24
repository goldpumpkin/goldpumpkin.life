import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {HomePage} from "@/data/meta-data";

// Route segment config
export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = HomePage.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Header/>
        <main className="max-w-3xl container text-black dark:text-white mx-auto px-6 py-6 flex-1 leading-6">
            {children}
        </main>
        <Footer/>
      </body>
      </html>
  );
}


