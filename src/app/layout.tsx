import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageTransition } from "@/components/motion/PageTransition";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const themeScript = `(function () {
  try {
    var stored = localStorage.getItem("hyperhive-theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.dataset.theme = stored;
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  } catch (e) {}
})();`;

export const metadata: Metadata = {
  title: "HyperHive",
  description:
    "HyperHive is a layered orchestration system for homelab clusters, unifying storage, network, compute, access, and operations.",
  icons: {
    icon: [
      { url: "/static/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/static/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/static/favicon.ico", sizes: "any" },
    ],
    apple: "/static/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/static/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/static/android-chrome-512x512.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="dark" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${plexSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} flex min-h-[100dvh] flex-col antialiased`}
      >
        <div className="relative flex min-h-[100dvh] flex-1 flex-col overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-[-240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_var(--hero-glow-1)_0%,_transparent_70%)] blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-220px] right-[-120px] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,_var(--hero-glow-2)_0%,_transparent_70%)] blur-3xl" />
          <div className="relative z-10 flex flex-1 flex-col">
            <SiteHeader />
            <main className="flex flex-1 flex-col">
              <PageTransition className="flex min-h-full flex-1 flex-col">
                {children}
              </PageTransition>
            </main>
            <SiteFooter />
          </div>
        </div>
        <ThemeToggle />
      </body>
    </html>
  );
}
