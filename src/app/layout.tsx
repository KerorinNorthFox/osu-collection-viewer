import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { ThemeProvider } from "next-themes";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange>
          <Header />
          <main className="flex justify-center h-screen pt-header bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
            <div className="w-full lg:w-[70%] lg:mx-auto">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
