import {
  Activity,
  HardDrive,
  Network,
  Zap,
} from "lucide-react";

import { ExplainerCallout } from "@/components/ui/ExplainerCallout";
import { Section } from "@/components/ui/Section";

export default function NetworkPage() {
  return (
    <div>
      <Section
        eyebrow="512rede"
        title="Isolated high-speed cluster network"
        description="Dedicated trust domain for the cluster, separating management and storage traffic from the home LAN. The master routes and assigns IPs for the fabric."
      >
        <div className="flex flex-col gap-8 items-center">
          <div className="w-full max-w-4xl">
            <div className="glass-panel rounded-2xl border border-border/80 p-8 shadow-[0_18px_38px_rgba(5,8,16,0.35)]">
              <div className="flex flex-col gap-6">
                <div className="overflow-hidden">
                  <svg
                    viewBox="0 0 700 600"
                    className="h-auto w-full"
                    role="img"
                    aria-label="512rede network diagram"
                  >
                    <defs>
                      <marker
                        id="arrow-512"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#389088" />
                      </marker>

                      <marker
                        id="arrow-wan"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#8FA3BF" />
                      </marker>

                      <linearGradient id="internetGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(143, 163, 191, 0.3)" />
                        <stop offset="100%" stopColor="rgba(143, 163, 191, 0.05)" />
                      </linearGradient>

                      <linearGradient id="masterGlow512" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(56, 144, 136, 0.25)" />
                        <stop offset="100%" stopColor="rgba(56, 144, 136, 0.08)" />
                      </linearGradient>

                      {/* Internet/Globe Icon */}
                      <g id="icon-internet">
                        <circle cx="12" cy="12" r="10" fill="none" stroke="#8FA3BF" strokeWidth="2" />
                        <ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="#8FA3BF" strokeWidth="1.5" />
                        <line x1="2" y1="12" x2="22" y2="12" stroke="#8FA3BF" strokeWidth="1.5" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                          fill="none" stroke="#8FA3BF" strokeWidth="1.5" />
                      </g>

                      {/* Router Icon */}
                      <g id="icon-router">
                        <rect x="4" y="8" width="16" height="10" rx="2" fill="none" stroke="#389088" strokeWidth="2" />
                        <circle cx="8" cy="13" r="1" fill="#389088" />
                        <circle cx="12" cy="13" r="1" fill="#389088" />
                        <circle cx="16" cy="13" r="1" fill="#389088" />
                        <line x1="7" y1="5" x2="7" y2="8" stroke="#389088" strokeWidth="1.5" />
                        <line x1="12" y1="4" x2="12" y2="8" stroke="#389088" strokeWidth="1.5" />
                        <line x1="17" y1="5" x2="17" y2="8" stroke="#389088" strokeWidth="1.5" />
                      </g>

                      {/* Switch Icon */}
                      <g id="icon-switch">
                        <rect x="2" y="9" width="24" height="6" rx="1" fill="none" stroke="#389088" strokeWidth="2" />
                        <line x1="5.5" y1="12" x2="5.5" y2="12" stroke="#389088" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="9" y1="12" x2="9" y2="12" stroke="#389088" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="12.5" y1="12" x2="12.5" y2="12" stroke="#389088" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="16" y1="12" x2="16" y2="12" stroke="#389088" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="19.5" y1="12" x2="19.5" y2="12" stroke="#389088" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="23" y1="12" x2="23" y2="12" stroke="#389088" strokeWidth="1.5" strokeLinecap="round" />
                      </g>

                      {/* Server/Node Icon */}
                      <g id="icon-server">
                        <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="#389088" strokeWidth="2" />
                        <line x1="4" y1="9" x2="20" y2="9" stroke="#389088" strokeWidth="2" />
                        <line x1="4" y1="14" x2="20" y2="14" stroke="#389088" strokeWidth="2" />
                        <circle cx="7" cy="6.5" r="0.8" fill="#389088" />
                        <circle cx="7" cy="11.5" r="0.8" fill="#389088" />
                        <circle cx="7" cy="16.5" r="0.8" fill="#389088" />
                      </g>
                    </defs>

                    {/* Home Network Zone */}
                    <rect
                      x="40"
                      y="50"
                      width="250"
                      height="140"
                      rx="16"
                      fill="rgba(143, 163, 191, 0.08)"
                      stroke="rgba(143, 163, 191, 0.4)"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                    />
                    <text x="60" y="80" fill="#8FA3BF" fontSize="13" fontWeight="600">
                      Home Network
                    </text>
                    <text x="60" y="98" fill="#8FA3BF" fontSize="10" opacity="0.7">
                      (separated from cluster)
                    </text>

                    {/* 512rede Zone */}
                    <rect
                      x="40"
                      y="240"
                      width="620"
                      height="320"
                      rx="20"
                      fill="rgba(56, 144, 136, 0.06)"
                      stroke="rgba(56, 144, 136, 0.5)"
                      strokeWidth="3"
                    />
                    <text x="220" y="270" fill="#389088" fontSize="14" fontWeight="700">
                      512rede (Cluster Trust Domain)
                    </text>
                    <text x="220" y="288" fill="#389088" fontSize="10" opacity="0.8">
                      2.5G / 10G · DHCP: 192.168.76.0/24
                    </text>

                    {/* Internet */}
                    <g>
                      <rect
                        x="100"
                        y="120"
                        width="130"
                        height="50"
                        rx="12"
                        fill="url(#internetGlow)"
                        stroke="#8FA3BF"
                        strokeWidth="2"
                      />
                      <use href="#icon-internet" transform="translate(110 133) scale(1.1)" />
                      <text x="145" y="150" fill="#E6EDF7" fontSize="13" fontWeight="600">
                        Internet
                      </text>
                    </g>

                    {/* Master Node (Router + DHCP) */}
                    <g>
                      <rect
                        x="80"
                        y="310"
                        width="200"
                        height="110"
                        rx="14"
                        fill="url(#masterGlow512)"
                        stroke="#389088"
                        strokeWidth="3"
                      />
                      <use href="#icon-router" transform="translate(100 325) scale(1.4)" />
                      <text x="145" y="345" fill="#E6EDF7" fontSize="15" fontWeight="700">
                        Master Node
                      </text>
                      <text x="100" y="365" fill="#8FA3BF" fontSize="11">
                        • Router & DHCP Server
                      </text>
                      <text x="100" y="380" fill="#8FA3BF" fontSize="11">
                        • Nginx + Compute
                      </text>
                      <text x="100" y="395" fill="#8FA3BF" fontSize="11">
                        • 192.168.76.1
                      </text>
                    </g>

                    {/* Switch */}
                    <g>
                      <rect
                        x="370"
                        y="330"
                        width="180"
                        height="70"
                        rx="12"
                        fill="rgba(14, 21, 36, 0.9)"
                        stroke="#389088"
                        strokeWidth="2.5"
                      />
                      <use href="#icon-switch" transform="translate(390 348) scale(1.5)" />
                      <text x="455" y="368" fill="#E6EDF7" fontSize="14" fontWeight="600">
                        Switch
                      </text>
                      <text x="455" y="385" fill="#8FA3BF" fontSize="10">
                        2.5G or 10G
                      </text>
                    </g>

                    {/* Slave Nodes */}
                    <g>
                      <rect
                        x="370"
                        y="450"
                        width="130"
                        height="70"
                        rx="10"
                        fill="rgba(14, 21, 36, 0.85)"
                        stroke="#389088"
                        strokeWidth="2"
                      />
                      <use href="#icon-server" transform="translate(380 460) scale(0.9)" />
                      <text x="420" y="480" fill="#E6EDF7" fontSize="12" fontWeight="600">
                        Node B
                      </text>
                      <text x="420" y="495" fill="#8FA3BF" fontSize="9">
                        Slave
                      </text>
                      <text x="420" y="508" fill="#8FA3BF" fontSize="9">
                        192.168.76.2
                      </text>
                    </g>

                    <g>
                      <rect
                        x="520"
                        y="450"
                        width="130"
                        height="70"
                        rx="10"
                        fill="rgba(14, 21, 36, 0.85)"
                        stroke="#389088"
                        strokeWidth="2"
                      />
                      <use href="#icon-server" transform="translate(530 460) scale(0.9)" />
                      <text x="570" y="480" fill="#E6EDF7" fontSize="12" fontWeight="600">
                        Node C
                      </text>
                      <text x="570" y="495" fill="#8FA3BF" fontSize="9">
                        Slave
                      </text>
                      <text x="570" y="508" fill="#8FA3BF" fontSize="9">
                        192.168.76.3
                      </text>
                    </g>

                    {/* Connection Lines */}

                    {/* Internet to Master (crosses boundary) */}
                    <line
                      x1="165"
                      y1="170"
                      x2="165"
                      y2="310"
                      stroke="#8FA3BF"
                      strokeWidth="3"
                      markerEnd="url(#arrow-wan)"
                    />

                    {/* Master to Switch */}
                    <line
                      x1="280"
                      y1="365"
                      x2="370"
                      y2="365"
                      stroke="#389088"
                      strokeWidth="3"
                      markerEnd="url(#arrow-512)"
                      markerStart="url(#arrow-512)"
                    />
                    <text x="325" y="355" fill="#389088" fontSize="10" fontWeight="600" textAnchor="middle">
                      2.5G/10G
                    </text>

                    {/* Switch to Node B */}
                    <line
                      x1="435"
                      y1="400"
                      x2="435"
                      y2="450"
                      stroke="#389088"
                      strokeWidth="3"
                      markerEnd="url(#arrow-512)"
                    />

                    {/* Switch to Node C */}
                    <line
                      x1="490"
                      y1="400"
                      x2="550"
                      y2="450"
                      stroke="#389088"
                      strokeWidth="3"
                      markerEnd="url(#arrow-512)"
                    />

                    {/* Labels for traffic types */}
                    <g opacity="0.85">
                      <rect x="60" y="474" width="160" height="66" rx="8" fill="rgba(14, 21, 36, 0.95)"
                        stroke="#389088" strokeWidth="1.5" />
                      <text x="70" y="492" fill="#389088" fontSize="9" fontWeight="700">
                        Isolated Network:
                      </text>
                      <text x="70" y="506" fill="#8FA3BF" fontSize="8">
                        • VMs, Docker & cluster
                      </text>
                      <text x="70" y="518" fill="#8FA3BF" fontSize="8">
                        • NFS storage traffic
                      </text>
                      <text x="70" y="530" fill="#8FA3BF" fontSize="8">
                        • Backups & observability
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Network className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Cluster trust domain</p>
                      <p className="text-muted-foreground">Separated from home LAN</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">High-speed fabric</p>
                      <p className="text-muted-foreground">2.5G or 10G for cluster traffic</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Activity className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">DHCP server</p>
                      <p className="text-muted-foreground">Master manages IPs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <HardDrive className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Storage backbone</p>
                      <p className="text-muted-foreground">NFS and sync traffic stay local</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-2xl">
            <ExplainerCallout
              title="Why is 512rede more than a subnet?"
              why="512rede is the trust domain where HyperHive traffic lives: NFS, node sync, migrations, and observability. The master bridges the home LAN and the cluster fabric, running DHCP and routing so the cluster stays isolated but reachable by intent."
              links={[
                { label: "Architecture", href: "/architecture" },
                { label: "Features", href: "/features" },
              ]}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
