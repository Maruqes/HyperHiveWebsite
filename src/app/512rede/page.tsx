import {
  Boxes,
  HardDrive,
  Monitor,
  Router,
  Server,
  ShieldCheck,
} from "lucide-react";

import { ExplainerCallout } from "@/components/ui/ExplainerCallout";
import { Section } from "@/components/ui/Section";

const flows = {
  wireguard:
    "What: WireGuard tunnel\nWhy: Secure remote entry path\nHow: Terminates at the router and feeds Nginx routing",
  spa:
    "What: SPA trigger\nWhy: Opens access only when needed\nHow: Works with WireGuard to unlock routes for a limited window",
  nfs:
    "What: NFS traffic\nWhy: Shares storage across nodes\nHow: Feeds compute workloads and internal services",
  compute:
    "What: VM/Docker traffic\nWhy: Moves workloads between nodes and services\nHow: Uses shared storage and the 512rede fabric",
  nginx:
    "What: Nginx routing\nWhy: Single entry point for internal services\nHow: Receives traffic from the router and distributes requests",
};

export default function NetworkPage() {
  return (
    <div>
      <Section
        eyebrow="512rede"
        title="The glue that connects nodes and services"
        description="512rede ties clients, routers, cluster nodes, and internal services into a single fabric. It isolates traffic by zone and keeps access organized and explicit."
      >
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-5 text-sm text-muted-foreground">
              <p>
                Think of 512rede as a map and a contract. It separates LAN,
                512rede, and management traffic so storage and compute
                remain predictable while access stays controlled.
              </p>
              <div className="grid gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-[rgba(14,21,36,0.8)] text-accent">
                    <Monitor className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Clients stay in LAN
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Access moves through explicit tunnels and gates.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-[rgba(14,21,36,0.8)] text-accent">
                    <Server className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Nodes stay consistent
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Storage and compute share the same trusted paths.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-[rgba(14,21,36,0.8)] text-accent">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Access stays deliberate
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Routing only opens when WireGuard + SPA allow it.
                    </p>
                  </div>
                </div>
              </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="glass-panel rounded-2xl border border-border/80 p-6 shadow-[0_18px_38px_rgba(5,8,16,0.35)]">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Visual map
                </p>
                <div className="overflow-x-auto">
                  <svg
                    viewBox="0 0 900 460"
                    className="h-auto min-w-[860px] w-full"
                    role="img"
                    aria-label="512rede map"
                  >
                    <defs>
                      <marker
                        id="arrow-teal"
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#389088" />
                      </marker>
                      <marker
                        id="arrow-danger"
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#803030" />
                      </marker>
                    </defs>

                    <rect
                      x="40"
                      y="60"
                      width="360"
                      height="320"
                      rx="24"
                      fill="rgba(14, 21, 36, 0.45)"
                      stroke="rgba(56, 144, 136, 0.25)"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <text x="64" y="92" fill="#8FA3BF" fontSize="12">
                      LAN
                    </text>

                    <rect
                      x="240"
                      y="120"
                      width="620"
                      height="300"
                      rx="26"
                      fill="rgba(11, 19, 34, 0.45)"
                      stroke="rgba(56, 144, 136, 0.25)"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <text x="264" y="152" fill="#8FA3BF" fontSize="12">
                      512rede
                    </text>

                    <rect
                      x="560"
                      y="40"
                      width="300"
                      height="140"
                      rx="22"
                      fill="rgba(11, 19, 34, 0.4)"
                      stroke="rgba(143, 163, 191, 0.35)"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    <text x="584" y="74" fill="#8FA3BF" fontSize="12">
                      management
                    </text>

                    <g>
                      <rect
                        x="80"
                        y="210"
                        width="140"
                        height="70"
                        rx="14"
                        fill="rgba(14, 21, 36, 0.8)"
                        stroke="#1A2637"
                        strokeWidth="2"
                      />
                      <Monitor
                        x="94"
                        y="228"
                        width="20"
                        height="20"
                        color="#8FA3BF"
                      />
                      <text x="122" y="244" fill="#E6EDF7" fontSize="12" fontWeight="600">
                        Client
                      </text>
                      <text x="122" y="262" fill="#8FA3BF" fontSize="10">
                        Your PC
                      </text>
                    </g>

                    <g>
                      <rect
                        x="250"
                        y="210"
                        width="140"
                        height="70"
                        rx="14"
                        fill="rgba(14, 21, 36, 0.8)"
                        stroke="#1A2637"
                        strokeWidth="2"
                      />
                      <Router
                        x="264"
                        y="228"
                        width="20"
                        height="20"
                        color="#8FA3BF"
                      />
                      <text x="292" y="244" fill="#E6EDF7" fontSize="12" fontWeight="600">
                        Router/Switch
                      </text>
                      <text x="292" y="262" fill="#8FA3BF" fontSize="10">
                        Edge gateway
                      </text>
                    </g>

                    <g>
                      <rect
                        x="420"
                        y="140"
                        width="140"
                        height="60"
                        rx="12"
                        fill="rgba(14, 21, 36, 0.8)"
                        stroke="#1A2637"
                        strokeWidth="2"
                      />
                      <Server
                        x="434"
                        y="158"
                        width="20"
                        height="20"
                        color="#8FA3BF"
                      />
                      <text x="462" y="174" fill="#E6EDF7" fontSize="12" fontWeight="600">
                        NODE_A
                      </text>
                    </g>

                    <g>
                      <rect
                        x="420"
                        y="220"
                        width="140"
                        height="60"
                        rx="12"
                        fill="rgba(14, 21, 36, 0.8)"
                        stroke="#1A2637"
                        strokeWidth="2"
                      />
                      <Server
                        x="434"
                        y="238"
                        width="20"
                        height="20"
                        color="#8FA3BF"
                      />
                      <text x="462" y="254" fill="#E6EDF7" fontSize="12" fontWeight="600">
                        NODE_B
                      </text>
                    </g>

                    <g>
                      <rect
                        x="420"
                        y="300"
                        width="140"
                        height="60"
                        rx="12"
                        fill="rgba(14, 21, 36, 0.8)"
                        stroke="#1A2637"
                        strokeWidth="2"
                      />
                      <Server
                        x="434"
                        y="318"
                        width="20"
                        height="20"
                        color="#8FA3BF"
                      />
                      <text x="462" y="334" fill="#E6EDF7" fontSize="12" fontWeight="600">
                        NODE_C
                      </text>
                    </g>

                    <g>
                      <rect
                        x="620"
                        y="130"
                        width="180"
                        height="60"
                        rx="12"
                        fill="rgba(14, 21, 36, 0.8)"
                        stroke="#1A2637"
                        strokeWidth="2"
                      />
                      <HardDrive
                        x="636"
                        y="148"
                        width="20"
                        height="20"
                        color="#8FA3BF"
                      />
                      <text x="666" y="166" fill="#E6EDF7" fontSize="12" fontWeight="600">
                        Storage pool
                      </text>
                    </g>

                    <g>
                      <rect
                        x="620"
                        y="230"
                        width="180"
                        height="90"
                        rx="14"
                        fill="rgba(14, 21, 36, 0.8)"
                        stroke="#1A2637"
                        strokeWidth="2"
                      />
                      <Boxes
                        x="636"
                        y="252"
                        width="20"
                        height="20"
                        color="#8FA3BF"
                      />
                      <text x="666" y="268" fill="#E6EDF7" fontSize="12" fontWeight="600">
                        Internal services
                      </text>
                      <text x="666" y="286" fill="#8FA3BF" fontSize="10">
                        Apps / APIs
                      </text>
                    </g>

                    <g className="transition-opacity hover:opacity-100" opacity="0.7">
                      <title>{flows.wireguard}</title>
                      <path
                        d="M 220 245 L 250 245"
                        stroke="#389088"
                        strokeWidth="3"
                        markerEnd="url(#arrow-teal)"
                        pointerEvents="stroke"
                      />
                      <text x="228" y="232" fill="#8FA3BF" fontSize="10">
                        WireGuard tunnel
                      </text>
                    </g>

                    <g className="transition-opacity hover:opacity-100" opacity="0.75">
                      <title>{flows.spa}</title>
                      <path
                        d="M 220 272 L 250 272"
                        stroke="#803030"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                        markerEnd="url(#arrow-danger)"
                        pointerEvents="stroke"
                      />
                      <text x="230" y="290" fill="#803030" fontSize="10">
                        SPA trigger
                      </text>
                    </g>

                    <g className="transition-opacity hover:opacity-100" opacity="0.7">
                      <title>{flows.nginx}</title>
                      <path
                        d="M 390 245 L 620 270"
                        stroke="#389088"
                        strokeWidth="3"
                        markerEnd="url(#arrow-teal)"
                        pointerEvents="stroke"
                      />
                      <text x="430" y="232" fill="#8FA3BF" fontSize="10">
                        Nginx routing
                      </text>
                    </g>

                    <g className="transition-opacity hover:opacity-100" opacity="0.7">
                      <title>{flows.nfs}</title>
                      <path
                        d="M 620 160 L 560 175"
                        stroke="#389088"
                        strokeWidth="3"
                        markerEnd="url(#arrow-teal)"
                        pointerEvents="stroke"
                      />
                      <text x="560" y="150" fill="#8FA3BF" fontSize="10">
                        NFS traffic
                      </text>
                    </g>

                    <g className="transition-opacity hover:opacity-100" opacity="0.7">
                      <title>{flows.compute}</title>
                      <path
                        d="M 560 260 L 620 275"
                        stroke="#389088"
                        strokeWidth="3"
                        markerEnd="url(#arrow-teal)"
                        pointerEvents="stroke"
                      />
                      <text x="520" y="290" fill="#8FA3BF" fontSize="10">
                        VM/Docker traffic
                      </text>
                    </g>
                  </svg>
                </div>
                <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="h-[2px] w-6 rounded-full bg-accent" />
                    <span>Normal flow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-[2px] w-6 rounded-full bg-[#803030]" />
                    <span>Blocked / closed</span>
                  </div>
                </div>
              </div>
            </div>
            <ExplainerCallout
              title="Why isolate the zones?"
              why="The map keeps storage, compute, and access on deliberate paths so each flow stays predictable and auditable."
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
