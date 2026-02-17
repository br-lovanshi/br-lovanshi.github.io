import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brajesh Lovanshi | Projects",
  description: "Senior Software Engineer Portfolio & Blog",
  openGraph: {
    title: "Brajesh Lovanshi",
    description: "Portfolio & Blog",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
