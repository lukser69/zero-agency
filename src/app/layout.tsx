import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { SITE_NAME } from "@/constants/seo.constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
    default: 'Zero Agency',
    template: `%s | ${SITE_NAME}`
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
