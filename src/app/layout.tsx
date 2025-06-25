import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" /*fonte*/});

export const metadata: Metadata = { //Mudar para informações reais
  title: "Ecommerce",
  description: "Melhores roupas casuais são aqui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "bg-background min-h-screen font-sans antialiased" /*css padrão da página inicial*/, 
        inter.variable /*variável da fonte*/)}
        >
          {children}
          </body>
    </html>
  );
}
