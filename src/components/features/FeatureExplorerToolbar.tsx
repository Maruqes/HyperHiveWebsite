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
}

export function FeatureExplorerToolbar({
	searchQuery,
	onSearchChange,
	selectedLayers,
	onLayerToggle,
}: FeatureExplorerToolbarProps) {
	const layers = getAllLayers();

	return (
		<div className="space-y-4">
			{/* Search */}
			<div className="relative">
				<Search
					className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
					size={18}
				/>
				<input
					type="text"
					placeholder="Search features by name or tags..."
					value={searchQuery}
					onChange={(e) => onSearchChange(e.target.value)}
					className="w-full bg-[color:var(--surface-input)] border border-border rounded-lg pl-10 pr-4 py-3
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20
                     transition-all duration-200"
				/>
			</div>

			{/* Filters */}
			<div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
				<span className="text-sm font-medium text-muted-foreground">Filter by layer:</span>
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

			{selectedLayers.length > 0 && (
				<div className="flex justify-end border-t border-border pt-2">
					<button
						onClick={() => selectedLayers.forEach(onLayerToggle)}
						className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
					>
						Clear filters
					</button>
				</div>
			)}

			{/* Active filters summary */}
			{(selectedLayers.length > 0 || searchQuery) && (
				<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
					<span>Active filters:</span>
					{searchQuery && (
						<span className="text-foreground">
							&quot;{searchQuery}&quot;
						</span>
					)}
					{selectedLayers.length > 0 && (
						<span className="text-foreground">
							{selectedLayers.length} layer{selectedLayers.length > 1 ? 's' : ''}
						</span>
					)}
				</div>
			)}
		</div>
	);
}
