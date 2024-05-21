import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {HomePage} from "@/data/meta-data";
import Link from "next/link";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = HomePage.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    let header = (
        <header>
            <Link href={'/'}>
                <h1>Gold's Blog</h1>
            </Link>
        </header>
    )

    let footer = (
        <footer>
            <p>Made with 💛</p>
        </footer>
    )

  return (
      <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Header/>
        <main className="max-w-3xl container text-black dark:text-white mx-auto px-6 py-6 flex-1 leading-6">
            {header}
            {children}
            {footer}
        </main>
      </body>
      </html>
  );
}


