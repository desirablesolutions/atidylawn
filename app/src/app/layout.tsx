import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/views/components/theme-context";
import { Header } from "@/views/includes/header";
import { Footer } from "@/views/includes/footer/";


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
  description: "Intelligent Lawn Care",
};


const styles = {
  container: () => `min-h-screen bg-white dark:bg-black font-thin cursor-none`,
  application: ()=> `${geistSans.variable} ${geistMono.variable} antialiased`
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.application()}>
        <ThemeProvider>
          <Header />
          <div className={styles.container()}>
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
