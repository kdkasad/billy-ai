import HeaderBar from "@/components/header-bar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Billy",
  description: "Create and share your own legislation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <HeaderBar solid={false} />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
