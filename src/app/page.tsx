import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Boxes,
  CheckCircle2,
  CircuitBoard,
  Layers,
  Network,
  Shield,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";

const principles = [
  {
    icon: Layers,
    title: "Layered Design",
    description:
      "Storage, network, compute, edge, access, and operations are defined as layers that depend on each other.",
  },
  {
    icon: CircuitBoard,
    title: "Shared Storage Backbone",
    description:
      "BTRFS RAID, auto-mounts, and disk health make storage reliable before anything runs on top.",
  },
  {
    icon: Shield,
    title: "Compute with Mobility",
    description:
      "VMs, Docker, and Kubernetes use shared storage so workloads stay portable and consistent.",
  },
  {
    icon: Activity,
    title: "Controlled Access & Operations",
    description:
      "WireGuard + SPA gate entry, while backups, updates, and logs keep the system operable.",
  },
];

const features = [
  "Layered architecture from storage to operations",
  "Shared NFS storage across the 512rede fabric",
  "Compute stacks: VMs, Docker, Kubernetes",
  "Edge routing with Nginx and TLS certificates",
  "VM-focused backups with retention policies",
  "Central logs and disk health signals",
];

const stats = [
  { value: "7", label: "Architectural Layers" },
  { value: "20", label: "Core Features" },
  { value: "1", label: "Cluster Trust Domain" },
  { value: "0", label: "Cloud Dependencies" },
];

const hoverCard =
  "group transition-all duration-300 hover:-translate-y-1 hover:border-accent/70 hover:shadow-[0_24px_44px_rgba(56,144,136,0.18)]";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(56,144,136,0.15)_0%,_transparent_70%)] blur-3xl" />
        </div>

        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <div className="flex items-center justify-center">
            <Image
              src="/static/android-chrome-192x192.png"
              alt="HyperHive"
              width={96}
              height={96}
              className="h-24 w-24"
              priority
            />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              HyperHive
            </h1>
            <p className="text-xl text-accent sm:text-2xl">
              Cluster Orchestration System
            </p>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            A connective orchestration layer that turns a pile of machines into a coherent system.
            Storage, network, compute, access, and operations work as one. Built for homelabs and
            small clusters that need consistency as they grow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-accent/30"
            >
              Explore Features
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 rounded-full border-2 border-border/80 bg-transparent px-6 py-3.5 text-base font-semibold text-foreground transition-all hover:border-accent/60 hover:bg-[rgba(56,144,136,0.1)]"
            >
              View Architecture
              <Boxes className="h-5 w-5" />
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 rounded-2xl border border-border/50 bg-[rgba(14,21,36,0.6)] p-4 backdrop-blur-sm"
              >
                <span className="font-display text-3xl font-bold text-accent">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Core Principles */}
      <Section
        eyebrow="Foundation"
        title="Built on Four Core Principles"
        description="Each layer feeds the next, reducing chaos and making dependencies explicit."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {principles.map((principle) => (
            <Card key={principle.title} className={hoverCard}>
              <div className="flex flex-col gap-4">
                <IconBadge className="h-12 w-12">
                  <principle.icon className="h-6 w-6" />
                </IconBadge>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* The Flow */}
      <Section
        eyebrow="How It Works"
        title="A Clear Path from Storage to Service"
        description="HyperHive organizes your infrastructure into logical layers that build on each other."
      >
        <Card className="overflow-hidden border-accent/20">
          <div className="p-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                      1
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Storage Foundation
                    </h4>
                  </div>
                  <p className="ml-11 text-sm text-muted-foreground">
                    BTRFS RAID, auto-mounts, and SmartDisk keep storage consistent and healthy.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                      2
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Network Distribution
                    </h4>
                  </div>
                  <p className="ml-11 text-sm text-muted-foreground">
                    NFS turns local disks into shared cluster storage over the 512rede fabric.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                      3
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Compute Layer
                    </h4>
                  </div>
                  <p className="ml-11 text-sm text-muted-foreground">
                    VMs, Docker, and Kubernetes run on shared storage for mobility and consistency.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                      4
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Edge & Access
                    </h4>
                  </div>
                  <p className="ml-11 text-sm text-muted-foreground">
                    Nginx handles routing and TLS, while WireGuard + SPA control who can reach services.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                      5
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Operations Layer
                    </h4>
                  </div>
                  <p className="ml-11 text-sm text-muted-foreground">
                    VM backups, updates, and centralized logs close the operational loop.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-accent/30 bg-[rgba(56,144,136,0.05)] p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    <h4 className="font-semibold text-foreground">Key Benefits</h4>
                  </div>
                  <ul className="space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border/50 bg-[rgba(14,21,36,0.6)] p-6">
                  <h4 className="mb-3 font-semibold text-foreground">
                    Everything Connected
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Each layer depends on the one below and feeds the one above. That keeps
                    relationships explicit, failures traceable, and the stack easier to evolve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Use Cases */}
      <Section
        eyebrow="Built For"
        title="Perfect for Modern Infrastructure Needs"
        description="Whether you're running a homelab, managing a lab cluster, or powering a small team."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className={hoverCard}>
            <div className="flex flex-col gap-3">
              <IconBadge className="h-10 w-10">
                <Network className="h-5 w-5" />
              </IconBadge>
              <h3 className="text-lg font-semibold text-foreground">
                Homelabs & Self-Hosting
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Bring order to a growing homelab with consistent storage, access, and recovery paths.
              </p>
            </div>
          </Card>

          <Card className={hoverCard}>
            <div className="flex flex-col gap-3">
              <IconBadge className="h-10 w-10">
                <CircuitBoard className="h-5 w-5" />
              </IconBadge>
              <h3 className="text-lg font-semibold text-foreground">
                Development & CI/CD
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Spin up dev environments, test deployments, and iterate without manual rewiring.
              </p>
            </div>
          </Card>

          <Card className={hoverCard}>
            <div className="flex flex-col gap-3">
              <IconBadge className="h-10 w-10">
                <ShieldCheck className="h-5 w-5" />
              </IconBadge>
              <h3 className="text-lg font-semibold text-foreground">
                Small Teams & Studios
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Cost-effective infrastructure with predictable access, backups, and logs.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-24">
        <Card className="overflow-hidden border-accent/30 bg-gradient-to-br from-[rgba(56,144,136,0.1)] to-transparent">
          <div className="p-12 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Ready to Take Control?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Explore the architecture, review the 20 features across 7 layers, or learn how
              512rede acts as the cluster trust domain.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/architecture"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-[rgba(14,21,36,0.85)] px-6 py-3 text-base font-semibold text-foreground transition-all hover:border-accent/60 hover:bg-[rgba(14,21,36,0.95)]"
              >
                View Architecture
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 rounded-full border border-transparent bg-accent px-6 py-3 text-base font-semibold text-accent-foreground transition-all hover:scale-105"
              >
                Explore All Features
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
