"use client";

import Button from "@/components/ui/button";
import ThemeProvider from "../components/theme-provider";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="w-full h-[85vh] flex justify-center items-center">
            <div className="text-center">
              <div className="mb-3 md:mb-5 space-y-1.5">
                <p className="text-foreground font-bold text-2xl md:text-4xl">Something went wrong!</p>
                <p className="text-muted-foreground max-w-xs mx-auto md:text-lg">{error.message}</p>
              </div>
              <Button variant="primary" onClick={() => reset()}>
                Try again
              </Button>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
