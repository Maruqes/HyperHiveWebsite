import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CircuitBoard,
  Layers,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { DiagramFrame } from "@/components/ui/DiagramFrame";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";

const problemPoints = [
  {
    title: "Fragmented infra",
    description:
      "Servers, NAS, and devices live in islands, making context hard to assemble.",
    icon: Network,
  },
  {
    title: "Fragile storage",
    description:
      "Without centralized health, failure risk grows and backups stay reactive.",
    icon: Layers,
  },
  {
    title: "Painful migrations",
    description:
      "Moving workloads across hosts demands manual planning and interrupts services.",
    icon: Workflow,
  },
  {
    title: "Insecure access and routing",
    description:
      "Front doors, VPNs, and rules drift, creating gaps in the perimeter.",
    icon: ShieldCheck,
  },
];

const solutionBlocks = [
  {
    title: "Healthy storage fabric",
    description:
      "BTRFS/RAIDs with health telemetry to inform NFS decisions.",
    icon: Layers,
  },
  {
    title: "Orchestrated compute",
    description:
      "VMs, Docker, and K8 share the same inventory and control plane.",
    icon: CircuitBoard,
  },
  {
    title: "Edge and secure access",
    description:
      "Nginx and WireGuard/SPA control the perimeter and protect critical routes.",
    icon: ShieldCheck,
  },
  {
    title: "Continuous observability",
    description:
      "Logs, updates, and backups return signals that close the operational loop.",
    icon: Activity,
  },
];

const useCases = [
  {
    title: "Homelab and internal services",
    description:
      "Clear linkage between NAS, compute, and remote access with traceability.",
  },
  {
    title: "Game servers",
    description:
      "Predictable routes, controlled migrations, and fast recovery when failures hit.",
  },
  {
    title: "CI/Dev",
    description:
      "Pipelines and runners tied to the same inventory and observability loop.",
  },
  {
    title: "Backups and resilience",
    description:
      "Storage health linked to retention policies and restore routines.",
  },
];

const hoverCard =
  "group transition duration-300 hover:-translate-y-1 hover:border-accent/70 hover:shadow-[0_24px_44px_rgba(56,144,136,0.18)]";

export default function Home() {
  return (
    <div>
      <Section className="pt-24 sm:pt-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Home infrastructure / Orchestrated cluster
              </span>
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
                HyperHive
              </h1>
              <p className="text-lg text-muted-foreground">
                An operating layer for small or distributed infrastructure, where
                storage, compute, and access have to behave as one system.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/architecture"
                  className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-[rgba(14,21,36,0.85)] px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/60"
                >
                  View architecture
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/512rede"
                  className="inline-flex items-center gap-2 rounded-full border border-transparent bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
                >
                  How 512rede works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <Card className={`flex h-full flex-col gap-6 ${hoverCard}`}>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Why now
              </p>
              <div className="flex flex-col gap-3 text-base text-foreground">
                <p>
                  Home infrastructure is no longer a hobby. It is a living
                  cluster that needs resilience, governance, and fast feedback.
                </p>
                <p className="text-sm text-muted-foreground">
                  HyperHive ties storage, compute, edge, and access into one
                  narrative to reduce risk and increase clarity.
                </p>
              </div>
            </Card>
        </div>
      </Section>

      <Section
        eyebrow="Problem"
        title="When everything grows, context disappears"
        description="Without a single plan, each piece evolves in isolation and raises operational risk."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problemPoints.map((item) => (
              <Card key={item.title} className={hoverCard}>
                <div className="flex flex-col gap-4">
                  <IconBadge>
                    <item.icon className="h-5 w-5" />
                  </IconBadge>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Solution"
        title="HyperHive connects the pieces and explains why"
        description="Each block reduces risk and fits into a single decision-to-execution chain."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {solutionBlocks.map((item) => (
              <Card key={item.title} className={hoverCard}>
                <div className="flex flex-col gap-4">
                  <IconBadge>
                    <item.icon className="h-5 w-5" />
                  </IconBadge>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How it fits together"
        title="From storage to feedback, without gaps"
        description="A simple flow where each layer feeds the next and returns signals to the start."
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <DiagramFrame
              title="High-level flow"
              description="The diagram translates the technical chain with no hidden magic."
            >
              <div className="overflow-x-auto">
                <svg
                  viewBox="0 0 860 180"
                  className="h-auto min-w-[720px] w-full"
                  role="img"
                  aria-label="Storage to Observability"
                >
                  <defs>
                    <marker
                      id="arrow"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                    </marker>
                  </defs>
                  <line
                    x1="140"
                    y1="68"
                    x2="156"
                    y2="68"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent/50"
                    markerEnd="url(#arrow)"
                  />
                  <line
                    x1="276"
                    y1="68"
                    x2="292"
                    y2="68"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent/50"
                    markerEnd="url(#arrow)"
                  />
                  <line
                    x1="412"
                    y1="68"
                    x2="428"
                    y2="68"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent/50"
                    markerEnd="url(#arrow)"
                  />
                  <line
                    x1="548"
                    y1="68"
                    x2="564"
                    y2="68"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent/50"
                    markerEnd="url(#arrow)"
                  />
                  <line
                    x1="684"
                    y1="68"
                    x2="700"
                    y2="68"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent/50"
                    markerEnd="url(#arrow)"
                  />

                  <g className="group cursor-default text-accent/70 transition-colors hover:text-accent">
                    <rect
                      x="20"
                      y="40"
                      width="120"
                      height="56"
                      rx="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="fill-transparent transition-colors group-hover:fill-[rgba(56,144,136,0.12)]"
                    />
                    <text x="80" y="68" textAnchor="middle" fill="#E6EDF7" fontSize="12">
                      Storage
                    </text>
                    <text x="80" y="84" textAnchor="middle" fill="#8FA3BF" fontSize="10">
                      BTRFS/RAIDs + health
                    </text>
                  </g>

                  <g className="group cursor-default text-accent/70 transition-colors hover:text-accent">
                    <rect
                      x="156"
                      y="40"
                      width="120"
                      height="56"
                      rx="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="fill-transparent transition-colors group-hover:fill-[rgba(56,144,136,0.12)]"
                    />
                    <text x="216" y="70" textAnchor="middle" fill="#E6EDF7" fontSize="12">
                      NFS
                    </text>
                  </g>

                  <g className="group cursor-default text-accent/70 transition-colors hover:text-accent">
                    <rect
                      x="292"
                      y="40"
                      width="120"
                      height="56"
                      rx="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="fill-transparent transition-colors group-hover:fill-[rgba(56,144,136,0.12)]"
                    />
                    <text x="352" y="68" textAnchor="middle" fill="#E6EDF7" fontSize="12">
                      Compute
                    </text>
                    <text x="352" y="84" textAnchor="middle" fill="#8FA3BF" fontSize="10">
                      VMs/Docker/K8
                    </text>
                  </g>

                  <g className="group cursor-default text-accent/70 transition-colors hover:text-accent">
                    <rect
                      x="428"
                      y="40"
                      width="120"
                      height="56"
                      rx="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="fill-transparent transition-colors group-hover:fill-[rgba(56,144,136,0.12)]"
                    />
                    <text x="488" y="68" textAnchor="middle" fill="#E6EDF7" fontSize="12">
                      Edge
                    </text>
                    <text x="488" y="84" textAnchor="middle" fill="#8FA3BF" fontSize="10">
                      Nginx
                    </text>
                  </g>

                  <g className="group cursor-default text-accent/70 transition-colors hover:text-accent">
                    <rect
                      x="564"
                      y="40"
                      width="120"
                      height="56"
                      rx="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="fill-transparent transition-colors group-hover:fill-[rgba(56,144,136,0.12)]"
                    />
                    <text x="624" y="68" textAnchor="middle" fill="#E6EDF7" fontSize="12">
                      Access
                    </text>
                    <text x="624" y="84" textAnchor="middle" fill="#8FA3BF" fontSize="10">
                      WireGuard/SPA
                    </text>
                  </g>

                  <g className="group cursor-default text-accent/70 transition-colors hover:text-accent">
                    <rect
                      x="700"
                      y="40"
                      width="120"
                      height="56"
                      rx="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="fill-transparent transition-colors group-hover:fill-[rgba(56,144,136,0.12)]"
                    />
                    <text x="760" y="68" textAnchor="middle" fill="#E6EDF7" fontSize="12">
                      Observability
                    </text>
                    <text x="760" y="84" textAnchor="middle" fill="#8FA3BF" fontSize="10">
                      Logs/Updates/Backups
                    </text>
                  </g>
                </svg>
              </div>
            </DiagramFrame>
            <Card className={hoverCard}>
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  How it fits
                </p>
                <p className="text-base text-foreground">
                  Storage defines the base, NFS distributes, compute executes,
                  edge exposes, access controls, and observability validates.
                  Each block returns signals to tune the previous one.
                </p>
                <p className="text-sm text-muted-foreground">
                  The result is a chain that is easy to reason about and easy to
                  maintain when something fails.
                </p>
              </div>
            </Card>
        </div>
      </Section>

      <Section
        eyebrow="Use cases"
        title="Examples where the flow helps"
        description="Real scenarios where layer linkage avoids manual work."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => (
              <Card key={item.title} className={hoverCard}>
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="CTA"
        title="Want the full flow?"
        description="The architecture page details the layers and how each one connects."
        align="center"
      >
          <Link
            href="/architecture"
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-[rgba(14,21,36,0.85)] px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent/60"
          >
            Go to Architecture
            <ArrowRight className="h-4 w-4" />
          </Link>
      </Section>
    </div>
  );
}
