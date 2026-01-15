'use client';

import React, { useState } from 'react';
import { features, layerInfo } from '@/lib/features';
import type { Feature } from '@/lib/features';

interface EcosystemMapProps {
	onFeatureClick?: (feature: Feature) => void;
}

export function EcosystemMap({ onFeatureClick }: EcosystemMapProps) {
	const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

	const handleFeatureClick = (feature: Feature) => {
		onFeatureClick?.(feature);
	};

	const isRelated = (featureId: string): boolean => {
		if (!hoveredFeature) return false;
		const hovered = features.find((f) => f.id === hoveredFeature);
		if (!hovered) return false;

		return (
			hovered.dependsOn.includes(featureId) ||
			hovered.feedsInto.includes(featureId) ||
			featureId === hoveredFeature
		);
	};

	// Organize features by layer
	const nfsFeature = features.find((f) => f.id === 'nfs');

	return (
		<div className="w-full overflow-x-auto">
			<svg
				viewBox="0 0 1200 900"
				className="w-full h-auto"
				style={{ minHeight: '500px', maxHeight: '800px' }}
			>
				<defs>
					{/* Arrow markers */}
					<marker
						id="arrowhead"
						markerWidth="10"
						markerHeight="10"
						refX="9"
						refY="3"
						orient="auto"
						className="fill-accent"
					>
						<polygon points="0 0, 10 3, 0 6" />
					</marker>
					<marker
						id="arrowhead-active"
						markerWidth="10"
						markerHeight="10"
						refX="9"
						refY="3"
						orient="auto"
						className="fill-teal-400"
					>
						<polygon points="0 0, 10 3, 0 6" />
					</marker>
				</defs>

				{/* Background grid */}
				<pattern
					id="grid"
					width="40"
					height="40"
					patternUnits="userSpaceOnUse"
				>
					<path
						d="M 40 0 L 0 0 0 40"
						fill="none"
						stroke="var(--diagram-border)"
						strokeWidth="0.5"
						opacity="0.3"
					/>
				</pattern>
				<rect width="1200" height="900" fill="url(#grid)" />

				{/* Connections (arrows) */}
				{/* Layer0 -> NFS */}
				<line
					x1="200"
					y1="120"
					x2="200"
					y2="200"
					stroke="var(--accent)"
					strokeWidth={hoveredFeature && isRelated('nfs') ? '3' : '2'}
					markerEnd={
						hoveredFeature && isRelated('nfs')
							? 'url(#arrowhead-active)'
							: 'url(#arrowhead)'
					}
					opacity={hoveredFeature ? (isRelated('nfs') ? 1 : 0.2) : 0.6}
					className="transition-all duration-300"
				/>

				{/* NFS -> Layer2 */}
				<line
					x1="200"
					y1="260"
					x2="200"
					y2="340"
					stroke="var(--accent)"
					strokeWidth={hoveredFeature && isRelated('virtual-machines') ? '3' : '2'}
					markerEnd={
						hoveredFeature && isRelated('virtual-machines')
							? 'url(#arrowhead-active)'
							: 'url(#arrowhead)'
					}
					opacity={
						hoveredFeature ? (isRelated('virtual-machines') ? 1 : 0.2) : 0.6
					}
					className="transition-all duration-300"
				/>

				{/* Assets -> Layer2 */}
				<line
					x1="100"
					y1="280"
					x2="150"
					y2="360"
					stroke="var(--accent)"
					strokeWidth="2"
					markerEnd="url(#arrowhead)"
					opacity={hoveredFeature ? (isRelated('isos') ? 1 : 0.2) : 0.4}
					className="transition-all duration-300"
				/>
				<line
					x1="300"
					y1="280"
					x2="250"
					y2="360"
					stroke="var(--accent)"
					strokeWidth="2"
					markerEnd="url(#arrowhead)"
					opacity={hoveredFeature ? (isRelated('docker-images') ? 1 : 0.2) : 0.4}
					className="transition-all duration-300"
				/>

				{/* Layer2 -> Edge */}
				<line
					x1="200"
					y1="420"
					x2="200"
					y2="500"
					stroke="var(--accent)"
					strokeWidth={hoveredFeature && isRelated('nginx-proxy') ? '3' : '2'}
					markerEnd={
						hoveredFeature && isRelated('nginx-proxy')
							? 'url(#arrowhead-active)'
							: 'url(#arrowhead)'
					}
					opacity={
						hoveredFeature ? (isRelated('nginx-proxy') ? 1 : 0.2) : 0.6
					}
					className="transition-all duration-300"
				/>

				{/* Access -> Edge */}
				<line
					x1="950"
					y1="540"
					x2="350"
					y2="540"
					stroke="var(--accent)"
					strokeWidth="2"
					markerEnd="url(#arrowhead)"
					opacity={hoveredFeature ? (isRelated('wireguard') ? 1 : 0.2) : 0.5}
					className="transition-all duration-300"
				/>

				{/* Edge -> Operations (Logs) */}
				<line
					x1="300"
					y1="560"
					x2="550"
					y2="650"
					stroke="var(--accent)"
					strokeWidth="2"
					markerEnd="url(#arrowhead)"
					opacity={hoveredFeature ? (isRelated('logs') ? 1 : 0.2) : 0.4}
					strokeDasharray="5,5"
					className="transition-all duration-300"
				/>

				{/* Layer0 SmartDisk -> Logs */}
				<line
					x1="320"
					y1="100"
					x2="600"
					y2="650"
					stroke="var(--accent)"
					strokeWidth="2"
					markerEnd="url(#arrowhead)"
					opacity={hoveredFeature ? (isRelated('smartdisk') ? 1 : 0.2) : 0.3}
					strokeDasharray="5,5"
					className="transition-all duration-300"
				/>

				{/* Layer 0 - Storage Foundation */}
				<g className="cursor-pointer">
					<rect
						x="50"
						y="50"
						width="300"
						height="80"
						rx="8"
						fill="var(--card)"
						stroke={layerInfo.layer0.color}
						strokeWidth="2"
						opacity={hoveredFeature ? (isRelated('btrfs-raids') ? 1 : 0.3) : 1}
						className="transition-all duration-300"
					/>
					<text x="200" y="75" fill="var(--diagram-text)" fontSize="14" fontWeight="600" textAnchor="middle">
						Layer 0 - Storage Foundation
					</text>
					<text x="200" y="100" fill="var(--diagram-text-muted)" fontSize="12" textAnchor="middle">
						BTRFS/RAIDs | Auto-Mounts | SmartDisk
					</text>
				</g>

				{/* Layer 1 - NFS */}
				{nfsFeature && (
					<g
						className="cursor-pointer"
						onMouseEnter={() => setHoveredFeature(nfsFeature.id)}
						onMouseLeave={() => setHoveredFeature(null)}
						onClick={() => handleFeatureClick(nfsFeature)}
					>
						<rect
							x="100"
							y="210"
							width="200"
							height="60"
							rx="8"
							fill="var(--card)"
							stroke={layerInfo.layer1.color}
							strokeWidth={hoveredFeature === nfsFeature.id ? '3' : '2'}
							opacity={hoveredFeature ? (isRelated(nfsFeature.id) ? 1 : 0.3) : 1}
							className="transition-all duration-300"
						/>
						<text
							x="200"
							y="235"
							fill="var(--diagram-text)"
							fontSize="14"
							fontWeight="600"
							textAnchor="middle"
						>
							Layer 1 - NFS
						</text>
						<text
							x="200"
							y="255"
							fill="var(--diagram-text-muted)"
							fontSize="11"
							textAnchor="middle"
						>
							Network Storage
						</text>
					</g>
				)}

				{/* Assets */}
				<g className="cursor-pointer">
					<rect
						x="50"
						y="250"
						width="70"
						height="50"
						rx="6"
						fill="var(--card)"
						stroke={layerInfo.assets.color}
						strokeWidth="2"
						opacity={hoveredFeature ? (isRelated('isos') ? 1 : 0.3) : 0.8}
						className="transition-all duration-300"
					/>
					<text x="85" y="270" fill="var(--diagram-text-muted)" fontSize="11" textAnchor="middle">
						ISOs
					</text>
					<text x="85" y="285" fill="var(--diagram-text-muted)" fontSize="9" textAnchor="middle">
						(Assets)
					</text>
				</g>
				<g className="cursor-pointer">
					<rect
						x="280"
						y="250"
						width="70"
						height="50"
						rx="6"
						fill="var(--card)"
						stroke={layerInfo.assets.color}
						strokeWidth="2"
						opacity={hoveredFeature ? (isRelated('docker-images') ? 1 : 0.3) : 0.8}
						className="transition-all duration-300"
					/>
					<text x="315" y="270" fill="var(--diagram-text-muted)" fontSize="11" textAnchor="middle">
						Docker
					</text>
					<text x="315" y="285" fill="var(--diagram-text-muted)" fontSize="9" textAnchor="middle">
						Images
					</text>
				</g>

				{/* Layer 2 - Compute */}
				<g className="cursor-pointer">
					<rect
						x="50"
						y="350"
						width="300"
						height="80"
						rx="8"
						fill="var(--card)"
						stroke={layerInfo.layer2.color}
						strokeWidth="2"
						opacity={
							hoveredFeature
								? isRelated('virtual-machines') ||
									isRelated('docker') ||
									isRelated('k8-cluster')
									? 1
									: 0.3
								: 1
						}
						className="transition-all duration-300"
					/>
					<text x="200" y="375" fill="var(--diagram-text)" fontSize="14" fontWeight="600" textAnchor="middle">
						Layer 2 - Compute
					</text>
					<text x="200" y="400" fill="var(--diagram-text-muted)" fontSize="12" textAnchor="middle">
						VMs | Docker | K8 Cluster
					</text>
				</g>

				{/* Edge - Nginx */}
				<g className="cursor-pointer">
					<rect
						x="50"
						y="510"
						width="300"
						height="80"
						rx="8"
						fill="var(--card)"
						stroke={layerInfo.edge.color}
						strokeWidth="2"
						opacity={
							hoveredFeature
								? isRelated('nginx-proxy') ||
									isRelated('nginx-certificates') ||
									isRelated('nginx-streams')
									? 1
									: 0.3
								: 1
						}
						className="transition-all duration-300"
					/>
					<text x="200" y="535" fill="var(--diagram-text)" fontSize="14" fontWeight="600" textAnchor="middle">
						Edge - Nginx
					</text>
					<text x="200" y="560" fill="var(--diagram-text-muted)" fontSize="11" textAnchor="middle">
						Proxy | Certs | Streams | Redirect | 404
					</text>
				</g>

				{/* Secure Access */}
				<g className="cursor-pointer">
					<rect
						x="900"
						y="510"
						width="250"
						height="80"
						rx="8"
						fill="var(--card)"
						stroke={layerInfo.access.color}
						strokeWidth="2"
						opacity={
							hoveredFeature
								? isRelated('wireguard') || isRelated('spa')
									? 1
									: 0.3
								: 1
						}
						className="transition-all duration-300"
					/>
					<text x="1025" y="535" fill="var(--diagram-text)" fontSize="14" fontWeight="600" textAnchor="middle">
						Secure Access
					</text>
					<text x="1025" y="560" fill="var(--diagram-text-muted)" fontSize="12" textAnchor="middle">
						WireGuard VPN | SPA
					</text>
				</g>

				{/* Operations */}
				<g className="cursor-pointer">
					<rect
						x="450"
						y="670"
						width="350"
						height="80"
						rx="8"
						fill="var(--card)"
						stroke={layerInfo.operations.color}
						strokeWidth="2"
						opacity={
							hoveredFeature
								? isRelated('backups') ||
									isRelated('auto-backups') ||
									isRelated('updates') ||
									isRelated('logs')
									? 1
									: 0.3
								: 1
						}
						className="transition-all duration-300"
					/>
					<text x="625" y="695" fill="var(--diagram-text)" fontSize="14" fontWeight="600" textAnchor="middle">
						Operations
					</text>
					<text x="625" y="720" fill="var(--diagram-text-muted)" fontSize="11" textAnchor="middle">
						Backups | Auto-Backups | Updates | Logs
					</text>
				</g>

				{/* Legend */}
				<g>
					<text x="50" y="830" fill="var(--diagram-text-muted)" fontSize="12" fontWeight="500">
						Legend:
					</text>
					<line
						x1="50"
						y1="850"
						x2="100"
						y2="850"
						stroke="var(--accent)"
						strokeWidth="2"
						markerEnd="url(#arrowhead)"
					/>
					<text x="110" y="855" fill="var(--diagram-text-muted)" fontSize="11">
						Data flow / dependencies
					</text>
					<line
						x1="300"
						y1="850"
						x2="350"
						y2="850"
						stroke="var(--accent)"
						strokeWidth="2"
						strokeDasharray="5,5"
						markerEnd="url(#arrowhead)"
					/>
					<text x="360" y="855" fill="var(--diagram-text-muted)" fontSize="11">
						Logs
					</text>
					<text x="550" y="855" fill="var(--diagram-text-muted)" fontSize="11">
						Hover to highlight, click for details
					</text>
				</g>
			</svg>
		</div>
	);
}
