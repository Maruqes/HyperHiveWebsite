import Link from "next/link";

import { cn } from "@/lib/utils";

type ExplainerLink = {
  label: string;
  href: string;
};

type ExplainerCalloutProps = {
  title: string;
  why: string;
  links: [ExplainerLink, ExplainerLink];
  className?: string;
};

export function ExplainerCallout({
  title,
  why,
  links,
  className,
}: ExplainerCalloutProps) {
  return (
    <aside
      className={cn(
        "glass-panel rounded-2xl border border-border/80 p-6 shadow-[0_18px_38px_var(--shadow-soft)]",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Explainer
          </p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">
            {title}
          </h3>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Why it exists
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{why}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Connects to
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border/80 bg-[color:var(--surface-elevated)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:border-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
