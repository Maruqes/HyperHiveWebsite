import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Architecture", href: "/architecture" },
  { label: "512rede", href: "/512rede" },
  { label: "Features", href: "/features" },
  { label: "Installation", href: "/installation" },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/70 bg-[color:var(--surface-elevated-strong)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-sm flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-[color:var(--surface-elevated)] text-sm font-semibold text-foreground">
              <Image
                src="/static/android-chrome-192x192.png"
                alt="HyperHive"
                width={32}
                height={32}
                className="h-8 w-8 invert dark:invert-0"
              />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-foreground">
                HyperHive
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Homelab Cloud Orchestration
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Connective layer for homelab clusters that keeps storage, network,
            compute, access, and operations aligned.
          </p>
        </div>
        <div className="grid gap-6 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Navigation
            </p>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              GitHub
            </p>
            <a
              href="https://github.com/Maruqes/HyperHive"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              rel="noreferrer"
              target="_blank"
            >
              View HyperHive on GitHub
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              Legal
            </p>
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <a
              href="https://github.com/Maruqes/HyperHive/blob/main/LICENSE"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              rel="noreferrer"
              target="_blank"
            >
              License
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {currentYear} HyperHive. All rights reserved.</span>
          <span>Architecture, network, and operations aligned in one system.</span>
        </div>
      </div>
    </footer>
  );
}
