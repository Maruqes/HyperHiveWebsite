import type { LucideIcon } from 'lucide-react';
import {
	HardDrive,
	Network,
	Server,
	Disc,
	Box,
	Container,
	Boxes,
	Shield,
	Database,
	RefreshCw,
	FileText,
	Globe,
	Lock,
	KeyRound,
	AlertCircle,
	ArrowLeftRight,
} from 'lucide-react';

export type FeatureLayer =
	| 'layer0'
	| 'layer1'
	| 'layer2'
	| 'edge'
	| 'access'
	| 'operations'
	| 'assets';

export interface Feature {
	id: string;
	name: string;
	layer: FeatureLayer;
	icon: LucideIcon;
	shortDescription: string;
	whatItIs: string;
	whyExists: string;
	howItFits: string;
	capabilities: string[];
	dependsOn: string[];
	feedsInto: string[];
	keywords: string[];
	links: { label: string; href: string }[];
}
// =======================================================
// Layers
// =======================================================

export const layerInfo: Record<
	FeatureLayer,
	{ label: string; description: string; color: string }
> = {
	layer0: {
		label: 'Layer 0 - Storage Foundation',
		description: 'Local storage reliability: RAID pools, mounts, disk health',
		color: '#803030',
	},
	layer1: {
		label: 'Layer 1 - Network Storage',
		description: 'How storage is shared and reached across the cluster',
		color: '#389088',
	},
	layer2: {
		label: 'Layer 2 - Compute',
		description: 'Where workloads run: VMs, Docker, Kubernetes',
		color: '#4A90E2',
	},
	edge: {
		label: 'Edge - Routing',
		description: 'How services are exposed (HTTP/HTTPS + TCP/UDP)',
		color: '#9B59B6',
	},
	access: {
		label: 'Secure Access',
		description: 'How access is protected before reaching the Edge',
		color: '#E67E22',
	},
	operations: {
		label: 'Operations',
		description: 'Maintenance, recovery, backups, updates, logs',
		color: '#95A5A6',
	},
	assets: {
		label: 'Assets',
		description: 'Reusable resources that support deployments and compute',
		color: '#F39C12',
	},
};

// =======================================================
// Features (ONLY your existing ones, corrected)
// =======================================================

export const features: Feature[] = [
	// -------------------------------------------------------
	// Layer 0 - Storage Foundation
	// -------------------------------------------------------
	{
		id: 'btrfs-raids',
		name: 'BTRFS / RAIDs',
		layer: 'layer0',
		icon: HardDrive,
		shortDescription: 'BTRFS used to create and manage RAID storage pools',
		whatItIs:
			'BTRFS configured mainly to create and manage RAID storage pools on local disks.',
		whyExists:
			'Provide redundancy and keep storage available even when a disk degrades or fails.',
		howItFits:
			'This is the storage baseline. Everything above assumes storage pools exist and remain healthy.',
		capabilities: [
			'Create and manage BTRFS RAID pools',
			'Add/replace disks and keep the pool consistent',
			'Run maintenance workflows when needed (e.g., scrub/balance)',
		],
		dependsOn: [],
		feedsInto: ['auto-mounts', 'nfs', 'backups'],
		keywords: ['btrfs', 'raid', 'storage', 'filesystem', 'redundancy'],
		links: [
			{ label: 'View Architecture', href: '/architecture' },
			{ label: 'About 512rede', href: '/512rede' },
		],
	},
	{
		id: 'auto-mounts',
		name: 'Auto-Mounts',
		layer: 'layer0',
		icon: ArrowLeftRight,
		shortDescription: 'Automatic mounting of volumes and devices',
		whatItIs:
			'Automation that ensures BTRFS volumes and required storage paths are mounted at boot.',
		whyExists:
			'Remove manual steps and keep storage ready before network exports and workloads rely on it.',
		howItFits:
			'Ensures the storage foundation is present before NFS exports are served.',
		capabilities: [
			'Automatic mounts at system boot',
			'Consistent mount paths used by other services',
			'Retries on transient failures',
		],
		dependsOn: ['btrfs-raids'],
		feedsInto: ['nfs'],
		keywords: ['mount', 'automation', 'boot', 'volumes'],
		links: [{ label: 'View Architecture', href: '/architecture' }],
	},
	{
		id: 'smartdisk',
		name: 'SmartDisk',
		layer: 'layer0',
		icon: AlertCircle,
		shortDescription: 'Disk health monitoring + remediation routines',
		whatItIs:
			'S.M.A.R.T. monitoring with health checks and routines to detect issues early and attempt to extend disk life.',
		whyExists:
			'Spot degradation early and act before the storage pool is at risk.',
		howItFits:
			'Supports Layer 0 reliability and feeds operational visibility through Logs.',
		capabilities: [
			'S.M.A.R.T. metrics and temperature tracking',
			'Short and long tests with history',
			'Remediation routine to trigger/encourage sector remapping (“realloc/remap”) when applicable',
		],
		dependsOn: ['btrfs-raids'],
		feedsInto: ['logs'],
		keywords: ['smart', 'health', 'disks', 'monitoring', 'realloc', 'prevention'],
		links: [{ label: 'View Logs', href: '/features#logs' }],
	},

	// -------------------------------------------------------
	// Layer 1 - Network Storage
	// -------------------------------------------------------
	{
		id: 'nfs',
		name: 'NFS',
		layer: 'layer1',
		icon: Network,
		shortDescription: 'Shared storage over the network for the cluster',
		whatItIs: 'NFS server exporting storage across the 512rede network.',
		whyExists:
			'Let VMs, containers, and workloads access the same storage consistently from any node.',
		howItFits:
			'Bridges Layer 0 (local storage pools) and Layer 2 (compute) by making data reachable over the network.',
		capabilities: [
			'NFS exports across the cluster network (512rede)',
			'Predictable mount paths for workloads',
			'Export permissions/allowlists based on your network layout',
		],
		dependsOn: ['btrfs-raids', 'auto-mounts'],
		feedsInto: ['isos', 'docker-images', 'virtual-machines', 'docker', 'k8-cluster'],
		keywords: ['nfs', 'network storage', 'shared storage', 'cluster'],
		links: [
			{ label: 'View Architecture', href: '/architecture' },
			{ label: 'About 512rede', href: '/512rede' },
		],
	},

	// -------------------------------------------------------
	// Assets
	// -------------------------------------------------------
	{
		id: 'isos',
		name: 'ISOs',
		layer: 'assets',
		icon: Disc,
		shortDescription: 'Centralized ISO image library',
		whatItIs:
			'Repository of ISO images (operating systems, installers, rescue disks).',
		whyExists:
			'Provide ready images for virtual machine creation and installation.',
		howItFits:
			'Feeds VM creation by keeping installation media available via shared storage.',
		capabilities: [
			'Catalog of ISO images',
			'Integrity verification (when you store checksums)',
			'Fast access over NFS for VM installs/boots',
		],
		dependsOn: ['nfs'],
		feedsInto: ['virtual-machines'],
		keywords: ['iso', 'images', 'installation', 'boot'],
		links: [],
	},
	{
		id: 'docker-images',
		name: 'Docker Images',
		layer: 'assets',
		icon: Box,
		shortDescription: 'Central place to store/provide container images',
		whatItIs:
			'Storage/service used to keep container images available to your Docker/Kubernetes workflows.',
		whyExists:
			'Speed up deployments and keep image versions controlled and consistent.',
		howItFits:
			'Feeds Docker and Kubernetes workloads by providing the images they run.',
		capabilities: [
			'Store and serve container images for internal use',
			'Version images with tags according to your workflow',
			'Retention/cleanup policies if you apply them',
		],
		dependsOn: ['nfs'],
		feedsInto: ['docker', 'k8-cluster'],
		keywords: ['docker', 'images', 'containers', 'registry'],
		links: [],
	},

	// -------------------------------------------------------
	// Layer 2 - Compute
	// -------------------------------------------------------
	{
		id: 'virtual-machines',
		name: 'Virtual Machines',
		layer: 'layer2',
		icon: Server,
		shortDescription: 'Virtual machine orchestration (KVM/QEMU) using NFS storage',
		whatItIs:
			'VM management using KVM/QEMU where VM disks live on NFS shares and installation media comes from the ISO library.',
		whyExists:
			'Run isolated full systems while keeping storage paths consistent through shared network storage.',
		howItFits:
			'VM hosts/hypervisors interact with NFS paths — VMs do not directly see BTRFS.',
		capabilities: [
			'VM creation and lifecycle management',
			'VM disks stored on NFS shares',
			'Installation from the ISO library',
		],
		dependsOn: ['nfs', 'isos'],
		feedsInto: ['nginx-proxy', 'logs', 'backups', 'auto-backups'],
		keywords: ['vm', 'kvm', 'qemu', 'virtualization', 'nfs'],
		links: [{ label: 'View Architecture', href: '/architecture' }],
	},
	{
		id: 'docker',
		name: 'Docker',
		layer: 'layer2',
		icon: Container,
		shortDescription: 'Container runtime for lightweight workloads',
		whatItIs:
			'Docker Engine for standalone stacks (Compose), backed by NFS storage.',
		whyExists:
			'Run containerized apps with fast deployment and lightweight isolation without Kubernetes.',
		howItFits:
			'Consumes NFS for persistent data and uses the Docker Images asset to source container images.',
		capabilities: [
			'Deploy Docker Compose stacks',
			'Container networking',
			'Persistent volumes on NFS',
		],
		dependsOn: ['nfs', 'docker-images'],
		feedsInto: ['nginx-proxy', 'logs'],
		keywords: ['docker', 'containers', 'compose', 'runtime'],
		links: [],
	},
	{
		id: 'k8-cluster',
		name: 'K8 Cluster',
		layer: 'layer2',
		icon: Boxes,
		shortDescription: 'Kubernetes orchestration for scalable workloads',
		whatItIs:
			'Provisioning and operation of a Kubernetes cluster (K3s/K8s) on HyperHive nodes with NFS-backed storage.',
		whyExists:
			'Orchestrate containers across nodes when a single-host Docker setup is not enough.',
		howItFits:
			'Consumes NFS for persistent volumes and uses Docker Images for container images.',
		capabilities: [
			'Cluster setup and node participation',
			'Workload scheduling across multiple nodes',
			'NFS-backed persistent storage',
		],
		dependsOn: ['nfs', 'docker-images'],
		feedsInto: ['nginx-proxy', 'logs'],
		keywords: ['kubernetes', 'k8s', 'k3s', 'orchestration'],
		links: [{ label: 'About 512rede', href: '/512rede' }],
	},

	// -------------------------------------------------------
	// Edge - Nginx
	// -------------------------------------------------------
	{
		id: 'nginx-proxy',
		name: 'Nginx Proxy',
		layer: 'edge',
		icon: Globe,
		shortDescription: 'Reverse proxy for exposing services',
		whatItIs:
			'Nginx as a reverse proxy routing HTTP/HTTPS traffic to backends (VMs, Docker, K8).',
		whyExists:
			'Centralize external access and keep routing rules in one place.',
		howItFits:
			'Routes incoming traffic to Layer 2 services and produces access/error data for Logs.',
		capabilities: [
			'Hostname-based routing (and path routing if you use it)',
			'Proxy to internal services (VMs/containers/cluster services)',
		],
		dependsOn: ['virtual-machines', 'docker', 'k8-cluster'],
		feedsInto: ['nginx-certificates', 'nginx-streams', 'nginx-redirection', 'nginx-404', 'logs'],
		keywords: ['nginx', 'proxy', 'reverse proxy', 'routing'],
		links: [],
	},
	{
		id: 'nginx-certificates',
		name: 'Certificates',
		layer: 'edge',
		icon: Lock,
		shortDescription: 'TLS certificate management for HTTPS',
		whatItIs:
			'Certificate handling used by the proxy to serve HTTPS endpoints.',
		whyExists:
			'Provide encrypted HTTPS access for exposed services.',
		howItFits:
			'Works together with Nginx Proxy to terminate TLS and serve HTTPS.',
		capabilities: [
			'Attach/manage certificates per domain/service',
			'Renewal/rotation according to your setup',
		],
		dependsOn: ['nginx-proxy'],
		feedsInto: [],
		keywords: ['ssl', 'tls', 'certificates', 'https'],
		links: [],
	},
	{
		id: 'nginx-streams',
		name: 'Streams',
		layer: 'edge',
		icon: ArrowLeftRight,
		shortDescription: 'TCP/UDP proxy for non-HTTP protocols',
		whatItIs:
			'Nginx stream support for TCP/UDP proxying (non-HTTP services).',
		whyExists:
			'Expose non-web services through the same Edge layer when needed.',
		howItFits:
			'Complements HTTP proxying by handling raw TCP/UDP forwarding when you use it.',
		capabilities: [
			'TCP/UDP forwarding to internal targets',
			'Central place to manage edge exposure for non-HTTP ports',
		],
		dependsOn: ['nginx-proxy'],
		feedsInto: ['logs'],
		keywords: ['tcp', 'udp', 'stream', 'proxy'],
		links: [],
	},
	{
		id: 'nginx-redirection',
		name: 'Redirection',
		layer: 'edge',
		icon: ArrowLeftRight,
		shortDescription: 'Redirect rules and URL normalization',
		whatItIs:
			'HTTP redirects (301/302) and basic URL normalization rules.',
		whyExists:
			'Keep URLs consistent and enforce the expected entry points.',
		howItFits:
			'Normalizes requests before they reach backend services.',
		capabilities: [
			'Permanent and temporary redirects (301/302)',
			'Force HTTPS / canonical host rules if you configured them',
		],
		dependsOn: ['nginx-proxy'],
		feedsInto: [],
		keywords: ['redirect', 'canonical', 'https', 'http'],
		links: [],
	},
	{
		id: 'nginx-404',
		name: '404',
		layer: 'edge',
		icon: AlertCircle,
		shortDescription: 'Custom error handling and 404 pages',
		whatItIs:
			'Custom error pages and logging of unmatched/invalid requests.',
		whyExists:
			'Improve UX on errors and detect noise/scans through log visibility.',
		howItFits:
			'When nothing matches, respond consistently and record the event.',
		capabilities: [
			'Custom error pages per domain/service (if configured)',
			'Logging of 404/invalid requests for analysis',
		],
		dependsOn: ['nginx-proxy'],
		feedsInto: ['logs'],
		keywords: ['404', 'error', 'error pages', 'logging'],
		links: [],
	},

	// -------------------------------------------------------
	// Secure Access
	// -------------------------------------------------------
	{
		id: 'wireguard',
		name: 'WireGuard VPN',
		layer: 'access',
		icon: Shield,
		shortDescription: 'VPN for secure infrastructure access',
		whatItIs:
			'WireGuard VPN to create encrypted tunnels and control who can access internal services.',
		whyExists:
			'Ensure only authorized users can reach internal infrastructure endpoints.',
		howItFits:
			'Provides a secure entry channel for management and access to internal services.',
		capabilities: [
			'Encrypted tunnels with minimal overhead',
			'Peer and public key management',
			'Allowed IPs and routes per peer',
		],
		dependsOn: ['spa'],
		feedsInto: ['nginx-proxy', 'logs'],
		keywords: ['vpn', 'wireguard', 'encryption', 'secure access', 'tunnel'],
		links: [{ label: 'About 512rede', href: '/512rede' }],
	},
	{
		id: 'spa',
		name: 'SPA',
		layer: 'access',
		icon: KeyRound,
		shortDescription: 'Link + password opens a specific port for an IP (or multiple IPs)',
		whatItIs:
			'A HyperHive feature where a link + password triggers a rule that opens a specific port for the requester IP (or a defined set of IPs), typically for a limited time.',
		whyExists:
			'Keep ports closed by default and only grant access when the user proves knowledge of the secret.',
		howItFits:
			'Acts as a gate before reaching sensitive entry points (like VPN/management ports), reducing exposure to scans.',
		capabilities: [
			'Link + password authorization flow',
			'Open a specific port only after successful authentication',
			'Target the requester IP or an allowed set of IPs',
			'Feed access events into Logs for visibility',
		],
		dependsOn: [],
		feedsInto: ['wireguard', 'logs'],
		keywords: ['spa', 'security', 'port', 'access control'],
		links: [],
	},

	// -------------------------------------------------------
	// Operations
	// -------------------------------------------------------
	{
		id: 'backups',
		name: 'Backups',
		layer: 'operations',
		icon: Database,
		shortDescription: 'On-demand VM backup system',
		whatItIs:
			'Tools to create manual backups of virtual machines (VM disks and configs).',
		whyExists:
			'Allow controlled recovery points before critical operations (updates, migrations).',
		howItFits:
			'Protects VM workloads by keeping recovery points available through your backup workflow.',
		capabilities: [
			'Backup VM disks and configuration',
			'Restore workflow based on your stored backup format',
			'Execution logging/status reporting into Logs',
		],
		dependsOn: ['virtual-machines', 'btrfs-raids'],
		feedsInto: ['auto-backups', 'updates', 'logs'],
		keywords: ['backup', 'recovery', 'restore', 'vm'],
		links: [],
	},
	{
		id: 'auto-backups',
		name: 'Auto-Backups',
		layer: 'operations',
		icon: RefreshCw,
		shortDescription: 'Scheduled automatic VM backups',
		whatItIs:
			'Scheduling system (cron/systemd timers) for periodic VM backups without manual work.',
		whyExists:
			'Ensure continuous VM protection with retention/rotation according to your policy.',
		howItFits:
			'Complements Backups: on-demand vs scheduled, keeping recent recovery points available.',
		capabilities: [
			'Schedules (daily/weekly/etc.) based on your configuration',
			'Retention/rotation if you configured it',
			'Job logs and status tracking via Logs',
		],
		dependsOn: ['backups', 'virtual-machines', 'btrfs-raids'],
		feedsInto: ['logs'],
		keywords: ['automatic backups', 'schedule', 'retention', 'rotation', 'vm'],
		links: [],
	},
	{
		id: 'updates',
		name: 'Updates',
		layer: 'operations',
		icon: RefreshCw,
		shortDescription: 'Controlled system update management',
		whatItIs:
			'Patching and updates for OS/services with a controlled process.',
		whyExists:
			'Keep security and stability without breaking workloads.',
		howItFits:
			'Operational practice: backup → update → verify → log.',
		capabilities: [
			'Controlled update process',
			'Pre-update backups as a safety net',
			'Log the outcome for auditing/troubleshooting',
		],
		dependsOn: ['backups'],
		feedsInto: ['logs'],
		keywords: ['updates', 'patching', 'maintenance', 'security'],
		links: [],
	},
	{
		id: 'logs',
		name: 'Logs',
		layer: 'operations',
		icon: FileText,
		shortDescription: 'Centralized log aggregation and analysis',
		whatItIs:
			'Central logging that collects and aggregates events across the stack.',
		whyExists:
			'Understand what happened, where, and why with operational context.',
		howItFits:
			'Collects events from storage, edge, access, compute, and operations to support troubleshooting and auditing.',
		capabilities: [
			'Aggregate logs across services/nodes',
			'Search and filter by component',
			'Keep operational history for troubleshooting',
		],
		dependsOn: [
			'smartdisk',
			'nginx-proxy',
			'nginx-404',
			'nginx-streams',
			'wireguard',
			'spa',
			'virtual-machines',
			'docker',
			'k8-cluster',
			'backups',
			'auto-backups',
			'updates',
		],
		feedsInto: [],
		keywords: ['logs', 'logging', 'audit', 'troubleshooting'],
		links: [],
	},
];


// Helper function to get feature by ID
export function getFeatureById(id: string): Feature | undefined {
	return features.find((f) => f.id === id);
}

// Helper function to get features by layer
export function getFeaturesByLayer(layer: FeatureLayer): Feature[] {
	return features.filter((f) => f.layer === layer);
}

// Helper function to get all layers
export function getAllLayers(): FeatureLayer[] {
	return Object.keys(layerInfo) as FeatureLayer[];
}
