import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";
import { inter } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | Python Handbook",
    default: "Python Handbook | Interactive Learning Environment",
  },
  description:
    "Master Python fundamentals using clear lessons, hands-on coding, and an integrated, zero-setup learning environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased styled-scrollbar`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster richColors closeButton />
          <div className="w-full min-h-screen relative">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
