import { Section } from "@/components/ui/Section";

export default function ArchitecturePage() {
  return (
    <div>
      <Section
        eyebrow="Architecture"
        title="Node-local storage, cluster-wide access"
        description="The master sits inside the compute pool, receives endpoints, routes by IP, and every node shares its BTRFS RAID over NFS."
      >
        <div className="glass-panel rounded-2xl border border-border/80 p-8 shadow-[0_18px_38px_rgba(5,8,16,0.35)]">
          <svg
            viewBox="0 0 800 1000"
            className="w-full h-auto max-w-3xl mx-auto"
            role="img"
            aria-label="Master routes traffic to compute nodes using NFS shared storage"
          >
            <defs>
              <marker
                id="arch-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#389088" />
              </marker>

              <linearGradient id="masterGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(56, 144, 136, 0.2)" />
                <stop offset="100%" stopColor="rgba(56, 144, 136, 0.05)" />
              </linearGradient>

              <g
                id="icon-disk"
                fill="none"
                stroke="#389088"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="12" cy="6.5" rx="7" ry="3" />
                <path d="M5 6.5v8.5c0 1.7 3.1 3 7 3s7-1.3 7-3V6.5" />
                <path d="M5 11c0 1.7 3.1 3 7 3s7-1.3 7-3" />
              </g>

              <g
                id="icon-nfs"
                fill="none"
                stroke="#389088"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="6" cy="8" r="2" />
                <circle cx="18" cy="8" r="2" />
                <circle cx="12" cy="16" r="2" />
                <line x1="8" y1="8" x2="10" y2="8" />
                <line x1="14" y1="8" x2="16" y2="8" />
                <line x1="11" y1="10" x2="12" y2="14" />
                <line x1="13" y1="10" x2="12" y2="14" />
              </g>

              <g
                id="icon-nginx"
                fill="none"
                stroke="#389088"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 7h7l3 5-3 5H5z" />
                <path d="M14 7h5v10h-5" />
                <path d="M10 12h9" />
              </g>
            </defs>

            {/* Endpoints Entry Point */}
            <rect
              x="250"
              y="40"
              width="300"
              height="80"
              rx="16"
              fill="rgba(14, 21, 36, 0.9)"
              stroke="rgba(56, 144, 136, 0.6)"
              strokeWidth="3"
            />
            <text x="400" y="75" textAnchor="middle" fill="#E6EDF7" fontSize="18" fontWeight="700">
              API Endpoints
            </text>
            <text x="400" y="100" textAnchor="middle" fill="#8FA3BF" fontSize="14">
              /app, /stream, /api
            </text>

            {/* Flow Arrow 1 */}
            <line
              x1="400"
              y1="120"
              x2="400"
              y2="180"
              stroke="#389088"
              strokeWidth="3"
              markerEnd="url(#arch-arrow)"
              strokeDasharray="5,5"
            />
            <text x="420" y="155" fill="#8FA3BF" fontSize="13">
              Request
            </text>

            {/* Master Node */}
            <rect
              x="200"
              y="180"
              width="400"
              height="220"
              rx="18"
              fill="url(#masterGlow)"
              stroke="rgba(56, 144, 136, 0.8)"
              strokeWidth="3"
            />
            <rect
              x="220"
              y="200"
              width="360"
              height="180"
              rx="14"
              fill="rgba(14, 21, 36, 0.95)"
              stroke="rgba(56, 144, 136, 0.7)"
              strokeWidth="2"
            />

            <use href="#icon-nginx" transform="translate(245 220) scale(1.2)" />
            <text x="290" y="245" textAnchor="start" fill="#E6EDF7" fontSize="20" fontWeight="700">
              MASTER NODE
            </text>
            <text x="245" y="270" textAnchor="start" fill="#8FA3BF" fontSize="14">
              Nginx + IP Routing
            </text>

            <text x="245" y="300" textAnchor="start" fill="#E6EDF7" fontSize="15" fontWeight="600">
              BTRFS RAID Storage
            </text>
            <use href="#icon-disk" transform="translate(245 310) scale(0.9)" />
            <use href="#icon-disk" transform="translate(285 310) scale(0.9)" />
            <use href="#icon-disk" transform="translate(325 310) scale(0.9)" />

            <rect
              x="240"
              y="350"
              width="320"
              height="16"
              rx="8"
              fill="rgba(56, 144, 136, 0.15)"
            />
            <rect
              x="240"
              y="350"
              width="240"
              height="16"
              rx="8"
              fill="rgba(56, 144, 136, 0.4)"
            />

            {/* Flow Arrow 2 */}
            <line
              x1="400"
              y1="400"
              x2="400"
              y2="460"
              stroke="#389088"
              strokeWidth="3"
              markerEnd="url(#arch-arrow)"
            />
            <text x="420" y="435" fill="#8FA3BF" fontSize="13">
              Route
            </text>

            {/* Compute Pool Container */}
            <rect
              x="50"
              y="460"
              width="700"
              height="380"
              rx="20"
              fill="rgba(11, 19, 34, 0.7)"
              stroke="rgba(26, 38, 55, 0.9)"
              strokeWidth="3"
            />
            <text x="80" y="495" textAnchor="start" fill="#E6EDF7" fontSize="16" fontWeight="700">
              Compute Pool
            </text>
            <text x="80" y="518" textAnchor="start" fill="#8FA3BF" fontSize="13">
              VMs · Docker · Kubernetes
            </text>

            {/* Slave Node B */}
            <rect
              x="90"
              y="550"
              width="280"
              height="180"
              rx="16"
              fill="rgba(14, 21, 36, 0.9)"
              stroke="rgba(56, 144, 136, 0.5)"
              strokeWidth="2"
            />
            <text x="110" y="585" textAnchor="start" fill="#E6EDF7" fontSize="17" fontWeight="700">
              NODE B (Slave)
            </text>
            <text x="110" y="610" textAnchor="start" fill="#8FA3BF" fontSize="13">
              BTRFS RAID Storage
            </text>
            <use href="#icon-disk" transform="translate(110 625) scale(0.85)" />
            <use href="#icon-disk" transform="translate(148 625) scale(0.85)" />
            <use href="#icon-disk" transform="translate(186 625) scale(0.85)" />

            <rect
              x="110"
              y="685"
              width="240"
              height="14"
              rx="7"
              fill="rgba(56, 144, 136, 0.15)"
            />
            <rect
              x="110"
              y="685"
              width="180"
              height="14"
              rx="7"
              fill="rgba(56, 144, 136, 0.35)"
            />

            {/* Slave Node C */}
            <rect
              x="430"
              y="550"
              width="280"
              height="180"
              rx="16"
              fill="rgba(14, 21, 36, 0.9)"
              stroke="rgba(56, 144, 136, 0.5)"
              strokeWidth="2"
            />
            <text x="450" y="585" textAnchor="start" fill="#E6EDF7" fontSize="17" fontWeight="700">
              NODE C (Slave)
            </text>
            <text x="450" y="610" textAnchor="start" fill="#8FA3BF" fontSize="13">
              BTRFS RAID Storage
            </text>
            <use href="#icon-disk" transform="translate(450 625) scale(0.85)" />
            <use href="#icon-disk" transform="translate(488 625) scale(0.85)" />
            <use href="#icon-disk" transform="translate(526 625) scale(0.85)" />

            <rect
              x="450"
              y="685"
              width="240"
              height="14"
              rx="7"
              fill="rgba(56, 144, 136, 0.15)"
            />
            <rect
              x="450"
              y="685"
              width="190"
              height="14"
              rx="7"
              fill="rgba(56, 144, 136, 0.35)"
            />

            {/* Arrows from Master to Slaves */}
            <line
              x1="300"
              y1="450"
              x2="230"
              y2="550"
              stroke="#389088"
              strokeWidth="2.5"
              markerEnd="url(#arch-arrow)"
            />
            <line
              x1="500"
              y1="450"
              x2="570"
              y2="550"
              stroke="#389088"
              strokeWidth="2.5"
              markerEnd="url(#arch-arrow)"
            />

            {/* Flow Arrows to NFS */}
            <line
              x1="230"
              y1="730"
              x2="230"
              y2="780"
              stroke="#389088"
              strokeWidth="2.5"
              markerEnd="url(#arch-arrow)"
            />
            <line
              x1="400"
              y1="400"
              x2="400"
              y2="780"
              stroke="#389088"
              strokeWidth="2.5"
              markerEnd="url(#arch-arrow)"
            />
            <line
              x1="570"
              y1="730"
              x2="570"
              y2="780"
              stroke="#389088"
              strokeWidth="2.5"
              markerEnd="url(#arch-arrow)"
            />

            {/* NFS Shared Storage */}
            <rect
              x="120"
              y="780"
              width="560"
              height="100"
              rx="16"
              fill="rgba(14, 21, 36, 0.9)"
              stroke="rgba(56, 144, 136, 0.7)"
              strokeWidth="3"
            />
            <use href="#icon-nfs" transform="translate(145 800) scale(1.1)" />
            <text x="195" y="820" textAnchor="start" fill="#E6EDF7" fontSize="18" fontWeight="700">
              NFS Shared Storage
            </text>
            <text x="145" y="850" textAnchor="start" fill="#8FA3BF" fontSize="13">
              Exports each nodes BTRFS volumes
            </text>
            <text x="145" y="870" textAnchor="start" fill="#8FA3BF" fontSize="12">
              RAID modes: single, mirror, parity
            </text>

            {/* Bidirectional arrows back */}
            <line
              x1="210"
              y1="780"
              x2="210"
              y2="730"
              stroke="#389088"
              strokeWidth="2"
              markerEnd="url(#arch-arrow)"
              opacity="0.4"
              strokeDasharray="3,3"
            />
            <line
              x1="380"
              y1="780"
              x2="380"
              y2="400"
              stroke="#389088"
              strokeWidth="2"
              markerEnd="url(#arch-arrow)"
              opacity="0.4"
              strokeDasharray="3,3"
            />
            <line
              x1="590"
              y1="780"
              x2="590"
              y2="730"
              stroke="#389088"
              strokeWidth="2"
              markerEnd="url(#arch-arrow)"
              opacity="0.4"
              strokeDasharray="3,3"
            />

            {/* Labels for data flow */}
            <text x="165" y="760" fill="#389088" fontSize="11" fontWeight="600">
              Share
            </text>
            <text x="335" y="760" fill="#389088" fontSize="11" fontWeight="600">
              Share
            </text>
            <text x="545" y="760" fill="#389088" fontSize="11" fontWeight="600">
              Share
            </text>
          </svg>
        </div>
      </Section>
    </div>
  );
}
