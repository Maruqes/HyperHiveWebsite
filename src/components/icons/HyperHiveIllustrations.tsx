import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type IllustrationProps = {
  className?: string;
  title?: string;
};

const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IllustrationShell({
  className,
  title,
  children,
}: IllustrationProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 360 140"
      className={cn("h-auto w-full text-accent", className)}
      role="img"
      aria-label={title}
      {...baseProps}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function StorageShareCompute({ className, title }: IllustrationProps) {
  return (
    <IllustrationShell className={className} title={title ?? "Storage to compute"}>
      <rect x="20" y="32" width="90" height="60" rx="12" />
      <text x="65" y="62" textAnchor="middle" fontSize="10" fill="var(--diagram-text)">
        Storage
      </text>
      <rect x="135" y="32" width="90" height="60" rx="12" />
      <text x="180" y="62" textAnchor="middle" fontSize="10" fill="var(--diagram-text)">
        Share
      </text>
      <rect x="250" y="32" width="90" height="60" rx="12" />
      <text x="295" y="62" textAnchor="middle" fontSize="10" fill="var(--diagram-text)">
        Compute
      </text>
      <line x1="110" y1="62" x2="135" y2="62" />
      <line x1="225" y1="62" x2="250" y2="62" />
      <polyline points="126,58 135,62 126,66" />
      <polyline points="241,58 250,62 241,66" />
    </IllustrationShell>
  );
}

export function EdgeRouting({ className, title }: IllustrationProps) {
  return (
    <IllustrationShell className={className} title={title ?? "Edge routing"}>
      <rect x="20" y="50" width="90" height="50" rx="12" />
      <text x="65" y="78" textAnchor="middle" fontSize="10" fill="var(--diagram-text)">
        Clients
      </text>
      <rect x="135" y="30" width="90" height="80" rx="12" />
      <text x="180" y="64" textAnchor="middle" fontSize="10" fill="var(--diagram-text)">
        Nginx
      </text>
      <text x="180" y="78" textAnchor="middle" fontSize="10" fill="var(--diagram-text-muted)">
        Routing
      </text>
      <rect x="250" y="20" width="90" height="40" rx="12" />
      <rect x="250" y="80" width="90" height="40" rx="12" />
      <text x="295" y="46" textAnchor="middle" fontSize="10" fill="var(--diagram-text)">
        Service A
      </text>
      <text x="295" y="106" textAnchor="middle" fontSize="10" fill="var(--diagram-text)">
        Service B
      </text>
      <line x1="110" y1="75" x2="135" y2="70" />
      <line x1="225" y1="50" x2="250" y2="40" />
      <line x1="225" y1="90" x2="250" y2="100" />
      <polyline points="126,66 135,70 125,74" />
      <polyline points="240,36 250,40 239,44" />
      <polyline points="240,96 250,100 239,104" />
    </IllustrationShell>
  );
}

export function SecureAccessGate({ className, title }: IllustrationProps) {
  return (
    <IllustrationShell className={className} title={title ?? "Secure access gate"}>
      <rect x="20" y="50" width="90" height="50" rx="12" />
      <text x="65" y="78" textAnchor="middle" fontSize="10" fill="var(--diagram-text)">
        Remote
      </text>
      <rect x="135" y="30" width="90" height="80" rx="12" />
      <text x="180" y="60" textAnchor="middle" fontSize="10" fill="var(--diagram-text)">
        Gate
      </text>
      <text x="180" y="74" textAnchor="middle" fontSize="10" fill="var(--diagram-text-muted)">
        WG + SPA
      </text>
      <rect x="250" y="50" width="90" height="50" rx="12" />
      <text x="295" y="78" textAnchor="middle" fontSize="10" fill="var(--diagram-text)">
        Services
      </text>
      <line x1="110" y1="75" x2="135" y2="70" />
      <line x1="225" y1="70" x2="250" y2="75" />
      <polyline points="126,66 135,70 125,74" />
      <polyline points="240,72 250,75 239,78" />
      <circle cx="180" cy="92" r="7" />
      <line x1="180" y1="88" x2="180" y2="96" />
    </IllustrationShell>
  );
}
