import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Architecture", href: "/architecture" },
  { label: "512rede", href: "/512rede" },
  { label: "Features", href: "/features" },
  { label: "Installation", href: "/installation" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-[color:var(--surface-header)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
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
        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <nav className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground sm:gap-4">
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
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-[color:var(--surface-elevated)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition hover:border-accent/60"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
