"use client";

import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import { Section } from "@/components/ui/Section";

type NodeId = "master" | "node-b" | "node-c";
type RaidBlock = "data" | "parity" | "mirror";

const viewBox = { width: 800, height: 1000 };
const zoomTarget = { x: 400, y: 520 };
const diagramBounds = { minX: 50, maxX: 750, minY: 40, maxY: 880 };

const clamp = (value: number, min: number, max: number) => {
  if (min > max) {
    return value;
  }
  return Math.min(Math.max(value, min), max);
};

const nodeMeta: Record<
  NodeId,
  {
    label: string;
    role: string;
    detail: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }
> = {
  master: {
    label: "Node A (Master)",
    role: "Master + Compute",
    detail: "Ingress routing and storage member",
    x: 200,
    y: 210,
    width: 400,
    height: 220,
  },
  "node-b": {
    label: "Node B",
    role: "Slave",
    detail: "Compute node with BTRFS RAID",
    x: 90,
    y: 550,
    width: 280,
    height: 180,
  },
  "node-c": {
    label: "Node C",
    role: "Slave",
    detail: "Compute node with BTRFS RAID",
    x: 430,
    y: 550,
    width: 280,
    height: 180,
  },
};

const raidBlockStyles: Record<RaidBlock, { label: string; color: string }> = {
  data: { label: "D", color: "rgba(56, 144, 136, 0.75)" },
  parity: { label: "P", color: "rgba(233, 186, 97, 0.8)" },
  mirror: { label: "M", color: "rgba(143, 163, 191, 0.75)" },
};

const raidLegend: Array<{ id: string; label: string; type: RaidBlock }> = [
  { id: "data", label: "Data", type: "data" },
  { id: "parity", label: "Parity", type: "parity" },
  { id: "mirror", label: "Mirror", type: "mirror" },
];

const raidProfiles: Array<{
  id: string;
  label: string;
  note: string;
  blocks: RaidBlock[];
}> = [
    {
      id: "single",
      label: "Single",
      note: "data only",
      blocks: ["data", "data", "data"],
    },
    {
      id: "raid0",
      label: "RAID0",
      note: "striped data",
      blocks: ["data", "data", "data", "data"],
    },
    {
      id: "raid1",
      label: "RAID1",
      note: "mirrored",
      blocks: ["mirror", "mirror", "mirror", "mirror"],
    },
    {
      id: "raid5",
      label: "RAID5",
      note: "single parity",
      blocks: ["data", "data", "data", "parity"],
    },
    {
      id: "raid6",
      label: "RAID6",
      note: "dual parity",
      blocks: ["data", "data", "parity", "parity"],
    },
  ];

export default function ArchitecturePage() {
  const [selectedNode, setSelectedNode] = useState<NodeId | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedNode(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const zoomTransform = useMemo(() => {
    if (!selectedNode) {
      return { scale: 1, x: 0, y: 0 };
    }

    const node = nodeMeta[selectedNode];
    const scale = 1.22;
    const centerX = node.x + node.width / 2;
    const centerY = node.y + node.height / 2;
    const rawX = zoomTarget.x - centerX * scale;
    const rawY = zoomTarget.y - centerY * scale;
    const minX = viewBox.width - diagramBounds.maxX * scale;
    const maxX = -diagramBounds.minX * scale;
    const minY = viewBox.height - diagramBounds.maxY * scale;
    const maxY = -diagramBounds.minY * scale;

    return {
      scale,
      x: clamp(rawX, minX, maxX),
      y: clamp(rawY, minY, maxY),
    };
  }, [selectedNode]);

  const handleNodeToggle = (nodeId: NodeId) => {
    setSelectedNode((prev) => (prev === nodeId ? null : nodeId));
  };

  const handleNodeKeyDown = (
    event: ReactKeyboardEvent<SVGGElement>,
    nodeId: NodeId
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNodeToggle(nodeId);
    }
  };

  const selectedInfo = selectedNode ? nodeMeta[selectedNode] : null;
  const isZoomed = selectedNode !== null;
  const isMasterSelected = selectedNode === "master";
  const isNodeBSelected = selectedNode === "node-b";
  const isNodeCSelected = selectedNode === "node-c";
  const isMasterDim = selectedNode !== null && !isMasterSelected;
  const isNodeBDim = selectedNode !== null && !isNodeBSelected;
  const isNodeCDim = selectedNode !== null && !isNodeCSelected;

  return (
    <div>
      <Section
        eyebrow="Architecture"
        title="Node-local storage, cluster-wide access"
        description="Master and slave nodes form a single compute pool with shared BTRFS RAID storage over NFS. Click any node to inspect its RAID layout."
      >
        <div className="glass-panel rounded-2xl border border-border/80 p-8 shadow-[0_18px_38px_rgba(5,8,16,0.35)] xl:mx-auto xl:w-fit">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
            <div className="w-full xl:w-[48rem] xl:shrink-0">
              <svg
                viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
                className="h-auto w-full"
                role="img"
                aria-label="Interactive architecture diagram. Click nodes to zoom into BTRFS RAID layouts."
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

                  {/* API Icon - Clean brackets with slash */}
                  <g id="icon-api">
                    <path
                      d="M6 6L2 12L6 18M18 6L22 12L18 18"
                      fill="none"
                      stroke="#389088"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="9"
                      y1="16"
                      x2="15"
                      y2="8"
                      stroke="#389088"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Database/Disk Icon - Cylinder */}
                  <g id="icon-disk">
                    <ellipse
                      cx="12"
                      cy="6"
                      rx="7"
                      ry="3"
                      fill="none"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <path
                      d="M5 6v8c0 1.66 3.13 3 7 3s7-1.34 7-3V6"
                      fill="none"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <ellipse
                      cx="12"
                      cy="11"
                      rx="7"
                      ry="3"
                      fill="none"
                      stroke="#389088"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  </g>

                  {/* Network/Share Icon - Connected nodes */}
                  <g id="icon-nfs">
                    <circle
                      cx="6"
                      cy="6"
                      r="2.5"
                      fill="none"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <circle
                      cx="18"
                      cy="6"
                      r="2.5"
                      fill="none"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <circle
                      cx="6"
                      cy="18"
                      r="2.5"
                      fill="none"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="2.5"
                      fill="none"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <line
                      x1="8.5"
                      y1="6"
                      x2="15.5"
                      y2="6"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <line
                      x1="8.5"
                      y1="18"
                      x2="15.5"
                      y2="18"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <line
                      x1="6"
                      y1="8.5"
                      x2="6"
                      y2="15.5"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <line
                      x1="18"
                      y1="8.5"
                      x2="18"
                      y2="15.5"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                  </g>

                  {/* Server/Router Icon - Simple server rack */}
                  <g id="icon-nginx">
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      fill="none"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <line
                      x1="4"
                      y1="9"
                      x2="20"
                      y2="9"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <line
                      x1="4"
                      y1="14"
                      x2="20"
                      y2="14"
                      stroke="#389088"
                      strokeWidth="2"
                    />
                    <circle cx="7" cy="6.5" r="0.8" fill="#389088" />
                    <circle cx="9.5" cy="6.5" r="0.8" fill="#389088" />
                    <circle cx="7" cy="11.5" r="0.8" fill="#389088" />
                    <circle cx="9.5" cy="11.5" r="0.8" fill="#389088" />
                    <circle cx="7" cy="16.5" r="0.8" fill="#389088" />
                    <circle cx="9.5" cy="16.5" r="0.8" fill="#389088" />
                  </g>
                </defs>

                <rect
                  x="0"
                  y="0"
                  width={viewBox.width}
                  height={viewBox.height}
                  fill="rgba(11, 19, 34, 0.7)"
                  opacity={isZoomed ? 1 : 0}
                  style={{ transition: "opacity 350ms ease" }}
                  pointerEvents="none"
                />

                <g
                  style={{
                    transform: `translate(${zoomTransform.x}px, ${zoomTransform.y}px) scale(${zoomTransform.scale})`,
                    transformOrigin: "0 0",
                    transformBox: "view-box",
                    transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                    willChange: "transform",
                  }}
                >
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
                  <use href="#icon-api" transform="translate(268 55) scale(1.3)" />
                  <text
                    x="400"
                    y="75"
                    textAnchor="middle"
                    fill="#E6EDF7"
                    fontSize="18"
                    fontWeight="700"
                  >
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
                    y2="210"
                    stroke="#389088"
                    strokeWidth="3"
                    markerEnd="url(#arch-arrow)"
                    strokeDasharray="5,5"
                  />
                  <text x="420" y="165" fill="#8FA3BF" fontSize="13">
                    Request
                  </text>

                  {/* Compute Pool Container */}
                  <rect
                    x="50"
                    y="150"
                    width="700"
                    height="740"
                    rx="20"
                    fill="rgba(11, 19, 34, 0.7)"
                    stroke="rgba(26, 38, 55, 0.9)"
                    strokeWidth="3"
                    fillOpacity={isZoomed ? 0.85 : 1}
                    strokeOpacity={isZoomed ? 0.35 : 1}
                  />
                  <text x="80" y="190" textAnchor="start" fill="#E6EDF7" fontSize="16" fontWeight="700">
                    Compute Pool
                  </text>

                  {/* Master Node */}
                  <g
                    role="button"
                    tabIndex={0}
                    aria-label="Master node. Click to zoom into RAID layout."
                    aria-pressed={isMasterSelected}
                    onClick={() => handleNodeToggle("master")}
                    onKeyDown={(event) => handleNodeKeyDown(event, "master")}
                    className={`cursor-pointer transition-opacity duration-300 ${isMasterDim ? "opacity-50" : "opacity-100"
                      }`}
                  >
                    <title>Master node (click to zoom)</title>
                    <rect
                      x="200"
                      y="210"
                      width="400"
                      height="220"
                      rx="18"
                      fill="url(#masterGlow)"
                      stroke="rgba(56, 144, 136, 0.8)"
                      strokeWidth="3"
                    />
                    <rect
                      x="220"
                      y="230"
                      width="360"
                      height="180"
                      rx="14"
                      fill="rgba(14, 21, 36, 0.95)"
                      stroke="rgba(56, 144, 136, 0.7)"
                      strokeWidth="2"
                    />

                    <use href="#icon-nginx" transform="translate(232 248) scale(1.1)" />
                    <text x="280" y="275" textAnchor="start" fill="#E6EDF7" fontSize="18" fontWeight="700">
                      NODE A (Master)
                    </text>
                    <text x="235" y="300" textAnchor="start" fill="#8FA3BF" fontSize="14">
                      Nginx + IP Routing
                    </text>

                    <text x="235" y="330" textAnchor="start" fill="#E6EDF7" fontSize="15" fontWeight="600">
                      BTRFS RAID Storage
                    </text>
                    <use href="#icon-disk" transform="translate(235 337) scale(0.75)" />
                    <use href="#icon-disk" transform="translate(270 337) scale(0.75)" />
                    <use href="#icon-disk" transform="translate(305 337) scale(0.75)" />

                    <rect
                      x="240"
                      y="380"
                      width="320"
                      height="16"
                      rx="8"
                      fill="rgba(56, 144, 136, 0.15)"
                    />
                    <rect
                      x="240"
                      y="380"
                      width="240"
                      height="16"
                      rx="8"
                      fill="rgba(56, 144, 136, 0.4)"
                    />

                    {isMasterSelected ? (
                      <rect
                        x="200"
                        y="210"
                        width="400"
                        height="220"
                        rx="18"
                        fill="rgba(56, 144, 136, 0.08)"
                        stroke="rgba(56, 144, 136, 0.95)"
                        strokeWidth="3"
                        pointerEvents="none"
                      />
                    ) : null}
                  </g>

                  {/* Slave Node B */}
                  <g
                    role="button"
                    tabIndex={0}
                    aria-label="Node B slave. Click to zoom into RAID layout."
                    aria-pressed={isNodeBSelected}
                    onClick={() => handleNodeToggle("node-b")}
                    onKeyDown={(event) => handleNodeKeyDown(event, "node-b")}
                    className={`cursor-pointer transition-opacity duration-300 ${isNodeBDim ? "opacity-50" : "opacity-100"
                      }`}
                  >
                    <title>Node B (click to zoom)</title>
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
                    <use href="#icon-disk" transform="translate(110 620) scale(0.7)" />
                    <use href="#icon-disk" transform="translate(143 620) scale(0.7)" />
                    <use href="#icon-disk" transform="translate(176 620) scale(0.7)" />

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

                    {isNodeBSelected ? (
                      <rect
                        x="90"
                        y="550"
                        width="280"
                        height="180"
                        rx="16"
                        fill="rgba(56, 144, 136, 0.08)"
                        stroke="rgba(56, 144, 136, 0.95)"
                        strokeWidth="2.5"
                        pointerEvents="none"
                      />
                    ) : null}
                  </g>

                  {/* Slave Node C */}
                  <g
                    role="button"
                    tabIndex={0}
                    aria-label="Node C slave. Click to zoom into RAID layout."
                    aria-pressed={isNodeCSelected}
                    onClick={() => handleNodeToggle("node-c")}
                    onKeyDown={(event) => handleNodeKeyDown(event, "node-c")}
                    className={`cursor-pointer transition-opacity duration-300 ${isNodeCDim ? "opacity-50" : "opacity-100"
                      }`}
                  >
                    <title>Node C (click to zoom)</title>
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
                    <use href="#icon-disk" transform="translate(450 620) scale(0.7)" />
                    <use href="#icon-disk" transform="translate(483 620) scale(0.7)" />
                    <use href="#icon-disk" transform="translate(516 620) scale(0.7)" />

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

                    {isNodeCSelected ? (
                      <rect
                        x="430"
                        y="550"
                        width="280"
                        height="180"
                        rx="16"
                        fill="rgba(56, 144, 136, 0.08)"
                        stroke="rgba(56, 144, 136, 0.95)"
                        strokeWidth="2.5"
                        pointerEvents="none"
                      />
                    ) : null}
                  </g>

                  {/* Arrows from Master to Slaves */}
                  <line
                    x1="300"
                    y1="440"
                    x2="230"
                    y2="550"
                    stroke="#389088"
                    strokeWidth="2.5"
                    markerEnd="url(#arch-arrow)"
                  />
                  <line
                    x1="500"
                    y1="440"
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
                    y1="430"
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
                  <use href="#icon-nfs" transform="translate(140 795) scale(1.2)" />
                  <text x="185" y="820" textAnchor="start" fill="#E6EDF7" fontSize="18" fontWeight="700">
                    NFS Shared Storage
                  </text>
                  <text x="145" y="850" textAnchor="start" fill="#8FA3BF" fontSize="13">
                    Exports each node's BTRFS volumes
                  </text>
                  <text x="145" y="870" textAnchor="start" fill="#8FA3BF" fontSize="12">
                    RAID modes: single, raid0, raid1, raid5, raid6
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
                    y2="430"
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
                </g>
              </svg>
            </div>

            <div className="w-full xl:w-[280px] xl:shrink-0">
              <div className="glass-card rounded-2xl border border-border/70 p-5 shadow-[0_18px_36px_rgba(5,8,16,0.45)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      BTRFS RAID
                    </p>
                    <p className="font-display text-lg text-foreground">
                      {selectedInfo ? selectedInfo.label : "Select a node"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedInfo
                        ? `${selectedInfo.role} · ${selectedInfo.detail}`
                        : "Click a node to zoom into the disk layout."}
                    </p>
                  </div>
                  {selectedNode ? (
                    <button
                      type="button"
                      onClick={() => setSelectedNode(null)}
                      className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
                    >
                      Reset
                    </button>
                  ) : null}
                </div>

                <div
                  className={`mt-4 grid gap-3 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${selectedNode
                      ? "max-h-[420px] opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    {raidLegend.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-sm"
                          style={{ backgroundColor: raidBlockStyles[item.type].color }}
                        />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3">
                    {raidProfiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="flex items-center justify-between gap-3"
                      >
                        <div className="min-w-[110px]">
                          <p className="text-xs font-semibold text-foreground/90">{profile.label}</p>
                          <p className="text-[11px] text-muted-foreground">{profile.note}</p>
                        </div>
                        <div className="flex flex-wrap justify-end gap-1">
                          {profile.blocks.map((block, index) => (
                            <span
                              key={`${profile.id}-${index}`}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-[10px] font-semibold text-white/90"
                              style={{ backgroundColor: raidBlockStyles[block].color }}
                            >
                              {raidBlockStyles[block].label}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {!selectedNode ? (
                  <div className="mt-4 rounded-xl border border-dashed border-border/70 bg-white/5 p-3 text-xs text-muted-foreground">
                    Tip: click a node to zoom. Press Esc to reset.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
