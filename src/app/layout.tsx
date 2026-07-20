import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Mining Investment Event",
  description: "Canada's Only Tier I Global Mining Investment Conference",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${karla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
