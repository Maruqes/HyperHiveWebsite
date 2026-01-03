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

export const layerInfo: Record<
	FeatureLayer,
	{ label: string; description: string; color: string }
> = {
	layer0: {
		label: 'Layer 0 - Storage Foundation',
		description: 'Where storage becomes reliable',
		color: '#803030',
	},
	layer1: {
		label: 'Layer 1 - Network Storage',
		description: 'How storage reaches the cluster',
		color: '#389088',
	},
	layer2: {
		label: 'Layer 2 - Compute',
		description: 'Where workloads run',
		color: '#4A90E2',
	},
	edge: {
		label: 'Edge - Routing',
		description: 'How services are exposed',
		color: '#9B59B6',
	},
	access: {
		label: 'Secure Access',
		description: 'How access is protected',
		color: '#E67E22',
	},
	operations: {
		label: 'Operations',
		description: 'How the stack is maintained and recovered',
		color: '#95A5A6',
	},
	assets: {
		label: 'Assets',
		description: 'Resources that power compute',
		color: '#F39C12',
	},
};

export const features: Feature[] = [
	// Layer 0 - Storage Foundation
	{
		id: 'btrfs-raids',
		name: 'BTRFS / RAIDs',
		layer: 'layer0',
		icon: HardDrive,
		shortDescription: 'Redundant filesystem foundation with snapshots',
		whatItIs:
			'BTRFS configured with RAID profiles, subvolumes, and snapshots to keep storage consistent',
		whyExists:
			'Protect against disk failures and silent corruption while keeping fast recovery points',
		howItFits:
			'Foundation of all storage. Everything above assumes storage is healthy and consistent',
		capabilities: [
			'Copy-on-write snapshots and subvolumes',
			'RAID profiles (single/raid0/raid1/raid5/raid6)',
			'Scrub, balance, and replace workflows for maintenance',
		],
		dependsOn: [],
		feedsInto: ['nfs', 'backups', 'virtual-machines', 'docker', 'k8-cluster'],
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
			'Automation that ensures all BTRFS volumes and storage devices are mounted at boot',
		whyExists:
			'Remove manual steps and keep storage ready for NFS and compute',
		howItFits:
			'Lets NFS and compute assume storage is available',
		capabilities: [
			'Automatic mounts at system boot',
			'Detects newly added volumes',
			'Retries on transient failures',
		],
		dependsOn: ['btrfs-raids', 'virtual-machines'],
		feedsInto: ['nfs', 'virtual-machines', 'docker', 'k8-cluster'],
		keywords: ['mount', 'automation', 'boot', 'volumes'],
		links: [{ label: 'View Architecture', href: '/architecture' }],
	},
	{
		id: 'smartdisk',
		name: 'SmartDisk',
		layer: 'layer0',
		icon: AlertCircle,
		shortDescription: 'Disk health monitoring and tests',
		whatItIs:
			'S.M.A.R.T. monitoring with scheduled health checks for each disk',
		whyExists:
			'Spot degradation early and plan replacements before data is at risk',
		howItFits:
			'Feeds Logs and informs maintenance decisions for Layer 0 reliability',
		capabilities: [
			'S.M.A.R.T. metrics and temperature tracking',
			'Short and long tests with history',
			'Alerts when disks degrade or fail',
		],
		dependsOn: ['btrfs-raids'],
		feedsInto: ['logs'],
		keywords: ['smart', 'health', 'disks', 'monitoring', 'prevention'],
		links: [{ label: 'View Logs', href: '/features#logs' }],
	},

	// Layer 1 - Network Storage
	{
		id: 'nfs',
		name: 'NFS',
		layer: 'layer1',
		icon: Network,
		shortDescription: 'Shared storage over the network for the cluster',
		whatItIs:
			'NFS server exporting BTRFS storage across the 512rede fabric',
		whyExists:
			'Let VMs, containers, and workloads access the same storage consistently',
		howItFits:
			'Bridges Layer 0 (physical storage) and Layer 2 (compute), making data available on any node',
		capabilities: [
			'NFSv4 exports with IP allowlists on 512rede',
			'Predictable mount paths for VMs and containers',
			'Centralized export definitions and permissions',
		],
		dependsOn: ['btrfs-raids', 'auto-mounts'],
		feedsInto: ['virtual-machines', 'docker', 'k8-cluster'],
		keywords: ['nfs', 'network storage', 'shared storage', 'cluster'],
		links: [
			{ label: 'View Architecture', href: '/architecture' },
			{ label: 'About 512rede', href: '/512rede' },
		],
	},

	// Assets
	{
		id: 'isos',
		name: 'ISOs',
		layer: 'assets',
		icon: Disc,
		shortDescription: 'Centralized ISO image library',
		whatItIs:
			'Repository of ISO images (operating systems, installers, rescue disks)',
		whyExists:
			'Provide ready images for virtual machine creation and installation',
		howItFits:
			'Feeds VM creation, ensuring base systems are always available',
		capabilities: [
			'Catalog of ISOs across multiple operating systems',
			'Integrity verification with checksums',
			'Fast access over NFS for direct boot',
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
		shortDescription: 'Local registry for container images',
		whatItIs:
			'Private Docker registry with caching of public images and storage for custom builds',
		whyExists:
			'Speed up deployments, ensure offline availability, and version internal images',
		howItFits:
			'Feeds Docker and Kubernetes workloads, reducing reliance on external registries',
		capabilities: [
			'Automatic caching of public images',
			'Storage for internal builds',
			'Versioned tags with retention policies',
		],
		dependsOn: ['nfs'],
		feedsInto: ['docker', 'k8-cluster'],
		keywords: ['docker', 'registry', 'containers', 'images', 'cache'],
		links: [],
	},

	// Layer 2 - Compute
	{
		id: 'virtual-machines',
		name: 'Virtual Machines',
		layer: 'layer2',
		icon: Server,
		shortDescription: 'Virtual machine orchestration (KVM/QEMU)',
		whatItIs:
			'VM management using KVM/QEMU with NFS storage and ISO boot',
		whyExists:
			'Run full isolated systems with consistent storage paths and predictable recovery',
		howItFits:
			'Consumes shared storage (NFS) and ISOs, exposes services via Nginx, and logs events',
		capabilities: [
			'VM creation and lifecycle management with templates',
			'Shared storage paths for planned moves between hosts',
			'Fast snapshots and cloning via BTRFS',
		],
		dependsOn: ['nfs', 'isos'],
		feedsInto: ['nginx-proxy', 'logs'],
		keywords: ['vm', 'kvm', 'qemu', 'virtualization'],
		links: [{ label: 'View Architecture', href: '/architecture' }],
	},
	{
		id: 'docker',
		name: 'Docker',
		layer: 'layer2',
		icon: Container,
		shortDescription: 'Container runtime for lightweight workloads',
		whatItIs:
			'Docker Engine for standalone stacks (Compose), backed by NFS storage',
		whyExists:
			'Run containerized apps with fast deployment and lightweight isolation without Kubernetes',
		howItFits:
			'Consumes NFS and Docker Images, exposes services via Nginx, and integrates with Logs',
		capabilities: [
			'Deploy Docker Compose stacks',
			'Service and container networking',
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
			'Automated provisioning of a Kubernetes cluster (K3s/K8s) on HyperHive nodes with NFS storage classes',
		whyExists:
			'Orchestrate containers at scale when Docker Compose is not enough',
		howItFits:
			'Consumes NFS and Docker Images, exposes services via Nginx Ingress, and integrates centralized Logs',
		capabilities: [
			'Cluster bootstrap with baseline manifests',
			'Workload scheduling across multiple nodes',
			'NFS-backed persistent volumes',
		],
		dependsOn: ['nfs', 'docker-images'],
		feedsInto: ['nginx-proxy', 'logs'],
		keywords: ['kubernetes', 'k8s', 'k3s', 'orchestration'],
		links: [{ label: 'About 512rede', href: '/512rede' }],
	},

	// Edge - Nginx
	{
		id: 'nginx-proxy',
		name: 'Nginx Proxy',
		layer: 'edge',
		icon: Globe,
		shortDescription: 'Reverse proxy and load balancing for services',
		whatItIs:
			'Nginx as a reverse proxy routing HTTP/HTTPS traffic to backends (VMs, Docker, K8)',
		whyExists:
			'Centralize external access, apply routing rules, and distribute load',
		howItFits:
			'Receives external requests (via WireGuard/SPA), forwards to Layer 2 services, and applies Certificates',
		capabilities: [
			'Hostname and path-based routing',
			'Load balancing across multiple backends',
			'WebSocket and HTTP/2 support',
		],
		dependsOn: ['virtual-machines', 'docker', 'k8-cluster'],
		feedsInto: ['logs'],
		keywords: ['nginx', 'proxy', 'reverse proxy', 'load balancer', 'routing'],
		links: [],
	},
	{
		id: 'nginx-certificates',
		name: 'Certificates',
		layer: 'edge',
		icon: Lock,
		shortDescription: 'Automated SSL/TLS certificate management',
		whatItIs:
			'Automatic renewal of Let\'s Encrypt certificates and TLS management',
		whyExists:
			'Ensure secure HTTPS communications without manual work',
		howItFits:
			'Integrates with the proxy for TLS termination and protects traffic between clients and services',
		capabilities: [
			'Automatic renewal via the ACME protocol',
			'Wildcard certificate support',
			'TLS 1.3 and modern cipher suites',
		],
		dependsOn: ['nginx-proxy'],
		feedsInto: [],
		keywords: ['ssl', 'tls', 'certificates', 'letsencrypt', 'https', 'acme'],
		links: [],
	},
	{
		id: 'nginx-streams',
		name: 'Streams',
		layer: 'edge',
		icon: ArrowLeftRight,
		shortDescription: 'TCP/UDP proxy for non-HTTP protocols',
		whatItIs:
			'Nginx stream module for TCP/UDP proxy (databases, SSH, custom protocols)',
		whyExists:
			'Extend proxy capabilities beyond HTTP to any protocol',
		howItFits:
			'Exposes non-web services (PostgreSQL, Redis, etc.) through the Edge with consistent controls',
		capabilities: [
			'TCP/UDP routing for non-HTTP services',
			'Upstream mapping for internal services',
			'Optional TLS pass-through or termination',
		],
		dependsOn: ['nginx-proxy'],
		feedsInto: [],
		keywords: ['tcp', 'udp', 'stream', 'proxy', 'database'],
		links: [],
	},
	{
		id: 'nginx-redirection',
		name: 'Redirection',
		layer: 'edge',
		icon: ArrowLeftRight,
		shortDescription: 'Redirection rules and rewrites',
		whatItIs:
			'HTTP redirects (301/302) and URL rewrites',
		whyExists:
			'Manage URL changes, force HTTPS, and apply canonical URLs',
		howItFits:
			'Normalization layer before routing to backends, ensuring URL consistency',
		capabilities: [
			'Permanent and temporary redirects',
			'Regex-based URL rewriting',
			'Force HTTPS and canonical domains',
		],
		dependsOn: ['nginx-proxy'],
		feedsInto: [],
		keywords: ['redirect', 'rewrite', 'url', 'canonical', 'http'],
		links: [],
	},
	{
		id: 'nginx-404',
		name: '404',
		layer: 'edge',
		icon: AlertCircle,
		shortDescription: 'Custom error handling and 404 pages',
		whatItIs:
			'Custom error pages and logging of invalid access attempts',
		whyExists:
			'Improve UX on errors, detect scans, and provide consistent feedback',
		howItFits:
			'Last line of the Edge: when nothing matches, respond with useful info and log suspicious activity',
		capabilities: [
			'Custom error pages per domain',
			'404 logging for analysis and audit',
			'Consistent error responses across services',
		],
		dependsOn: ['nginx-proxy'],
		feedsInto: ['logs'],
		keywords: ['404', 'error', 'error pages', 'logging', 'security'],
		links: [],
	},

	// Secure Access
	{
		id: 'wireguard',
		name: 'WireGuard VPN',
		layer: 'access',
		icon: Shield,
		shortDescription: 'Modern VPN for secure infrastructure access',
		whatItIs:
			'WireGuard VPN server to create encrypted tunnels and control who can access the 512rede network',
		whyExists:
			'Ensure only authorized users can access internal services',
		howItFits:
			'First barrier: without an active VPN, there is no access to Edge or services, reducing attack surface',
		capabilities: [
			'Encrypted tunnels with minimal overhead',
			'Peer and public key management',
			'Allowed IPs and routes per peer',
		],
		dependsOn: [],
		feedsInto: ['nginx-proxy', 'logs'],
		keywords: ['vpn', 'wireguard', 'encryption', 'secure access', 'tunnel'],
		links: [{ label: 'About 512rede', href: '/512rede' }],
	},
	{
		id: 'spa',
		name: 'SPA',
		layer: 'access',
		icon: KeyRound,
		shortDescription: 'Single Packet Authorization for modern port knocking',
		whatItIs:
			'Single-packet authorization: ports stay closed until an authenticated packet opens them for a specific IP',
		whyExists:
			'Make services invisible to scans and attacks, opening access only after identity proof',
		howItFits:
			'Extra layer before WireGuard: even the VPN is reachable only after SPA, further reducing exposure',
		capabilities: [
			'Password-protected SPA packets triggered via a link',
			'Opens a port only for the requesting IP (and other authorized SPA users)',
			'Protection against port scanning with audit logs',
		],
		dependsOn: [],
		feedsInto: ['wireguard', 'logs'],
		keywords: ['spa', 'port knocking', 'security', 'firewall', 'access control'],
		links: [],
	},

	// Operations
	{
		id: 'backups',
		name: 'Backups',
		layer: 'operations',
		icon: Database,
		shortDescription: 'On-demand VM backup system',
		whatItIs:
			'Tools to create manual backups of virtual machines (VM disks and configs)',
		whyExists:
			'Allow controlled recovery points for VMs before critical operations (updates, migrations)',
		howItFits:
			'Protects VM workloads by keeping recovery points available',
		capabilities: [
			'Full and incremental VM backups',
			'Export VM images for restore or migration',
			'Snapshot VM volumes before changes',
		],
		dependsOn: ['btrfs-raids'],
		feedsInto: ['logs'],
		keywords: ['backup', 'snapshot', 'recovery', 'restore', 'vm'],
		links: [],
	},
	{
		id: 'auto-backups',
		name: 'Auto-Backups',
		layer: 'operations',
		icon: RefreshCw,
		shortDescription: 'Scheduled automatic VM backups',
		whatItIs:
			'Scheduling system (cron/systemd timers) for periodic VM backups without manual work',
		whyExists:
			'Ensure continuous VM protection with retention and rotation',
		howItFits:
			'Complements Backups: on-demand vs scheduled, keeping recent VM history available',
		capabilities: [
			'Flexible scheduling (daily, weekly)',
			'Configurable retention policy',
			'Job logs and status tracking',
		],
		dependsOn: ['btrfs-raids', 'virtual-machines', 'backups'],
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
			'Patching and updates for OS, kernel, applications, and services with a controlled cadence',
		whyExists:
			'Keep security and stability without breaking workloads, with backups and checks before changes',
		howItFits:
			'Controlled maintenance of the stack: plans updates, validates health, and uses VM Backups as a safety net',
		capabilities: [
			'Planned maintenance windows and update checklists',
			'Pre-update health checks and backup reminders',
			'Tracking of applied versions and changes',
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
			'Central logging system that collects and aggregates events across the stack',
		whyExists:
			'Understand what happened, where, and why with audit-ready context',
		howItFits:
			'Collects events from every layer (SmartDisk, Nginx, SPA, VMs, K8, Backups) and closes the operational loop',
		capabilities: [
			'Aggregate logs across the infrastructure',
			'Search and filter by service or node',
			'Highlight critical failures and security events',
		],
		dependsOn: [
			'smartdisk',
			'nginx-proxy',
			'nginx-404',
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
		keywords: ['logs', 'logging', 'observability', 'audit', 'troubleshooting'],
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
