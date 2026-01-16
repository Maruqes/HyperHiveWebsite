"use client";

import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import { Section } from "@/components/ui/Section";

type NodeId = "master" | "node-b" | "node-c";
type RaidBlock = "data" | "parity" | "mirror";

type VMInfo = {
  name: string;
  vcpu: number;
  ram: number;
  ip: string;
  status: "running" | "stopped";
};

type RaidInfo = {
  name: string;
  type: "raid1" | "raid5" | "raid6";
  capacity: string;
  used: string;
  disks: number;
  parity: number;
};

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
    vms: VMInfo[];
    raids: RaidInfo[];
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
    vms: [
      { name: "vm1", vcpu: 4, ram: 8, ip: "192.168.76.10", status: "running" },
      { name: "vm2", vcpu: 2, ram: 4, ip: "192.168.76.11", status: "running" },
      { name: "vm3", vcpu: 8, ram: 16, ip: "192.168.76.12", status: "running" },
    ],
    raids: [
      { name: "raid1", type: "raid1", capacity: "2TB", used: "1.5TB", disks: 4, parity: 0 },
      { name: "raid5", type: "raid5", capacity: "8TB", used: "6TB", disks: 4, parity: 1 },
    ],
  },
  "node-b": {
    label: "Node B",
    role: "Slave",
    detail: "Compute node with BTRFS RAID",
    x: 90,
    y: 550,
    width: 280,
    height: 180,
    vms: [
      { name: "vm4", vcpu: 6, ram: 12, ip: "192.168.76.20", status: "running" },
      { name: "vm5", vcpu: 4, ram: 8, ip: "192.168.76.21", status: "stopped" },
    ],
    raids: [
      { name: "raid6", type: "raid6", capacity: "10TB", used: "7TB", disks: 6, parity: 2 },
    ],
  },
  "node-c": {
    label: "Node C",
    role: "Slave",
    detail: "Compute node with BTRFS RAID",
    x: 430,
    y: 550,
    width: 280,
    height: 180,
    vms: [
      { name: "vm6", vcpu: 8, ram: 16, ip: "192.168.76.30", status: "running" },
      { name: "vm7", vcpu: 4, ram: 8, ip: "192.168.76.31", status: "running" },
      { name: "vm8", vcpu: 2, ram: 4, ip: "192.168.76.32", status: "running" },
    ],
    raids: [
      { name: "raid1", type: "raid1", capacity: "4TB", used: "2.8TB", disks: 2, parity: 0 },
      { name: "raid5", type: "raid5", capacity: "6TB", used: "4.5TB", disks: 4, parity: 1 },
    ],
  },
};

const raidBlockStyles: Record<RaidBlock, { label: string; color: string }> = {
  data: { label: "D", color: "rgba(var(--accent-rgb), 0.75)" },
  parity: { label: "P", color: "rgba(233, 186, 97, 0.8)" },
  mirror: { label: "M", color: "rgba(var(--diagram-muted-rgb), 0.75)" },
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
        <div className="glass-panel rounded-2xl border border-border/80 p-5 shadow-[0_18px_38px_var(--shadow-soft)] sm:p-8 xl:mx-auto xl:w-fit">
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
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
                  </marker>

                  <linearGradient id="masterGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(var(--accent-rgb), 0.2)" />
                    <stop offset="100%" stopColor="rgba(var(--accent-rgb), 0.05)" />
                  </linearGradient>

                  {/* API Icon - Clean brackets with slash */}
                  <g id="icon-api">
                    <path
                      d="M6 6L2 12L6 18M18 6L22 12L18 18"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="9"
                      y1="16"
                      x2="15"
                      y2="8"
                      stroke="var(--accent)"
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
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <path
                      d="M5 6v8c0 1.66 3.13 3 7 3s7-1.34 7-3V6"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <ellipse
                      cx="12"
                      cy="11"
                      rx="7"
                      ry="3"
                      fill="none"
                      stroke="var(--accent)"
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
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="18"
                      cy="6"
                      r="2.5"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="6"
                      cy="18"
                      r="2.5"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="2.5"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <line
                      x1="8.5"
                      y1="6"
                      x2="15.5"
                      y2="6"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <line
                      x1="8.5"
                      y1="18"
                      x2="15.5"
                      y2="18"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <line
                      x1="6"
                      y1="8.5"
                      x2="6"
                      y2="15.5"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <line
                      x1="18"
                      y1="8.5"
                      x2="18"
                      y2="15.5"
                      stroke="var(--accent)"
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
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <line
                      x1="4"
                      y1="9"
                      x2="20"
                      y2="9"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <line
                      x1="4"
                      y1="14"
                      x2="20"
                      y2="14"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <circle cx="7" cy="6.5" r="0.8" fill="var(--accent)" />
                    <circle cx="9.5" cy="6.5" r="0.8" fill="var(--accent)" />
                    <circle cx="7" cy="11.5" r="0.8" fill="var(--accent)" />
                    <circle cx="9.5" cy="11.5" r="0.8" fill="var(--accent)" />
                    <circle cx="7" cy="16.5" r="0.8" fill="var(--accent)" />
                    <circle cx="9.5" cy="16.5" r="0.8" fill="var(--accent)" />
                  </g>

                  {/* VM Icon - Monitor with activity */}
                  <g id="icon-vm">
                    <rect
                      x="3"
                      y="4"
                      width="10"
                      height="7"
                      rx="1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <line x1="5" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1.2" />
                    <line x1="8" y1="11" x2="8" y2="13" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="6" cy="7" r="0.6" fill="currentColor" />
                    <circle cx="10" cy="7" r="0.6" fill="currentColor" />
                  </g>
                </defs>

                <rect
                  x="0"
                  y="0"
                  width={viewBox.width}
                  height={viewBox.height}
                  fill="var(--diagram-surface-soft)"
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
                    fill="var(--diagram-surface-strong)"
                    stroke="rgba(var(--accent-rgb), 0.6)"
                    strokeWidth="3"
                  />
                  <use href="#icon-api" transform="translate(268 55) scale(1.3)" />
                  <text
                    x="400"
                    y="75"
                    textAnchor="middle"
                    fill="var(--diagram-text)"
                    fontSize="18"
                    fontWeight="700"
                  >
                    API Endpoints
                  </text>
                  <text x="400" y="100" textAnchor="middle" fill="var(--diagram-text-muted)" fontSize="12">
                    api1.hyperhive.io, api2.hyperhive.io
                  </text>

                  {/* Flow Arrow 1 */}
                  <line
                    x1="400"
                    y1="120"
                    x2="400"
                    y2="210"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    markerEnd="url(#arch-arrow)"
                    strokeDasharray="5,5"
                  />
                  <text x="420" y="165" fill="var(--diagram-text-muted)" fontSize="13">
                    Request
                  </text>

                  {/* Compute Pool Container */}
                  <rect
                    x="50"
                    y="150"
                    width="700"
                    height="740"
                    rx="20"
                    fill="var(--diagram-surface-soft)"
                    stroke="var(--diagram-border)"
                    strokeWidth="3"
                    fillOpacity={isZoomed ? 0.85 : 1}
                    strokeOpacity={isZoomed ? 0.35 : 1}
                  />
                  <text x="80" y="190" textAnchor="start" fill="var(--diagram-text)" fontSize="16" fontWeight="700">
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
                      stroke="rgba(var(--accent-rgb), 0.8)"
                      strokeWidth="3"
                    />
                    <rect
                      x="220"
                      y="230"
                      width="360"
                      height="180"
                      rx="14"
                      fill="var(--diagram-surface-strong)"
                      stroke="rgba(var(--accent-rgb), 0.7)"
                      strokeWidth="2"
                    />

                    <use href="#icon-nginx" transform="translate(232 248) scale(1.1)" />
                    <text x="280" y="275" textAnchor="start" fill="var(--diagram-text)" fontSize="18" fontWeight="700">
                      NODE A (Master)
                    </text>
                    <text x="235" y="300" textAnchor="start" fill="var(--diagram-text-muted)" fontSize="14">
                      Nginx + IP Routing
                    </text>

                    {/* VM and RAID Badges */}
                    <g transform="translate(235, 315)">
                      <rect x="0" y="0" width="75" height="20" rx="10" fill="rgba(var(--accent-rgb), 0.25)" stroke="rgba(var(--accent-rgb), 0.6)" strokeWidth="1.5" />
                      <use href="#icon-vm" transform="translate(5, 4) scale(0.9)" style={{ color: "var(--diagram-text)" }} />
                      <text x="18" y="14" fill="var(--diagram-text)" fontSize="10" fontWeight="600">
                        {nodeMeta.master.vms.length} VMs
                      </text>
                    </g>
                    <g transform="translate(315, 315)">
                      <rect x="0" y="0" width="85" height="20" rx="10" fill="rgba(233, 186, 97, 0.25)" stroke="rgba(233, 186, 97, 0.6)" strokeWidth="1.5" />
                      <use href="#icon-disk" transform="translate(5, 4) scale(0.45)" />
                      <text x="20" y="14" fill="var(--diagram-text)" fontSize="10" fontWeight="600">
                        {nodeMeta.master.raids.length} RAIDs
                      </text>
                    </g>

                    <text x="235" y="355" textAnchor="start" fill="var(--diagram-text)" fontSize="15" fontWeight="600">
                      BTRFS RAID Storage
                    </text>
                    <use href="#icon-disk" transform="translate(235 362) scale(0.75)" />
                    <use href="#icon-disk" transform="translate(270 362) scale(0.75)" />
                    <use href="#icon-disk" transform="translate(305 362) scale(0.75)" />

                    <rect
                      x="240"
                      y="385"
                      width="320"
                      height="14"
                      rx="7"
                      fill="rgba(var(--accent-rgb), 0.15)"
                    />
                    <rect
                      x="240"
                      y="385"
                      width="240"
                      height="14"
                      rx="7"
                      fill="rgba(var(--accent-rgb), 0.4)"
                    />

                    {isMasterSelected ? (
                      <rect
                        x="200"
                        y="210"
                        width="400"
                        height="220"
                        rx="18"
                        fill="rgba(var(--accent-rgb), 0.08)"
                        stroke="rgba(var(--accent-rgb), 0.95)"
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
                      fill="var(--diagram-surface-strong)"
                      stroke="rgba(var(--accent-rgb), 0.5)"
                      strokeWidth="2"
                    />
                    <text x="110" y="585" textAnchor="start" fill="var(--diagram-text)" fontSize="17" fontWeight="700">
                      NODE B (Slave)
                    </text>

                    {/* VM and RAID Badges for Node B */}
                    <g transform="translate(110, 598)">
                      <rect x="0" y="0" width="70" height="20" rx="10" fill="rgba(var(--accent-rgb), 0.25)" stroke="rgba(var(--accent-rgb), 0.6)" strokeWidth="1.5" />
                      <use href="#icon-vm" transform="translate(5, 4) scale(0.9)" style={{ color: "var(--diagram-text)" }} />
                      <text x="18" y="14" fill="var(--diagram-text)" fontSize="10" fontWeight="600">
                        {nodeMeta["node-b"].vms.length} VMs
                      </text>
                    </g>
                    <g transform="translate(185, 598)">
                      <rect x="0" y="0" width="85" height="20" rx="10" fill="rgba(233, 186, 97, 0.25)" stroke="rgba(233, 186, 97, 0.6)" strokeWidth="1.5" />
                      <use href="#icon-disk" transform="translate(5, 4) scale(0.45)" />
                      <text x="18" y="14" fill="var(--diagram-text)" fontSize="10" fontWeight="600">
                        {nodeMeta["node-b"].raids.length} RAID
                      </text>
                    </g>

                    <text x="110" y="635" textAnchor="start" fill="var(--diagram-text-muted)" fontSize="13">
                      BTRFS RAID Storage
                    </text>
                    <use href="#icon-disk" transform="translate(110 645) scale(0.7)" />
                    <use href="#icon-disk" transform="translate(143 645) scale(0.7)" />
                    <use href="#icon-disk" transform="translate(176 645) scale(0.7)" />

                    <rect
                      x="110"
                      y="695"
                      width="240"
                      height="14"
                      rx="7"
                      fill="rgba(var(--accent-rgb), 0.15)"
                    />
                    <rect
                      x="110"
                      y="695"
                      width="180"
                      height="14"
                      rx="7"
                      fill="rgba(var(--accent-rgb), 0.35)"
                    />

                    {isNodeBSelected ? (
                      <rect
                        x="90"
                        y="550"
                        width="280"
                        height="180"
                        rx="16"
                        fill="rgba(var(--accent-rgb), 0.08)"
                        stroke="rgba(var(--accent-rgb), 0.95)"
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
                      fill="var(--diagram-surface-strong)"
                      stroke="rgba(var(--accent-rgb), 0.5)"
                      strokeWidth="2"
                    />
                    <text x="450" y="585" textAnchor="start" fill="var(--diagram-text)" fontSize="17" fontWeight="700">
                      NODE C (Slave)
                    </text>

                    {/* VM and RAID Badges for Node C */}
                    <g transform="translate(450, 598)">
                      <rect x="0" y="0" width="70" height="20" rx="10" fill="rgba(var(--accent-rgb), 0.25)" stroke="rgba(var(--accent-rgb), 0.6)" strokeWidth="1.5" />
                      <use href="#icon-vm" transform="translate(5, 4) scale(0.9)" style={{ color: "var(--diagram-text)" }} />
                      <text x="18" y="14" fill="var(--diagram-text)" fontSize="10" fontWeight="600">
                        {nodeMeta["node-c"].vms.length} VMs
                      </text>
                    </g>
                    <g transform="translate(525, 598)">
                      <rect x="0" y="0" width="90" height="20" rx="10" fill="rgba(233, 186, 97, 0.25)" stroke="rgba(233, 186, 97, 0.6)" strokeWidth="1.5" />
                      <use href="#icon-disk" transform="translate(5, 4) scale(0.45)" />
                      <text x="18" y="14" fill="var(--diagram-text)" fontSize="10" fontWeight="600">
                        {nodeMeta["node-c"].raids.length} RAIDs
                      </text>
                    </g>

                    <text x="450" y="635" textAnchor="start" fill="var(--diagram-text-muted)" fontSize="13">
                      BTRFS RAID Storage
                    </text>
                    <use href="#icon-disk" transform="translate(450 645) scale(0.7)" />
                    <use href="#icon-disk" transform="translate(483 645) scale(0.7)" />
                    <use href="#icon-disk" transform="translate(516 645) scale(0.7)" />

                    <rect
                      x="450"
                      y="695"
                      width="240"
                      height="14"
                      rx="7"
                      fill="rgba(var(--accent-rgb), 0.15)"
                    />
                    <rect
                      x="450"
                      y="695"
                      width="190"
                      height="14"
                      rx="7"
                      fill="rgba(var(--accent-rgb), 0.35)"
                    />

                    {isNodeCSelected ? (
                      <rect
                        x="430"
                        y="550"
                        width="280"
                        height="180"
                        rx="16"
                        fill="rgba(var(--accent-rgb), 0.08)"
                        stroke="rgba(var(--accent-rgb), 0.95)"
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
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    markerEnd="url(#arch-arrow)"
                  />
                  <line
                    x1="500"
                    y1="440"
                    x2="570"
                    y2="550"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    markerEnd="url(#arch-arrow)"
                  />

                  {/* Flow Arrows to NFS */}
                  <line
                    x1="230"
                    y1="730"
                    x2="230"
                    y2="780"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    markerEnd="url(#arch-arrow)"
                  />
                  <line
                    x1="400"
                    y1="430"
                    x2="400"
                    y2="780"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    markerEnd="url(#arch-arrow)"
                  />
                  <line
                    x1="570"
                    y1="730"
                    x2="570"
                    y2="780"
                    stroke="var(--accent)"
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
                    fill="var(--diagram-surface-strong)"
                    stroke="rgba(var(--accent-rgb), 0.7)"
                    strokeWidth="3"
                  />
                  <use href="#icon-nfs" transform="translate(140 795) scale(1.2)" />
                  <text x="185" y="820" textAnchor="start" fill="var(--diagram-text)" fontSize="18" fontWeight="700">
                    NFS Shared Storage
                  </text>
                  <text x="145" y="850" textAnchor="start" fill="var(--diagram-text-muted)" fontSize="13">
                    Exports each node's BTRFS volumes
                  </text>
                  <text x="145" y="870" textAnchor="start" fill="var(--diagram-text-muted)" fontSize="12">
                    RAID modes: single, raid0, raid1, raid5, raid6
                  </text>

                  {/* Bidirectional arrows back */}
                  <line
                    x1="210"
                    y1="780"
                    x2="210"
                    y2="730"
                    stroke="var(--accent)"
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
                    stroke="var(--accent)"
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
                    stroke="var(--accent)"
                    strokeWidth="2"
                    markerEnd="url(#arch-arrow)"
                    opacity="0.4"
                    strokeDasharray="3,3"
                  />

                  {/* Labels for data flow */}
                  <text x="165" y="760" fill="var(--accent)" fontSize="11" fontWeight="600">
                    Share
                  </text>
                  <text x="335" y="760" fill="var(--accent)" fontSize="11" fontWeight="600">
                    Share
                  </text>
                  <text x="545" y="760" fill="var(--accent)" fontSize="11" fontWeight="600">
                    Share
                  </text>
                </g>
              </svg>
            </div>

            <div className="w-full xl:w-[340px] xl:shrink-0">
              <div className="glass-card max-h-[70vh] overflow-y-auto rounded-2xl border border-border/70 p-5 shadow-[0_18px_36px_var(--shadow-strong)] sm:max-h-[700px]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      {selectedInfo ? "NODE DETAILS" : "BTRFS RAID"}
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
                      className="rounded-full border border-border/70 bg-[color:var(--surface-overlay-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
                    >
                      Reset
                    </button>
                  ) : null}
                </div>

                {/* VMs and RAIDs Details */}
                {selectedNode && selectedInfo ? (
                  <div className="mt-4 space-y-4">
                    {/* VMs Section */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-accent"></div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                          Virtual Machines ({selectedInfo.vms.length})
                        </p>
                      </div>
                      <div className="space-y-2">
                        {selectedInfo.vms.map((vm) => (
                          <div
                            key={vm.name}
                            className="rounded-lg border border-border/50 bg-[color:var(--surface-overlay-soft)] p-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold text-foreground">{vm.name}</p>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${vm.status === "running"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                                  }`}
                              >
                                {vm.status}
                              </span>
                            </div>
                            <div className="mt-1.5 grid grid-cols-2 gap-1.5 text-[10px] text-muted-foreground">
                              <div>
                                <span className="font-medium text-foreground/70">vCPU:</span> {vm.vcpu}
                              </div>
                              <div>
                                <span className="font-medium text-foreground/70">RAM:</span> {vm.ram}GB
                              </div>
                              <div className="col-span-2">
                                <span className="font-medium text-foreground/70">IP:</span> {vm.ip}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RAIDs Section */}
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#E9BA61]"></div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                          RAID Arrays ({selectedInfo.raids.length})
                        </p>
                      </div>
                      <div className="space-y-2">
                        {selectedInfo.raids.map((raid) => (
                          <div
                            key={raid.name}
                            className="rounded-lg border border-border/50 bg-[color:var(--surface-overlay-soft)] p-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold text-foreground">{raid.name}</p>
                              <span className="rounded-full bg-[#E9BA61]/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#E9BA61]">
                                {raid.type}
                              </span>
                            </div>
                            <div className="mt-1.5 space-y-1 text-[10px] text-muted-foreground">
                              <div className="flex justify-between">
                                <span className="font-medium text-foreground/70">Capacity:</span>
                                <span>{raid.capacity}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-foreground/70">Used:</span>
                                <span>{raid.used}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-medium text-foreground/70">Disks:</span>
                                <span>{raid.disks} total</span>
                              </div>
                              {raid.parity > 0 && (
                                <div className="flex justify-between">
                                  <span className="font-medium text-foreground/70">Parity:</span>
                                  <span>{raid.parity} disk{raid.parity > 1 ? 's' : ''} in parity</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-border/50 pt-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        RAID Block Legend
                      </p>
                    </div>
                  </div>
                ) : null}

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
                  <div className="mt-4 rounded-xl border border-dashed border-border/70 bg-[color:var(--surface-overlay-soft)] p-3 text-xs text-muted-foreground">
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
