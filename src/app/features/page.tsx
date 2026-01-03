import {
  Boxes,
  DatabaseBackup,
  Disc3,
  FileText,
  Globe,
  HardDrive,
  KeyRound,
  Layers,
  MonitorCog,
  Network,
  Plug,
  RefreshCw,
  Share2,
  ShieldCheck,
} from "lucide-react";
import type { ComponentType } from "react";

import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";

type FeatureItem = {
  title: string;
  icon: ComponentType<{ className?: string }>;
  summary: string;
  depends: string[];
  feeds: string[];
  diagram: {
    left: string;
    middle: string;
    right: string;
  };
};

const features: FeatureItem[] = [
  {
    title: "BTRFS/RAIDs",
    icon: HardDrive,
    summary: "Storage base with redundancy and health signals for the stack.",
    depends: ["SmartDisk", "Auto-Mounts"],
    feeds: ["NFS", "Backups", "Auto-Backups"],
    diagram: {
      left: "Disks",
      middle: "BTRFS",
      right: "NFS",
    },
  },
  {
    title: "Auto-Mounts",
    icon: Plug,
    summary: "Consistent mounts on boot and during node changes.",
    depends: ["BTRFS/RAIDs"],
    feeds: ["SmartDisk", "NFS"],
    diagram: {
      left: "BTRFS",
      middle: "Mounts",
      right: "NFS",
    },
  },
  {
    title: "SmartDisk",
    icon: Layers,
    summary: "Disk health, failure detection, and automated responses.",
    depends: ["BTRFS/RAIDs"],
    feeds: ["Auto-Mounts", "Backups"],
    diagram: {
      left: "Health",
      middle: "SmartDisk",
      right: "Backups",
    },
  },
  {
    title: "NFS",
    icon: Share2,
    summary: "Exposes shared storage to the cluster with stable paths.",
    depends: ["BTRFS/RAIDs", "Auto-Mounts"],
    feeds: ["Virtual Machines", "Docker: Images", "K8 Cluster"],
    diagram: {
      left: "Storage",
      middle: "NFS",
      right: "Compute",
    },
  },
  {
    title: "ISOs",
    icon: Disc3,
    summary: "Shared ISO library for VM installs and recovery.",
    depends: ["NFS"],
    feeds: ["Virtual Machines"],
    diagram: {
      left: "NFS",
      middle: "ISOs",
      right: "VMs",
    },
  },
  {
    title: "Virtual Machines",
    icon: MonitorCog,
    summary: "VM workloads on shared storage for mobility and consistency.",
    depends: ["NFS", "ISOs"],
    feeds: ["Backups", "Logs"],
    diagram: {
      left: "NFS",
      middle: "VMs",
      right: "Backups",
    },
  },
  {
    title: "Backups",
    icon: DatabaseBackup,
    summary: "Recovery points for volumes, VMs, and configs.",
    depends: ["BTRFS/RAIDs", "Virtual Machines"],
    feeds: ["Auto-Backups", "Logs"],
    diagram: {
      left: "Volumes",
      middle: "Backups",
      right: "Logs",
    },
  },
  {
    title: "Auto-Backups",
    icon: RefreshCw,
    summary: "Schedules and verifies backups without manual runs.",
    depends: ["Backups", "SmartDisk"],
    feeds: ["Logs"],
    diagram: {
      left: "Backups",
      middle: "Auto",
      right: "Logs",
    },
  },
  {
    title: "WireGuard VPN",
    icon: ShieldCheck,
    summary: "Secure tunnel into 512rede for remote access.",
    depends: ["SPA"],
    feeds: ["Nginx"],
    diagram: {
      left: "SPA",
      middle: "WG",
      right: "Nginx",
    },
  },
  {
    title: "K8 Cluster",
    icon: Network,
    summary: "Schedules containers across nodes using shared storage.",
    depends: ["NFS", "Docker: Images"],
    feeds: ["Nginx", "Logs"],
    diagram: {
      left: "NFS",
      middle: "K8",
      right: "Nginx",
    },
  },
  {
    title: "SPA",
    icon: KeyRound,
    summary: "Opens access only when triggered, reducing surface area.",
    depends: ["WireGuard VPN"],
    feeds: ["Nginx"],
    diagram: {
      left: "Client",
      middle: "SPA",
      right: "WG",
    },
  },
  {
    title: "Updates",
    icon: RefreshCw,
    summary: "Controlled updates for nodes and services.",
    depends: ["Backups", "Logs"],
    feeds: ["Logs"],
    diagram: {
      left: "Backups",
      middle: "Updates",
      right: "Logs",
    },
  },
  {
    title: "Logs",
    icon: FileText,
    summary: "Operational signals for troubleshooting and change tracking.",
    depends: ["Nginx", "K8 Cluster", "Virtual Machines"],
    feeds: ["Updates"],
    diagram: {
      left: "Services",
      middle: "Logs",
      right: "Updates",
    },
  },
  {
    title: "Nginx: Proxy / Certificates / Redirection / Streams / 404",
    icon: Globe,
    summary: "Single entry for internal services with routing and certs.",
    depends: ["WireGuard VPN", "SPA"],
    feeds: ["Logs"],
    diagram: {
      left: "Access",
      middle: "Nginx",
      right: "Apps",
    },
  },
  {
    title: "Docker: Images",
    icon: Boxes,
    summary: "Image storage for repeatable container builds.",
    depends: ["NFS"],
    feeds: ["K8 Cluster", "Nginx"],
    diagram: {
      left: "NFS",
      middle: "Images",
      right: "K8",
    },
  },
];

function MiniDiagram({
  left,
  middle,
  right,
}: FeatureItem["diagram"]) {
  return (
    <svg
      viewBox="0 0 240 64"
      className="h-16 w-full"
      role="img"
      aria-label="Integration mini diagram"
    >
      <defs>
        <marker
          id="mini-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#389088" />
        </marker>
      </defs>
      <line
        x1="76"
        y1="32"
        x2="104"
        y2="32"
        stroke="#389088"
        strokeWidth="2"
        markerEnd="url(#mini-arrow)"
      />
      <line
        x1="156"
        y1="32"
        x2="184"
        y2="32"
        stroke="#389088"
        strokeWidth="2"
        markerEnd="url(#mini-arrow)"
      />
      {[
        { x: 6, label: left },
        { x: 88, label: middle },
        { x: 170, label: right },
      ].map((node) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y="12"
            width="64"
            height="40"
            rx="10"
            fill="rgba(14, 21, 36, 0.8)"
            stroke="rgba(56, 144, 136, 0.35)"
            strokeWidth="1.5"
          />
          <text
            x={node.x + 32}
            y="36"
            textAnchor="middle"
            fill="#E6EDF7"
            fontSize="10"
            fontWeight="600"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const hoverCard =
  "group transition duration-300 hover:-translate-y-1 hover:border-accent/70 hover:shadow-[0_24px_44px_rgba(56,144,136,0.18)]";

export default function FeaturesPage() {
  return (
    <div>
      <Section
        eyebrow="Features"
        title="A catalog that explains integration"
        description="Each feature is a building block. The cards show what it does, what it depends on, and what it feeds next."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
              <Card
                key={feature.title}
                className={`flex h-full flex-col gap-4 ${hoverCard}`}
              >
                <div className="flex items-start gap-3">
                  <IconBadge>
                    <feature.icon className="h-5 w-5" />
                  </IconBadge>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.summary}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Depends on
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {feature.depends.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/80 bg-[rgba(14,21,36,0.75)] px-3 py-1 text-xs text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      Feeds
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {feature.feeds.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/80 bg-[rgba(14,21,36,0.75)] px-3 py-1 text-xs text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border/80 bg-[rgba(14,21,36,0.6)] p-3">
                  <MiniDiagram {...feature.diagram} />
                </div>
              </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
