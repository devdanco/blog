import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./highlight-theme.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Braces } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Byte-Sized Insights",
  description: "Learn about coding with easy-to-read articles and guides",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto px-4 flex items-center justify-between h-16">
                <Link href="/" className="flex items-center group">
                  <Braces className="h-8 w-8 mr-2 text-primary group-hover:text-primary/80 transition-colors" />
                  <span className="text-xl font-bold group-hover:text-primary transition-colors">
                    Byte-Sized Insights
                  </span>
                </Link>
                <nav className="flex items-center gap-4">
                  <Link
                    href="/posts"
                    className="hover:text-primary transition-colors"
                  >
                    Articles
                  </Link>
                  <ModeToggle />
                </nav>
              </div>
            </header>
            <main className="flex-grow flex mt-16">{children}</main>
            <footer className="border-t py-4 text-center text-sm text-muted-foreground bg-background">
              <div className="container mx-auto px-4">
                © {new Date().getFullYear()} Byte-Sized Insights. All rights
                reserved.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
