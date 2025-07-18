import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmad Akbar",
  description: "Portfolios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
