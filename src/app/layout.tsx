import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LegalFooter } from "@/components/legal-footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLIBI Portal Template",
  description: "LLIBI corporate frontend template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('app-theme') || 'theme-blue';
                  const savedFont = localStorage.getItem('app-font-family') || 'font-geist';
                  const savedSize = localStorage.getItem('app-font-size') || 'size-lg';
                  const savedRadius = localStorage.getItem('app-radius') || 'radius-sm';
                  
                  const root = document.documentElement;
                  if (savedTheme !== 'default') root.classList.add(savedTheme);
                  root.classList.add(savedFont);
                  root.classList.add(savedSize);
                  root.classList.add(savedRadius);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_38%),radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#f3f6fb_48%,#eef2f7_100%)]">
        <ThemeProvider>
          <div className="flex flex-1 flex-col">{children}</div>
          <LegalFooter />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
