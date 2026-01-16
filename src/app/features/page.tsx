'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers, Network, Server, Shield, Activity, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureCard } from '@/components/features/FeatureCard';
import { FeatureExplorerToolbar } from '@/components/features/FeatureExplorerToolbar';
import { FeatureDetailsPanel } from '@/components/features/FeatureDetailsPanel';
import { LayersPyramid } from '@/components/features/LayersPyramid';
import {
  features,
  layerInfo,
  getAllLayers,
  getFeatureById,
  getFeaturesByLayer,
} from '@/lib/features';
import type { Feature, FeatureLayer } from '@/lib/features';
import { cn } from '@/lib/utils';

export default function FeaturesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayers, setSelectedLayers] = useState<FeatureLayer[]>([]);
  const [showConnections, setShowConnections] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [selectedPyramidLayer, setSelectedPyramidLayer] = useState<FeatureLayer | null>(null);
  const [vmVideoIndex, setVmVideoIndex] = useState(0);
  const pyramidRef = useRef<HTMLDivElement>(null);

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

  const handlePyramidLayerClick = (layer: FeatureLayer) => {
    setSelectedPyramidLayer((prev) => (prev === layer ? null : layer));
  };

  useEffect(() => {
    if (!selectedPyramidLayer) return;

    const timeout = window.setTimeout(() => {
      pyramidRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [selectedPyramidLayer]);

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
  const vmVideos = [
    {
      light: '/static/gifs/vm-light.mp4',
      dark: '/static/gifs/vm-dark.mp4',
      label: 'Virtual machines running',
    },
    {
      light: '/static/gifs/vm-migrate-light.mp4',
      dark: '/static/gifs/vm-migrate-dark.mp4',
      label: 'Virtual machines migrating',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b border-border bg-gradient-to-b from-[color:var(--secondary)] to-[color:var(--background)]">
        <div className="container mx-auto px-4 py-20 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-6 sm:text-5xl lg:text-6xl">
              Features & Ecosystem
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 sm:text-lg lg:text-xl">
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border
                           hover:border-teal-500/50 text-foreground font-medium rounded-lg 
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
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 sm:text-3xl">
              Stack Visualization
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              HyperHive is built in 7 integrated layers. Click any layer to filter features below.
            </p>
          </div>

          {/* Pyramid Diagram with Animated Panel */}
          <div className="mb-16 max-w-7xl mx-auto">
            <div ref={pyramidRef} className="relative flex flex-col xl:flex-row gap-6 items-start">
              {/* Pyramid Container - Smooth transitions */}
              <motion.div
                className={cn(
                  'w-full transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  selectedPyramidLayer ? 'xl:pr-[440px]' : ''
                )}
              >
                <LayersPyramid
                  onLayerClick={handlePyramidLayerClick}
                  selectedLayers={selectedPyramidLayer ? [selectedPyramidLayer] : []}
                />
              </motion.div>

              {/* Layer Details Panel - Slides in from right */}
              <AnimatePresence mode="wait">
                {selectedPyramidLayer && (
                  <motion.div
                    key="layer-panel"
                    className="w-full xl:w-[420px] xl:shrink-0 xl:absolute xl:right-0 xl:top-0"
                    initial={{ x: 450, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 450, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="glass-card rounded-2xl border border-border/70 p-6 shadow-[0_18px_36px_var(--shadow-strong)] bg-[color:var(--surface-card-strong)] backdrop-blur-xl max-h-[70vh] sm:max-h-[800px] flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-2">
                            LAYER DETAILS
                          </p>
                          <motion.h3
                            className="font-display text-xl text-foreground mb-2"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {layerInfo[selectedPyramidLayer].label}
                          </motion.h3>
                          <motion.p
                            className="text-sm text-muted-foreground"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15 }}
                          >
                            {layerInfo[selectedPyramidLayer].description}
                          </motion.p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedPyramidLayer(null)}
                          className="rounded-full border border-border/70 bg-[color:var(--surface-overlay-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground hover:bg-[color:var(--surface-overlay)]"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Layer Color Indicator */}
                      <motion.div
                        className="h-1 rounded-full mb-6"
                        style={{ backgroundColor: layerInfo[selectedPyramidLayer].color }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      />

                      {/* Layer Features */}
                      <div className="flex-1 overflow-hidden flex flex-col">
                        <motion.div
                          className="mb-4 flex items-center gap-2"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.25 }}
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: layerInfo[selectedPyramidLayer].color }}
                          />
                          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                            Features in this Layer ({getFeaturesByLayer(selectedPyramidLayer).length})
                          </p>
                        </motion.div>

                        <div className="flex-1 overflow-y-auto space-y-2 pr-2 pt-1">
                          {getFeaturesByLayer(selectedPyramidLayer).map((feature, idx) => (
                            <motion.div
                              key={feature.id}
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                              onClick={() => {
                                setSelectedFeature(feature);
                                setSelectedPyramidLayer(null);
                                const element = document.getElementById(`feature-${feature.id}`);
                                if (element) {
                                  setTimeout(() => {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  }, 100);
                                }
                              }}
                              className="rounded-lg border border-border/50 bg-[color:var(--surface-overlay-soft)] p-4 cursor-pointer hover:bg-[color:var(--surface-overlay)] hover:border-teal-500/50 hover:-translate-y-0.5 transition-all"
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className="p-2 rounded-lg shrink-0"
                                  style={{ backgroundColor: `${layerInfo[selectedPyramidLayer].color}20` }}
                                >
                                  <feature.icon size={18} style={{ color: layerInfo[selectedPyramidLayer].color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold text-foreground mb-1">{feature.name}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-2">
                                    {feature.shortDescription}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <motion.div
                        className="mt-6 pt-6 border-t border-border/50 flex gap-3"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <button
                          onClick={() => {
                            setSelectedLayers([selectedPyramidLayer]);
                            setSelectedPyramidLayer(null);
                            const element = document.getElementById('feature-explorer');
                            if (element) {
                              setTimeout(() => {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }, 100);
                            }
                          }}
                          className="flex-1 px-4 py-2.5 bg-teal-600/20 hover:bg-teal-600/30 border border-teal-500/30 hover:border-teal-500/50 text-teal-400 text-sm font-medium rounded-lg transition-all hover:-translate-y-0.5"
                        >
                          Filter Below
                        </button>
                        <button
                          onClick={() => setSelectedPyramidLayer(null)}
                          className="px-4 py-2.5 bg-[color:var(--surface-overlay-soft)] hover:bg-[color:var(--surface-overlay)] border border-border/50 hover:border-border text-muted-foreground hover:text-foreground text-sm font-medium rounded-lg transition-all hover:-translate-y-0.5"
                        >
                          Close
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {selectedPyramidLayer === 'layer0' && (
                <motion.div
                  key="raid-gif"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex w-full justify-center"
                >
                  <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border/70 bg-[color:var(--surface-overlay-soft)] shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
                    <video
                      className="h-auto w-full object-cover dark:hidden"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="RAID storage running"
                      preload="metadata"
                    >
                      <source src="/static/gifs/raid-light.mp4" type="video/mp4" />
                    </video>
                    <video
                      className="hidden h-auto w-full object-cover dark:block"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="RAID storage running"
                      preload="metadata"
                    >
                      <source src="/static/gifs/raid-dark.mp4" type="video/mp4" />
                    </video>
                  </div>
                </motion.div>
              )}
              {selectedPyramidLayer === 'layer1' && (
                <motion.div
                  key="nfs-gif"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex w-full justify-center"
                >
                  <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border/70 bg-[color:var(--surface-overlay-soft)] shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
                    <video
                      className="h-auto w-full object-cover dark:hidden"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="NFS storage running"
                      preload="metadata"
                    >
                      <source src="/static/gifs/nfs-light.mp4" type="video/mp4" />
                    </video>
                    <video
                      className="hidden h-auto w-full object-cover dark:block"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label="NFS storage running"
                      preload="metadata"
                    >
                      <source src="/static/gifs/nfs-dark.mp4" type="video/mp4" />
                    </video>
                  </div>
                </motion.div>
              )}
              {selectedPyramidLayer === 'layer2' && (
                <motion.div
                  key="vm-gif"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex w-full justify-center"
                >
                  <div className="w-full max-w-3xl">
                    <div className="relative">
                      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border/70 bg-[color:var(--surface-overlay-soft)] shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
                        <video
                          key={`vm-light-${vmVideoIndex}`}
                          className="h-full w-full object-cover dark:hidden"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={vmVideos[vmVideoIndex].label}
                        preload="metadata"
                      >
                        <source src={vmVideos[vmVideoIndex].light} type="video/mp4" />
                      </video>
                      <video
                        key={`vm-dark-${vmVideoIndex}`}
                        className="hidden h-full w-full object-cover dark:block"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={vmVideos[vmVideoIndex].label}
                          preload="metadata"
                        >
                          <source src={vmVideos[vmVideoIndex].dark} type="video/mp4" />
                        </video>
                      </div>
                    {vmVideos.length > 1 && (
                      <button
                        type="button"
                        aria-label="Previous VM video"
                        onClick={() =>
                          setVmVideoIndex((prev) => (prev - 1 + vmVideos.length) % vmVideos.length)
                        }
                        className="absolute left-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-[color:var(--surface-overlay)] text-foreground transition hover:border-teal-500/50 hover:text-teal-300 sm:-left-14"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                    )}
                    {vmVideos.length > 1 && (
                      <button
                        type="button"
                        aria-label="Next VM video"
                        onClick={() =>
                          setVmVideoIndex((prev) => (prev + 1) % vmVideos.length)
                        }
                        className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-[color:var(--surface-overlay)] text-foreground transition hover:border-teal-500/50 hover:text-teal-300 sm:-right-14"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 sm:text-3xl">
              How It All Connects
            </h2>
            <p className="text-muted-foreground">
              If you only read one thing, read this:
            </p>
          </div>

          <div className="space-y-4 mb-12 max-w-5xl mx-auto">
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
                className="flex items-start gap-4 bg-card border border-border 
                           rounded-lg p-5 hover:border-border/80 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-teal-600/20 border border-teal-500/30 
                               flex items-center justify-center text-teal-400 font-bold shrink-0">
                  {idx + 1}
                </div>
                <p className="text-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Explorer Section */}
      <section id="feature-explorer" className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 sm:text-3xl">
              Feature Explorer
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
          <div className="mb-6 text-muted-foreground">
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
                        <h3 className="text-2xl font-bold text-foreground">
                          {info.label}
                        </h3>
                        <p className="text-muted-foreground mt-1">{info.description}</p>
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
              <p className="text-muted-foreground text-lg">
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
      <section className="py-20 border-t border-border bg-gradient-to-b from-[color:var(--background)] to-[color:var(--secondary)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4 sm:text-2xl">
              Ready to dive deeper?
            </h2>
            <p className="text-muted-foreground">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border
                         hover:border-teal-500/50 text-foreground font-medium rounded-lg 
                         transition-all duration-200 hover:-translate-y-0.5"
            >
              About 512rede
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/installation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border
                         hover:border-teal-500/50 text-foreground font-medium rounded-lg 
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
