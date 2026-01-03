import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type IconName =
  | "disks"
  | "raid"
  | "health"
  | "nfs"
  | "vm"
  | "docker"
  | "k8"
  | "vpn"
  | "spa"
  | "nginx"
  | "backup"
  | "logs"
  | "updates";

type IconProps = {
  name: IconName;
  className?: string;
  title?: string;
};

type IconShellProps = {
  children: ReactNode;
  className?: string;
  title?: string;
};

function IconShell({ children, className, title }: IconShellProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6 text-accent", className)}
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function HyperHiveIcon({ name, className, title }: IconProps) {
  switch (name) {
    case "disks":
      return (
        <IconShell className={className} title={title ?? "Disks"}>
          <rect x="4" y="5" width="16" height="4" rx="2" />
          <rect x="4" y="10" width="16" height="4" rx="2" />
          <rect x="4" y="15" width="16" height="4" rx="2" />
        </IconShell>
      );
    case "raid":
      return (
        <IconShell className={className} title={title ?? "RAID"}>
          <rect x="3" y="6" width="7" height="12" rx="2" />
          <rect x="14" y="6" width="7" height="12" rx="2" />
          <line x1="10.5" y1="12" x2="13.5" y2="12" />
          <line x1="12" y1="10.5" x2="12" y2="13.5" />
        </IconShell>
      );
    case "health":
      return (
        <IconShell className={className} title={title ?? "Health"}>
          <path d="M4 12h4l2-4 3 8 2-4h5" />
          <circle cx="18" cy="6" r="2" />
        </IconShell>
      );
    case "nfs":
      return (
        <IconShell className={className} title={title ?? "NFS share"}>
          <circle cx="6" cy="8" r="2" />
          <circle cx="18" cy="8" r="2" />
          <circle cx="12" cy="16" r="2" />
          <line x1="8" y1="8" x2="10" y2="8" />
          <line x1="14" y1="8" x2="16" y2="8" />
          <line x1="11" y1="10" x2="12" y2="14" />
          <line x1="13" y1="10" x2="12" y2="14" />
        </IconShell>
      );
    case "vm":
      return (
        <IconShell className={className} title={title ?? "Virtual machine"}>
          <rect x="4" y="5" width="16" height="11" rx="2" />
          <rect x="8" y="17" width="8" height="2" rx="1" />
          <rect x="7" y="8" width="4" height="4" rx="1" />
          <rect x="13" y="8" width="4" height="4" rx="1" />
        </IconShell>
      );
    case "docker":
      return (
        <IconShell className={className} title={title ?? "Docker"}>
          <rect x="4" y="10" width="6" height="5" rx="1" />
          <rect x="11" y="10" width="6" height="5" rx="1" />
          <rect x="7" y="6" width="6" height="4" rx="1" />
          <rect x="14" y="6" width="6" height="4" rx="1" />
        </IconShell>
      );
    case "k8":
      return (
        <IconShell className={className} title={title ?? "K8"}>
          <path d="M12 4l6 3.5v9L12 20l-6-3.5v-9z" />
          <circle cx="12" cy="12" r="2" />
          <line x1="12" y1="6.5" x2="12" y2="10" />
          <line x1="16" y1="9" x2="13.5" y2="11" />
          <line x1="8" y1="9" x2="10.5" y2="11" />
        </IconShell>
      );
    case "vpn":
      return (
        <IconShell className={className} title={title ?? "Shield VPN"}>
          <path d="M12 4l6 2.5v5c0 4-3 6.5-6 8-3-1.5-6-4-6-8v-5z" />
          <path d="M9.5 11.5h5v3h-5z" />
          <path d="M10.5 11.5v-1.5a1.5 1.5 0 0 1 3 0v1.5" />
        </IconShell>
      );
    case "spa":
      return (
        <IconShell className={className} title={title ?? "SPA key"}>
          <circle cx="8" cy="12" r="3" />
          <line x1="11" y1="12" x2="20" y2="12" />
          <line x1="16" y1="12" x2="16" y2="9.5" />
          <line x1="18" y1="12" x2="18" y2="10" />
        </IconShell>
      );
    case "nginx":
      return (
        <IconShell className={className} title={title ?? "Nginx routing"}>
          <path d="M5 7h7l3 5-3 5H5z" />
          <path d="M14 7h5v10h-5" />
          <path d="M10 12h9" />
        </IconShell>
      );
    case "backup":
      return (
        <IconShell className={className} title={title ?? "Backup"}>
          <path d="M6 6c0-1.1 3-2 6-2s6 .9 6 2v3c0 1.1-3 2-6 2s-6-.9-6-2z" />
          <path d="M6 9v3c0 1.1 3 2 6 2s6-.9 6-2V9" />
          <path d="M12 14v6" />
          <path d="M9 17l3 3 3-3" />
        </IconShell>
      );
    case "logs":
      return (
        <IconShell className={className} title={title ?? "Logs"}>
          <rect x="5" y="4.5" width="14" height="15" rx="2" />
          <line x1="8" y1="8" x2="16" y2="8" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="8" y1="16" x2="13" y2="16" />
        </IconShell>
      );
    case "updates":
      return (
        <IconShell className={className} title={title ?? "Updates"}>
          <path d="M4 12a8 8 0 0 1 13-5" />
          <path d="M17 7V4h3" />
          <path d="M20 12a8 8 0 0 1-13 5" />
          <path d="M7 17v3H4" />
        </IconShell>
      );
    default:
      return null;
  }
}

export type { IconName };
