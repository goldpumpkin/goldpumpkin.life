import "./globals.css";

import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {HomePage} from "@/data/meta-data";
import LocalFont from "@/lib/local-font";
import Providers from "@/components/theme/Providers";

export const runtime = "nodejs";
export const dynamic = "force-static";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = HomePage.metadata;

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body className={`flex flex-col h-screen ${LocalFont.className}`}>
        <Providers>
            <Header/>
            <main className="max-w-3xl container text-black dark:text-white mx-auto px-6 py-6 flex-1 leading-6">
                {children}
            </main>
            <Footer/>
        </Providers>
        </body>
        </html>
    );
}


