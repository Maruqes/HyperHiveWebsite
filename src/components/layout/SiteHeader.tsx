"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { ThemeToggle } from "@/components/ui/ThemeToggle";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Architecture", href: "/architecture" },
  { label: "512rede", href: "/512rede" },
  { label: "Features", href: "/features" },
  { label: "Installation", href: "/installation" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-[color:var(--surface-header)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-3 sm:px-6 sm:py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-[color:var(--surface-elevated)] text-sm font-semibold text-foreground">
              <Image
                src="/static/android-chrome-192x192.png"
                alt="HyperHive"
                width={32}
                height={32}
                className="h-8 w-8 invert dark:invert-0"
                priority
              />
            </span>
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                HyperHive
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Homelab Cloud Orchestration
              </span>
            </div>
          </Link>
          <div className="flex items-center justify-between gap-4 md:justify-end">
            <nav className="hidden items-center gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href="https://github.com/Maruqes/HyperHive"
              className="hidden items-center gap-2 rounded-full border border-border/80 bg-[color:var(--surface-elevated)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition hover:border-accent/60 lg:inline-flex"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-border/80 bg-[color:var(--surface-elevated)] p-2 text-foreground transition hover:border-accent/60 lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[80] lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={handleClose}
        />
        <aside
          id="mobile-nav"
          className={`absolute right-0 top-0 flex h-full w-[min(86vw,360px)] flex-col gap-6 overflow-y-auto border-l border-border/70 bg-[color:var(--surface-elevated-stronger)] p-6 text-foreground shadow-[0_20px_40px_var(--shadow-strong)] transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Navigation
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-[color:var(--surface-overlay)] text-foreground transition hover:border-accent/60"
              aria-label="Close navigation menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-[0.2em]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClose}
                className="rounded-lg border border-border/70 bg-[color:var(--surface-overlay-soft)] px-4 py-3 text-foreground transition hover:border-accent/60 hover:bg-[color:var(--surface-overlay)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ThemeToggle variant="inline" />

          <a
            href="https://github.com/Maruqes/HyperHive"
            className="mt-auto inline-flex items-center justify-between gap-2 rounded-full border border-border/80 bg-[color:var(--surface-elevated)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition hover:border-accent/60"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </aside>
      </div>
    </>
  );
}
