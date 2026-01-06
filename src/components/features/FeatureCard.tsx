'use client';

import React from 'react';
import { ArrowRight, Link as LinkIcon } from 'lucide-react';
import type { Feature } from '@/lib/features';
import { Tag } from '@/components/ui/Tag';
import { getFeatureById, layerInfo } from '@/lib/features';

interface FeatureCardProps {
	feature: Feature;
	showConnections?: boolean;
	onClick?: () => void;
	onDependencyClick?: (id: string) => void;
}

export function FeatureCard({
	feature,
	showConnections = false,
	onClick,
	onDependencyClick,
}: FeatureCardProps) {
	const Icon = feature.icon;
	const layerColor = layerInfo[feature.layer].color;

	return (
		<div
			onClick={onClick}
			className="group relative flex h-full flex-col rounded-lg border border-[#1A2637] bg-[#0B1322] p-5
                 transition-all duration-300 hover:-translate-y-1 hover:border-[#2A3647]
                 hover:shadow-lg hover:shadow-teal-500/5 cursor-pointer"
		>
			{/* Layer indicator */}
			<div
				className="absolute top-0 left-0 w-1 h-full rounded-l-lg"
				style={{ backgroundColor: layerColor }}
			/>

			{/* Header */}
			<div className="flex items-start gap-3 mb-3">
				<div
					className="p-2 rounded-lg shrink-0"
					style={{ backgroundColor: `${layerColor}20` }}
				>
					<Icon size={20} style={{ color: layerColor }} />
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="text-[#E6EDF7] font-semibold text-base mb-1 group-hover:text-teal-400 transition-colors">
						{feature.name}
					</h3>
					<p className="text-[#8FA3BF] text-sm leading-relaxed">
						{feature.shortDescription}
					</p>
				</div>
			</div>

			{/* Capabilities */}
			<div className="space-y-2 mb-4">
				{feature.capabilities.map((capability, idx) => (
					<div key={idx} className="flex items-start gap-2">
						<div
							className="w-1 h-1 rounded-full mt-2 shrink-0"
							style={{ backgroundColor: layerColor }}
						/>
						<p className="text-[#8FA3BF] text-sm leading-relaxed">{capability}</p>
					</div>
				))}
			</div>

			{/* Connections */}
			{showConnections && (feature.dependsOn.length > 0 || feature.feedsInto.length > 0) && (
				<div className="mt-4 pt-4 border-t border-[#1A2637] space-y-3">
					{feature.dependsOn.length > 0 && (
						<div>
							<p className="text-[#8FA3BF] text-xs font-medium mb-2">Requires:</p>
							<div className="flex flex-wrap gap-1.5">
								{feature.dependsOn.map((depId) => {
									const depFeature = getFeatureById(depId);
									const depLabel = depFeature?.name ?? depId;
									const depColor = depFeature
										? layerInfo[depFeature.layer].color
										: layerColor;

									return (
										<button
											key={depId}
											onClick={(e) => {
												e.stopPropagation();
												onDependencyClick?.(depId);
											}}
											className="hover:scale-105 transition-transform"
										>
											<Tag size="sm" color={depColor}>
												{depLabel}
											</Tag>
										</button>
									);
								})}
							</div>
						</div>
					)}
					{feature.feedsInto.length > 0 && (
						<div>
							<p className="text-[#8FA3BF] text-xs font-medium mb-2">Enables:</p>
							<div className="flex flex-wrap gap-1.5">
								{feature.feedsInto.map((feedId) => {
									const feedFeature = getFeatureById(feedId);
									const feedLabel = feedFeature?.name ?? feedId;
									const feedColor = feedFeature
										? layerInfo[feedFeature.layer].color
										: layerColor;

									return (
										<button
											key={feedId}
											onClick={(e) => {
												e.stopPropagation();
												onDependencyClick?.(feedId);
											}}
											className="hover:scale-105 transition-transform"
										>
											<Tag size="sm" color={feedColor} variant="outlined">
												{feedLabel}
											</Tag>
										</button>
									);
								})}
							</div>
						</div>
					)}
				</div>
			)}

			{/* Mini diagram (optional, when connections are shown) */}
			{showConnections && feature.dependsOn.length > 0 && feature.feedsInto.length > 0 && (
				<div className="mt-4 pt-4 border-t border-[#1A2637]">
					<svg viewBox="0 0 200 60" className="w-full h-12 opacity-40">
						<defs>
							<marker
								id={`arrow-${feature.id}`}
								markerWidth="8"
								markerHeight="8"
								refX="7"
								refY="3"
								orient="auto"
							>
								<polygon points="0 0, 8 3, 0 6" fill={layerColor} />
							</marker>
						</defs>

						{/* Left (depends) */}
						<circle cx="30" cy="30" r="8" fill={`${layerColor}30`} stroke={layerColor} strokeWidth="1" />

						{/* Center (this feature) */}
						<rect x="85" y="22" width="30" height="16" rx="3" fill={layerColor} />

						{/* Right (feeds) */}
						<circle cx="170" cy="30" r="8" fill={`${layerColor}30`} stroke={layerColor} strokeWidth="1" />

						{/* Arrows */}
						<line
							x1="40"
							y1="30"
							x2="83"
							y2="30"
							stroke={layerColor}
							strokeWidth="1.5"
							markerEnd={`url(#arrow-${feature.id})`}
						/>
						<line
							x1="117"
							y1="30"
							x2="160"
							y2="30"
							stroke={layerColor}
							strokeWidth="1.5"
							markerEnd={`url(#arrow-${feature.id})`}
						/>
					</svg>
				</div>
			)}

			{/* View more button */}
			<div className="mt-auto pt-4 border-t border-[#1A2637] flex items-center justify-between">
				<div className="flex gap-2">
					{feature.links.slice(0, 2).map((link, idx) => (
						<a
							key={idx}
							href={link.href}
							onClick={(e) => e.stopPropagation()}
							className="text-xs text-[#8FA3BF] hover:text-teal-400 transition-colors flex items-center gap-1"
						>
							<LinkIcon size={12} />
							{link.label}
						</a>
					))}
				</div>
				<button
					className="text-xs text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-medium"
				>
					View details
					<ArrowRight size={14} />
				</button>
			</div>
		</div>
	);
}
