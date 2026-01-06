'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Network, Server, Shield, Activity, Box } from 'lucide-react';
import { FeatureCard } from '@/components/features/FeatureCard';
import { FeatureExplorerToolbar } from '@/components/features/FeatureExplorerToolbar';
import { FeatureDetailsPanel } from '@/components/features/FeatureDetailsPanel';
import {
  features,
  layerInfo,
  getAllLayers,
  getFeatureById,
  getFeaturesByLayer,
} from '@/lib/features';
import type { Feature, FeatureLayer } from '@/lib/features';

export default function FeaturesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayers, setSelectedLayers] = useState<FeatureLayer[]>([]);
  const [showConnections, setShowConnections] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  // Filter features
  const filteredFeatures = useMemo(() => {
    return features.filter((feature) => {
      // Layer filter
      if (selectedLayers.length > 0 && !selectedLayers.includes(feature.layer)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = feature.name.toLowerCase().includes(query);
        const matchesDescription = feature.shortDescription.toLowerCase().includes(query);
        const matchesKeywords = feature.keywords.some((k) => k.toLowerCase().includes(query));

        return matchesName || matchesDescription || matchesKeywords;
      }

      return true;
    });
  }, [selectedLayers, searchQuery]);

  const handleLayerToggle = (layer: FeatureLayer) => {
    setSelectedLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  };

  const handleFeatureClick = (feature: Feature) => {
    setSelectedFeature(feature);
  };

  const handleDependencyClick = (featureId: string) => {
    const feature = getFeatureById(featureId);
    if (feature) {
      setSelectedFeature(feature);
      // Scroll to the feature card
      const element = document.getElementById(`feature-${featureId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const layers = getAllLayers();

  return (
    <main className="min-h-screen bg-[#050810]">
      {/* Hero Section */}
      <section className="relative border-b border-[#1A2637] bg-gradient-to-b from-[#0E1524] to-[#050810]">
        <div className="container mx-auto px-4 py-20 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-[#E6EDF7] mb-6">
              Features & Ecosystem
            </h1>
            <p className="text-xl text-[#8FA3BF] leading-relaxed mb-8">
              HyperHive is an integrated stack built in layers: from{' '}
              <span className="text-teal-400 font-medium">Storage Foundation</span> to{' '}
              <span className="text-teal-400 font-medium">Secure Access</span>, through{' '}
              <span className="text-teal-400 font-medium">Network Storage</span>,{' '}
              <span className="text-teal-400 font-medium">Compute</span>,{' '}
              <span className="text-teal-400 font-medium">Edge Routing</span>, and{' '}
              <span className="text-teal-400 font-medium">Operations</span>. The value is
              how each layer feeds the next, not just the feature list.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/architecture"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 
                           text-white font-medium rounded-lg transition-all duration-200 
                           hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5"
              >
                View Architecture
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/512rede"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1322] border border-[#1A2637]
                           hover:border-teal-500/50 text-[#E6EDF7] font-medium rounded-lg 
                           transition-all duration-200 hover:-translate-y-0.5"
              >
                About 512rede
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It All Connects Section */}
      <section className="py-20 border-b border-[#1A2637]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#E6EDF7] mb-4">
              How It All Connects
            </h2>
            <p className="text-[#8FA3BF]">
              If you only read one thing, read this:
            </p>
          </div>

          <div className="space-y-4 mb-12">
            {[
              'BTRFS/RAIDs + Auto-Mounts + SmartDisk create a stable storage foundation.',
              'NFS turns that storage into a shared cluster resource over 512rede.',
              'VMs/Docker/K8 consume shared storage for mobility and consistency.',
              'Nginx is the front door: routing, TLS, streams, redirects, and error handling.',
              'WireGuard + SPA shrink the attack surface and gate access by intent.',
              'Backups/Updates/Logs keep the system recoverable, maintainable, and observable.',
            ].map((text, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 bg-[#0B1322] border border-[#1A2637] 
                           rounded-lg p-5 hover:border-[#2A3647] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-teal-600/20 border border-teal-500/30 
                               flex items-center justify-center text-teal-400 font-bold shrink-0">
                  {idx + 1}
                </div>
                <p className="text-[#E6EDF7] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Explorer Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#E6EDF7] mb-4">
              Feature Explorer
            </h2>
            <p className="text-[#8FA3BF] max-w-2xl mx-auto">
              Explore all HyperHive features, organized by layers. Use filters
              to navigate and discover how everything connects.
            </p>
          </div>

          {/* Toolbar */}
          <div className="mb-10">
            <FeatureExplorerToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedLayers={selectedLayers}
              onLayerToggle={handleLayerToggle}
              showConnections={showConnections}
              onShowConnectionsToggle={() => setShowConnections(!showConnections)}
            />
          </div>

          {/* Results count */}
          <div className="mb-6 text-[#8FA3BF]">
            {filteredFeatures.length === features.length ? (
              <p>Showing all {features.length} features</p>
            ) : (
              <p>
                {filteredFeatures.length} of {features.length} features
              </p>
            )}
          </div>

          {/* Feature Grid by Layer */}
          {filteredFeatures.length > 0 ? (
            <div className="space-y-16">
              {layers.map((layer) => {
                const layerFeatures = filteredFeatures.filter((f) => f.layer === layer);
                if (layerFeatures.length === 0) return null;

                const info = layerInfo[layer];
                const icons = {
                  layer0: Layers,
                  layer1: Network,
                  layer2: Server,
                  edge: Network,
                  access: Shield,
                  operations: Activity,
                  assets: Box,
                };
                const Icon = icons[layer];

                return (
                  <div key={layer} className="space-y-6">
                    {/* Layer Header */}
                    <div className="flex items-center gap-4 pb-4 border-b-2" style={{ borderColor: info.color }}>
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${info.color}20` }}
                      >
                        <Icon size={32} style={{ color: info.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#E6EDF7]">
                          {info.label}
                        </h3>
                        <p className="text-[#8FA3BF] mt-1">{info.description}</p>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {layerFeatures.map((feature) => (
                        <div key={feature.id} id={`feature-${feature.id}`} className="h-full">
                          <FeatureCard
                            feature={feature}
                            showConnections={showConnections}
                            onClick={() => handleFeatureClick(feature)}
                            onDependencyClick={handleDependencyClick}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#8FA3BF] text-lg">
                No features found with applied filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLayers([]);
                }}
                className="mt-4 text-teal-400 hover:text-teal-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-[#1A2637] bg-gradient-to-b from-[#050810] to-[#0E1524]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#E6EDF7] mb-4">
              Ready to dive deeper?
            </h2>
            <p className="text-[#8FA3BF]">
              Explore the architecture and network infrastructure
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/architecture"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 
                         text-white font-medium rounded-lg transition-all duration-200 
                         hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5"
            >
              View complete architecture
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/512rede"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1322] border border-[#1A2637]
                         hover:border-teal-500/50 text-[#E6EDF7] font-medium rounded-lg 
                         transition-all duration-200 hover:-translate-y-0.5"
            >
              About 512rede
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/installation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1322] border border-[#1A2637]
                         hover:border-teal-500/50 text-[#E6EDF7] font-medium rounded-lg 
                         transition-all duration-200 hover:-translate-y-0.5"
            >
              View installation
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Details Panel */}
      <FeatureDetailsPanel
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onFeatureClick={handleDependencyClick}
      />
    </main>
  );
}
