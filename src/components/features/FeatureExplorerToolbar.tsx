'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Chip } from '@/components/ui/Chip';
import { layerInfo, getAllLayers } from '@/lib/features';
import type { FeatureLayer } from '@/lib/features';

interface FeatureExplorerToolbarProps {
	searchQuery: string;
	onSearchChange: (query: string) => void;
	selectedLayers: FeatureLayer[];
	onLayerToggle: (layer: FeatureLayer) => void;
	showConnections: boolean;
	onShowConnectionsToggle: () => void;
}

export function FeatureExplorerToolbar({
	searchQuery,
	onSearchChange,
	selectedLayers,
	onLayerToggle,
	showConnections,
	onShowConnectionsToggle,
}: FeatureExplorerToolbarProps) {
	const layers = getAllLayers();

	return (
		<div className="space-y-4">
			{/* Search */}
			<div className="relative">
				<Search
					className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8FA3BF]"
					size={18}
				/>
				<input
					type="text"
					placeholder="Search features by name or tags..."
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					className="w-full bg-[#0B1322] border border-[#1A2637] rounded-lg pl-10 pr-4 py-3
                     text-[#E6EDF7] placeholder:text-[#8FA3BF]
                     focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20
                     transition-all duration-200"
				/>
			</div>

			{/* Filters */}
			<div className="flex flex-wrap items-center gap-3">
				<span className="text-sm font-medium text-[#8FA3BF]">Filter by layer:</span>
				{layers.map((layer) => (
					<Chip
						key={layer}
						label={layerInfo[layer].label}
						active={selectedLayers.includes(layer)}
						color={layerInfo[layer].color}
						onClick={() => onLayerToggle(layer)}
					/>
				))}
			</div>

			{/* Toggle connections */}
			<div className="flex items-center justify-between pt-2 border-t border-[#1A2637]">
				<div className="flex items-center gap-2">
					<button
						onClick={onShowConnectionsToggle}
						className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${showConnections ? 'bg-teal-600' : 'bg-[#1A2637]'}
            `}
					>
						<span
							className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${showConnections ? 'translate-x-6' : 'translate-x-1'}
              `}
						/>
					</button>
					<span className="text-sm text-[#8FA3BF]">
						Show connections between features
					</span>
				</div>

				{selectedLayers.length > 0 && (
					<button
						onClick={() => selectedLayers.forEach(onLayerToggle)}
						className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
					>
						Clear filters
					</button>
				)}
			</div>

			{/* Active filters summary */}
			{(selectedLayers.length > 0 || searchQuery) && (
				<div className="flex items-center gap-2 text-sm text-[#8FA3BF]">
					<span>Active filters:</span>
					{searchQuery && (
						<span className="text-[#E6EDF7]">
							&quot;{searchQuery}&quot;
						</span>
					)}
					{selectedLayers.length > 0 && (
						<span className="text-[#E6EDF7]">
							{selectedLayers.length} layer{selectedLayers.length > 1 ? 's' : ''}
						</span>
					)}
				</div>
			)}
		</div>
	);
}
