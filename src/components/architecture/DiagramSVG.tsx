"use client";

import { motion } from "framer-motion";

import {
  ARCHITECTURE_STEPS,
  type ArchitectureStep,
} from "@/components/architecture/architecture-data";

const BOX_WIDTH = 300;
const BOX_HEIGHT = 54;
const BOX_GAP = 12;
const START_X = 30;
const START_Y = 20;

const iconSize = 20;

function renderIcon(type: ArchitectureStep["icon"], x: number, y: number) {
  const strokeWidth = 1.6;
  const centerX = x + iconSize / 2;
  const centerY = y + iconSize / 2;

  switch (type) {
    case "storage":
      return (
        <g stroke="currentColor" strokeWidth={strokeWidth} fill="none">
          <rect x={x + 2} y={y + 2} width={16} height={4} rx={2} />
          <rect x={x + 2} y={y + 8} width={16} height={4} rx={2} />
          <rect x={x + 2} y={y + 14} width={16} height={4} rx={2} />
        </g>
      );
    case "nfs":
      return (
        <g stroke="currentColor" strokeWidth={strokeWidth} fill="none">
          <circle cx={centerX} cy={centerY - 5} r={3} />
          <circle cx={centerX - 6} cy={centerY + 6} r={2.5} />
          <circle cx={centerX + 6} cy={centerY + 6} r={2.5} />
          <line x1={centerX} y1={centerY - 2} x2={centerX - 4} y2={centerY + 4} />
          <line x1={centerX} y1={centerY - 2} x2={centerX + 4} y2={centerY + 4} />
        </g>
      );
    case "compute":
      return (
        <g stroke="currentColor" strokeWidth={strokeWidth} fill="none">
          <rect x={x + 3} y={y + 3} width={14} height={10} rx={2} />
          <rect x={x + 5} y={y + 15} width={10} height={3} rx={1.5} />
          <circle cx={centerX - 4} cy={y + 8} r={1.5} />
          <circle cx={centerX + 4} cy={y + 8} r={1.5} />
        </g>
      );
    case "edge":
      return (
        <g stroke="currentColor" strokeWidth={strokeWidth} fill="none">
          <path d={`M ${x + 3} ${y + 16} L ${x + 10} ${y + 4} L ${x + 17} ${y + 16}`} />
          <line x1={x + 10} y1={y + 4} x2={x + 10} y2={y + 18} />
        </g>
      );
    case "access":
      return (
        <g stroke="currentColor" strokeWidth={strokeWidth} fill="none">
          <path
            d={`M ${x + 10} ${y + 3} L ${x + 17} ${y + 6} V ${y + 13} L ${x + 10} ${y + 17} L ${x + 3} ${y + 13} V ${y + 6} Z`}
          />
          <circle cx={centerX} cy={y + 9} r={2} />
        </g>
      );
    case "ops":
    default:
      return (
        <g stroke="currentColor" strokeWidth={strokeWidth} fill="none">
          <circle cx={centerX} cy={centerY} r={6} />
          <line x1={centerX} y1={y + 1} x2={centerX} y2={y + 4} />
          <line x1={centerX} y1={y + 16} x2={centerX} y2={y + 19} />
          <line x1={x + 1} y1={centerY} x2={x + 4} y2={centerY} />
          <line x1={x + 16} y1={centerY} x2={x + 19} y2={centerY} />
        </g>
      );
  }
}

type DiagramSVGProps = {
  activeStep: number;
};

export function DiagramSVG({ activeStep }: DiagramSVGProps) {
  const totalHeight =
    START_Y + ARCHITECTURE_STEPS.length * BOX_HEIGHT +
    (ARCHITECTURE_STEPS.length - 1) * BOX_GAP +
    20;
  const transition = {
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <svg
      viewBox={`0 0 360 ${totalHeight}`}
      className="h-auto w-full"
      role="img"
      aria-label="Layered architecture"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
        </marker>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {ARCHITECTURE_STEPS.map((layer, index) => {
        const visualIndex = ARCHITECTURE_STEPS.length - 1 - index;
        const y = START_Y + visualIndex * (BOX_HEIGHT + BOX_GAP);
        const isActive = index === activeStep;
        const stroke = isActive ? "var(--accent)" : "var(--diagram-stroke)";
        const fill = isActive
          ? "var(--diagram-accent)"
          : "var(--diagram-surface)";

        return (
          <motion.g
            key={layer.id}
            animate={{
              opacity: isActive ? 1 : 0.35,
              scale: isActive ? 1 : 0.98,
            }}
            whileHover={{ opacity: 1, scale: 1.015 }}
            transition={transition}
            style={{
              transformOrigin: `${START_X + BOX_WIDTH / 2}px ${
                y + BOX_HEIGHT / 2
              }px`,
            }}
          >
            <rect
              x={START_X}
              y={y}
              width={BOX_WIDTH}
              height={BOX_HEIGHT}
              rx={14}
              fill={fill}
              stroke={stroke}
              strokeWidth={2}
              filter={isActive ? "url(#glow)" : undefined}
            />
            <g
              transform={`translate(${START_X + 16}, ${y + 17})`}
              className={isActive ? "text-accent" : "text-muted-foreground"}
            >
              {renderIcon(layer.icon, 0, 0)}
            </g>
            <text
              x={START_X + 48}
              y={y + 30}
              fill={isActive ? "var(--diagram-text)" : "var(--diagram-text-muted)"}
              fontSize="12"
              fontWeight="600"
            >
              {layer.title}
            </text>
            <text
              x={START_X + 48}
              y={y + 46}
              fill={isActive ? "var(--diagram-text-muted)" : "var(--diagram-text-subtle)"}
              fontSize="10"
            >
              {layer.subtitle}
            </text>
          </motion.g>
        );
      })}

      {ARCHITECTURE_STEPS.slice(0, -1).map((layer, index) => {
        const visualIndex = ARCHITECTURE_STEPS.length - 1 - index;
        const nextVisualIndex = ARCHITECTURE_STEPS.length - 2 - index;
        const y1 = START_Y + visualIndex * (BOX_HEIGHT + BOX_GAP) + BOX_HEIGHT;
        const y2 =
          START_Y + nextVisualIndex * (BOX_HEIGHT + BOX_GAP);
        const x = START_X + BOX_WIDTH / 2;

        return (
          <line
            key={layer.id}
            x1={x}
            y1={y1}
            x2={x}
            y2={y2}
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#arrow)"
            opacity="0.6"
          />
        );
      })}
    </svg>
  );
}
