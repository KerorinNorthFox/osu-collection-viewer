import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Osu! FC Checker",
  description: "Check whether the beatmap is FCed in collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Header />
        <main className="flex justify-center w-full lg:w-[70%] lg:mx-auto h-[calc(100vh-3rem)] pt-header ">
          {children}
        </main>
      </body>
    </html>
  );
}
