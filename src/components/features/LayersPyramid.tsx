"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { FeatureLayer } from "@/lib/features";
import { layerInfo } from "@/lib/features";

interface PyramidLayer {
	id: FeatureLayer;
	label: string;
	compactLabel?: string;
	subtitle: string;
	compactSubtitle?: string;
	color: string;
}

const pyramidLayers: PyramidLayer[] = [
	{
		id: "layer0",
		label: "Layer 0 - Storage Foundation",
		compactLabel: "Layer 0: Storage",
		subtitle: "RAID pools, mounts, disk health",
		compactSubtitle: "RAID, mounts, disk health",
		color: "#803030",
	},
	{
		id: "layer1",
		label: "Layer 1 - Network Storage",
		compactLabel: "Layer 1: NFS",
		subtitle: "Shared storage across cluster",
		compactSubtitle: "Shared storage",
		color: "#389088",
	},
	{
		id: "layer2",
		label: "Layer 2 - Compute",
		compactLabel: "Layer 2: Compute",
		subtitle: "VMs, Docker, Kubernetes workloads",
		compactSubtitle: "VMs, Docker, K8s",
		color: "#4A90E2",
	},
	{
		id: "edge",
		label: "Edge - Routing",
		compactLabel: "Edge: Routing",
		subtitle: "HTTP/HTTPS + TCP/UDP exposure",
		compactSubtitle: "HTTP/HTTPS + TCP/UDP",
		color: "#9B59B6",
	},
	{
		id: "access",
		label: "Secure Access",
		compactLabel: "Access: Secure",
		subtitle: "Access protection layer",
		compactSubtitle: "WireGuard + SPA",
		color: "#E67E22",
	},
	{
		id: "operations",
		label: "Operations",
		compactLabel: "Operations",
		subtitle: "Maintenance, recovery, backups",
		compactSubtitle: "Backups, logs, updates",
		color: "#95A5A6",
	},
	{
		id: "assets",
		label: "Assets",
		compactLabel: "Assets",
		subtitle: "Reusable deployment resources",
		compactSubtitle: "Images, ISOs, templates",
		color: "#F39C12",
	},
];

interface LayersPyramidProps {
	onLayerClick?: (layer: FeatureLayer) => void;
	selectedLayers?: FeatureLayer[];
}

export function LayersPyramid({ onLayerClick, selectedLayers = [] }: LayersPyramidProps) {
	const [hoveredLayer, setHoveredLayer] = useState<FeatureLayer | null>(null);
	const [isCompact, setIsCompact] = useState(false);
	const [canHover, setCanHover] = useState(true);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 640px)");
		const handleChange = () => setIsCompact(mediaQuery.matches);

		handleChange();

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}

		mediaQuery.addListener(handleChange);
		return () => mediaQuery.removeListener(handleChange);
	}, []);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
		const handleChange = () => setCanHover(mediaQuery.matches);

		handleChange();

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}

		mediaQuery.addListener(handleChange);
		return () => mediaQuery.removeListener(handleChange);
	}, []);

	const layout = isCompact
		? {
				svgWidth: 560,
				svgHeight: 760,
				startY: 70,
				layerHeight: 82,
				layerGap: 10,
				baseWidth: 460,
				topWidth: 320,
				titleSize: 22,
				labelSize: 22,
				subtitleSize: 13,
				selectionOffset: 18,
			}
		: {
				svgWidth: 1000,
				svgHeight: 720,
				startY: 75,
				layerHeight: 72,
				layerGap: 7,
				baseWidth: 700,
				topWidth: 460,
				titleSize: 28,
				labelSize: 19,
				subtitleSize: 12,
				selectionOffset: 24,
			};

	const {
		svgWidth,
		svgHeight,
		startY,
		layerHeight,
		layerGap,
		baseWidth,
		topWidth,
		titleSize,
		labelSize,
		subtitleSize,
		selectionOffset,
	} = layout;
	const centerX = svgWidth / 2;

	const getLayerWidth = (index: number) => {
		const ratio = index / (pyramidLayers.length - 1);
		return baseWidth - (baseWidth - topWidth) * ratio;
	};

	return (
		<div className="w-full">
			<svg
				viewBox={`0 0 ${svgWidth} ${svgHeight}`}
				className="h-auto w-full"
				role="img"
				aria-label="HyperHive Layers Pyramid"
			>
				<defs>
					{/* Gradient background */}
					<linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="var(--diagram-surface-strong)" stopOpacity="0.8" />
						<stop offset="100%" stopColor="var(--background)" stopOpacity="0.9" />
					</linearGradient>

					{/* Glow filter */}
					<filter id="layerGlow" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="8" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>

					{/* Layer gradients */}
					{pyramidLayers.map((layer) => (
						<linearGradient
							key={`gradient-${layer.id}`}
							id={`gradient-${layer.id}`}
							x1="0%"
							y1="0%"
							x2="0%"
							y2="100%"
						>
							<stop offset="0%" stopColor={layer.color} stopOpacity="0.3" />
							<stop offset="100%" stopColor={layer.color} stopOpacity="0.1" />
						</linearGradient>
					))}
				</defs>

				{/* Background */}
				<rect
					x="0"
					y="0"
					width={svgWidth}
					height={svgHeight}
					fill="url(#bgGradient)"
					rx="20"
				/>

				{/* Pyramid layers */}
				{pyramidLayers.map((layer, index) => {
					const y = startY + index * (layerHeight + layerGap);
					const width = getLayerWidth(index);
					const x1 = centerX - width / 2;
					const x2 = centerX + width / 2;
					const y2 = y + layerHeight;

					const nextWidth = index < pyramidLayers.length - 1 ? getLayerWidth(index + 1) : width;
					const nextX1 = centerX - nextWidth / 2;
					const nextX2 = centerX + nextWidth / 2;

					const isHovered = hoveredLayer === layer.id;
					const isSelected = selectedLayers.includes(layer.id);
					const isDimmed = hoveredLayer !== null && !isHovered;
					const label = isCompact ? layer.compactLabel ?? layer.label : layer.label;
					const subtitle = isCompact ? layer.compactSubtitle ?? layer.subtitle : layer.subtitle;

					return (
						<g
							key={layer.id}
							onMouseEnter={() => {
								if (canHover) {
									setHoveredLayer(layer.id);
								}
							}}
							onMouseLeave={() => {
								if (canHover) {
									setHoveredLayer(null);
								}
							}}
							onClick={() => onLayerClick?.(layer.id)}
							style={{ cursor: "pointer", outline: "none" }}
							className="focus:outline-none focus-visible:outline-none"
							role="button"
							tabIndex={0}
							aria-label={`${layer.label}: ${layer.subtitle}`}
						>
							{/* Trapezoid shape */}
							<motion.path
								d={`
                  M ${x1} ${y}
                  L ${x2} ${y}
                  L ${nextX2} ${y2}
                  L ${nextX1} ${y2}
                  Z
                `}
								fill={`url(#gradient-${layer.id})`}
								stroke={layer.color}
								strokeWidth={isSelected ? 3 : 2}
								initial={{ opacity: 0.6 }}
								animate={{
									opacity: isDimmed ? 0.3 : isHovered || isSelected ? 1 : 0.6,
									strokeWidth: isSelected ? 3 : isHovered ? 2.5 : 2,
									filter: isHovered ? "url(#layerGlow)" : "none",
								}}
								transition={{ duration: 0.3 }}
							/>

							{/* Highlight effect on hover */}
							{isHovered && (
								<motion.path
									d={`
                    M ${x1} ${y}
                    L ${x2} ${y}
                    L ${nextX2} ${y2}
                    L ${nextX1} ${y2}
                    Z
                  `}
									fill="none"
									stroke={layer.color}
									strokeWidth="1"
									initial={{ opacity: 0 }}
									animate={{ opacity: 0.5 }}
									style={{ filter: "url(#layerGlow)" }}
								/>
							)}

							{/* Label text */}
							<motion.text
								x={centerX}
								y={y + layerHeight / 2 - 10}
								textAnchor="middle"
								fill="var(--diagram-text)"
								fontSize={labelSize}
								fontWeight="700"
								animate={{
									opacity: isDimmed ? 0.4 : 1,
									fontSize: isHovered ? labelSize + 1 : labelSize,
								}}
								transition={{ duration: 0.2 }}
							>
								{label}
							</motion.text>

							{/* Subtitle */}
							<motion.text
								x={centerX}
								y={y + layerHeight / 2 + 15}
								textAnchor="middle"
								fill="var(--diagram-text-muted)"
								fontSize={subtitleSize}
								animate={{
									opacity: isDimmed ? 0.3 : 0.8,
									fontSize: isHovered ? subtitleSize + 1 : subtitleSize,
								}}
								transition={{ duration: 0.2 }}
							>
								{subtitle}
							</motion.text>

							{/* Selection indicator */}
							{isSelected && (
								<motion.circle
									cx={centerX + width / 2 - selectionOffset}
									cy={y + 18}
									r="6"
									fill={layer.color}
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 300 }}
								/>
							)}
						</g>
					);
				})}

				{/* Connecting lines between layers */}
				{pyramidLayers.map((layer, index) => {
					if (index === pyramidLayers.length - 1) return null;

					const y = startY + index * (layerHeight + layerGap) + layerHeight;
					const nextY = startY + (index + 1) * (layerHeight + layerGap);
					const width = getLayerWidth(index);
					const nextWidth = getLayerWidth(index + 1);

					return (
						<g key={`line-${layer.id}`}>
							{/* Left connector */}
							<line
								x1={centerX - width / 2}
								y1={y}
								x2={centerX - nextWidth / 2}
								y2={nextY}
								stroke="var(--accent)"
								strokeWidth="1"
								strokeOpacity="0.3"
								strokeDasharray="3,3"
							/>
							{/* Right connector */}
							<line
								x1={centerX + width / 2}
								y1={y}
								x2={centerX + nextWidth / 2}
								y2={nextY}
								stroke="var(--accent)"
								strokeWidth="1"
								strokeOpacity="0.3"
								strokeDasharray="3,3"
							/>
						</g>
					);
				})}

				{/* Title */}
				<text
					x={centerX}
					y={35}
					textAnchor="middle"
					fill="var(--diagram-text)"
					fontSize={titleSize}
					fontWeight="700"
				>
					{isCompact ? "HyperHive Layers" : "HyperHive Stack Layers"}
				</text>
			</svg>
		</div>
	);
}
