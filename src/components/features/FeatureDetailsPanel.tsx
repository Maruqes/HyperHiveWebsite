'use client';

import React, { useEffect, useRef } from 'react';
import { X, Link as LinkIcon, ArrowRight } from 'lucide-react';
import type { Feature } from '@/lib/features';
import { Tag } from '@/components/ui/Tag';
import { layerInfo, getFeatureById } from '@/lib/features';

interface FeatureDetailsPanelProps {
	feature: Feature | null;
	onClose: () => void;
	onFeatureClick?: (featureId: string) => void;
}

export function FeatureDetailsPanel({
	feature,
	onClose,
	onFeatureClick,
}: FeatureDetailsPanelProps) {
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		if (feature) {
			document.addEventListener('keydown', handleEscape);
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [feature, onClose]);

	if (!feature) return null;

	const Icon = feature.icon;
	const layerColor = layerInfo[feature.layer].color;

	return (
		<>
			{/* Backdrop */}
			<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200" />

			{/* Panel */}
			<div
				ref={panelRef}
				className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-[#0E1524] border-l border-[#1A2637] 
                   z-50 overflow-y-auto animate-in slide-in-from-right duration-300"
			>
				{/* Header */}
				<div className="sticky top-0 bg-[#0E1524] border-b border-[#1A2637] p-6 z-10">
					<div className="flex items-start justify-between gap-4">
						<div className="flex items-start gap-4 flex-1">
							<div
								className="p-3 rounded-lg shrink-0"
								style={{ backgroundColor: `${layerColor}20` }}
							>
								<Icon size={28} style={{ color: layerColor }} />
							</div>
							<div className="flex-1 min-w-0">
								<h2 className="text-2xl font-bold text-[#E6EDF7] mb-2">
									{feature.name}
								</h2>
								<div className="flex items-center gap-2">
									<Tag color={layerColor}>
										{layerInfo[feature.layer].label}
									</Tag>
								</div>
							</div>
						</div>
						<button
							onClick={onClose}
							className="p-2 hover:bg-[#1A2637] rounded-lg transition-colors shrink-0"
						>
							<X size={20} className="text-[#8FA3BF]" />
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="p-6 space-y-6">
					{/* Short description */}
					<div>
						<p className="text-lg text-[#E6EDF7] leading-relaxed">
							{feature.shortDescription}
						</p>
					</div>

					{/* What it is */}
					<div className="bg-[#0B1322] border border-[#1A2637] rounded-lg p-5">
						<h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide mb-3">
							What it is
						</h3>
						<p className="text-[#E6EDF7] leading-relaxed">{feature.whatItIs}</p>
					</div>

					{/* Why exists */}
					<div className="bg-[#0B1322] border border-[#1A2637] rounded-lg p-5">
						<h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide mb-3">
							Why it exists
						</h3>
						<p className="text-[#E6EDF7] leading-relaxed">{feature.whyExists}</p>
					</div>

					{/* How it fits */}
					<div className="bg-[#0B1322] border border-[#1A2637] rounded-lg p-5">
						<h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wide mb-3">
							How it fits
						</h3>
						<p className="text-[#E6EDF7] leading-relaxed">{feature.howItFits}</p>
					</div>

					{/* Capabilities */}
					<div>
						<h3 className="text-sm font-semibold text-[#8FA3BF] uppercase tracking-wide mb-4">
							Capabilities
						</h3>
						<div className="space-y-3">
							{feature.capabilities.map((capability, idx) => (
								<div
									key={idx}
									className="flex items-start gap-3 bg-[#0B1322] border border-[#1A2637] rounded-lg p-4"
								>
									<div
										className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
										style={{ backgroundColor: layerColor }}
									/>
									<p className="text-[#E6EDF7] leading-relaxed">{capability}</p>
								</div>
							))}
						</div>
					</div>

					{/* Dependencies */}
					{feature.dependsOn.length > 0 && (
						<div>
							<h3 className="text-sm font-semibold text-[#8FA3BF] uppercase tracking-wide mb-4">
								Requires
							</h3>
							<div className="space-y-2">
								{feature.dependsOn.map((depId) => {
									const dep = getFeatureById(depId);
									if (!dep) return null;
									const DepIcon = dep.icon;
									const depColor = layerInfo[dep.layer].color;

									return (
										<button
											key={depId}
											onClick={() => onFeatureClick?.(depId)}
											className="w-full flex items-center gap-3 bg-[#0B1322] border border-[#1A2637] 
                                 hover:border-[#2A3647] rounded-lg p-4 transition-all duration-200
                                 hover:-translate-y-0.5 group"
										>
											<div
												className="p-2 rounded-lg"
												style={{ backgroundColor: `${depColor}20` }}
											>
												<DepIcon size={18} style={{ color: depColor }} />
											</div>
											<div className="flex-1 text-left">
												<p className="text-[#E6EDF7] font-medium group-hover:text-teal-400 transition-colors">
													{dep.name}
												</p>
												<p className="text-[#8FA3BF] text-sm">{dep.shortDescription}</p>
											</div>
											<ArrowRight size={16} className="text-[#8FA3BF]" />
										</button>
									);
								})}
							</div>
						</div>
					)}

					{/* Feeds into */}
					{feature.feedsInto.length > 0 && (
						<div>
							<h3 className="text-sm font-semibold text-[#8FA3BF] uppercase tracking-wide mb-4">
								Enables
							</h3>
							<div className="space-y-2">
								{feature.feedsInto.map((feedId) => {
									const feed = getFeatureById(feedId);
									if (!feed) return null;
									const FeedIcon = feed.icon;
									const feedColor = layerInfo[feed.layer].color;

									return (
										<button
											key={feedId}
											onClick={() => onFeatureClick?.(feedId)}
											className="w-full flex items-center gap-3 bg-[#0B1322] border border-[#1A2637] 
                                 hover:border-[#2A3647] rounded-lg p-4 transition-all duration-200
                                 hover:-translate-y-0.5 group"
										>
											<div
												className="p-2 rounded-lg"
												style={{ backgroundColor: `${feedColor}20` }}
											>
												<FeedIcon size={18} style={{ color: feedColor }} />
											</div>
											<div className="flex-1 text-left">
												<p className="text-[#E6EDF7] font-medium group-hover:text-teal-400 transition-colors">
													{feed.name}
												</p>
												<p className="text-[#8FA3BF] text-sm">{feed.shortDescription}</p>
											</div>
											<ArrowRight size={16} className="text-[#8FA3BF]" />
										</button>
									);
								})}
							</div>
						</div>
					)}

					{/* Links */}
					{feature.links.length > 0 && (
						<div>
							<h3 className="text-sm font-semibold text-[#8FA3BF] uppercase tracking-wide mb-4">
								Related links
							</h3>
							<div className="flex flex-wrap gap-3">
								{feature.links.map((link, idx) => (
									<a
										key={idx}
										href={link.href}
										className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1322] border border-[#1A2637]
                               hover:border-teal-500/50 rounded-lg text-teal-400 hover:text-teal-300
                               transition-all duration-200 hover:-translate-y-0.5"
									>
										<LinkIcon size={14} />
										{link.label}
									</a>
								))}
							</div>
						</div>
					)}

					{/* Tags */}
					<div>
						<h3 className="text-sm font-semibold text-[#8FA3BF] uppercase tracking-wide mb-4">
							Tags
						</h3>
						<div className="flex flex-wrap gap-2">
							{feature.keywords.map((keyword, idx) => (
								<span
									key={idx}
									className="px-3 py-1 bg-[#0B1322] border border-[#1A2637] rounded text-[#8FA3BF] text-sm"
								>
									{keyword}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
