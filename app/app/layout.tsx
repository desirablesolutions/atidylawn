import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/models/contexts/theme-context"
import { Header } from "@/views/includes/header/header"
import { CustomCursor } from "@/views/components/custom-cursor"
import { AIHelp } from "@/views/components/ai-help"
import { Footer } from "@/views/includes/footer/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A Tidy Lawn",
  description: "Intelligent Lawn Care Service for your Family.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const defineClassNames = (): string => `${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-black font-thin cursor-none` as const


  return (
    <html lang="en">
      <body
        className={defineClassNames()}
      >
        <ThemeProvider>
          <CustomCursor />
          <AIHelp />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
