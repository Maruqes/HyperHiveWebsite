import Link from "next/link";

import { InstallStepCard } from "@/components/installation/InstallStepCard";
import type { InstallStep } from "@/components/installation/InstallStepCard";

const internalSteps: InstallStep[] = [
  {
    id: "internal-step-01",
    title: "Step 1: Define the 512rede subnet",
    summary: "Pick the subnet, DHCP range, and gateway for the internal fabric.",
    actions: [
      "Choose the 512rede subnet",
      "Reserve static IPs for nodes",
      "Set gateway and DNS plan",
    ],
    commands: ["ipcalc 192.168.76.0/24", "printf '%s' 192.168.76.1"],
    files: ["/etc/hyperhive/network.yaml"],
    env: ["CLUSTER_SUBNET=192.168.76.0/24", "CLUSTER_GW=192.168.76.1"],
    notes: "Keep the fabric on a dedicated NIC.",
  },
  {
    id: "internal-step-02",
    title: "Step 2: Wire the fabric",
    summary: "Connect all nodes to the cluster switch and verify link speed.",
    actions: [
      "Label switch ports per node",
      "Confirm NIC mapping on each node",
      "Set MTU if required",
    ],
    commands: ["ip link", "ethtool eth1", "ping -c 3 192.168.76.1"],
    paths: ["/etc/netplan", "/etc/network"],
    checks: ["Links report expected speed", "Nodes reach master on 512rede"],
    notes: "Keep fabric traffic off the home LAN.",
  },
  {
    id: "internal-step-03",
    title: "Step 3: Master DHCP and routing",
    summary: "Enable DHCP, IP forwarding, and routing on the master.",
    actions: [
      "Enable DHCP service",
      "Enable IP forwarding",
      "Add NAT rules if needed",
    ],
    commands: [
      "systemctl enable isc-dhcp-server",
      "sysctl -w net.ipv4.ip_forward=1",
      "iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE",
    ],
    files: ["/etc/dhcp/dhcpd.conf", "/etc/sysctl.conf"],
    checks: ["Nodes receive DHCP leases", "Nodes reach LAN through master"],
    notes: "Use reservations for node IPs.",
  },
  {
    id: "internal-step-04",
    title: "Step 4: Node fabric config",
    summary: "Configure node routes and pin services to 512rede.",
    actions: [
      "Set static IPs or DHCP reservations",
      "Pin NFS mounts to the 512rede IP",
      "Verify isolation from the LAN",
    ],
    commands: [
      "ip route",
      "mount -t nfs master:/srv/hyperhive /srv/hyperhive",
      "ss -tulpn | grep nfs",
    ],
    paths: ["/etc/fstab", "/srv/hyperhive"],
    moves: ["Move cluster-only configs into /etc/hyperhive/network"],
    checks: ["NFS uses 512rede IPs", "LAN does not see fabric services"],
  },
  {
    id: "internal-step-05",
    title: "Step 5: Install base OS",
    summary: "Install the OS and baseline packages on every node.",
    actions: ["Install OS image", "Apply baseline packages", "Sync time and locale"],
    commands: [
      "apt update",
      "apt install btrfs-progs nfs-kernel-server",
      "timedatectl set-ntp true",
    ],
    files: ["/etc/hostname", "/etc/hosts", "/etc/timezone"],
    checks: ["hostnamectl", "timedatectl"],
  },
  {
    id: "internal-step-06",
    title: "Step 6: Create BTRFS volumes",
    summary: "Create pools and subvolumes with consistent labels.",
    actions: ["Create the pool", "Create subvolumes", "Label volumes"],
    commands: [
      "mkfs.btrfs -L hivepool /dev/sdX /dev/sdY",
      "mount /dev/sdX /mnt/hive",
      "btrfs subvolume create /mnt/hive/vms",
    ],
    paths: ["/mnt/hive", "/srv/hyperhive"],
    checks: ["btrfs filesystem show"],
  },
  {
    id: "internal-step-07",
    title: "Step 7: Auto-mounts and disk health",
    summary: "Make mounts consistent and record disk health baselines.",
    actions: [
      "Add fstab entries",
      "Create mount points",
      "Enable SMART monitoring",
    ],
    commands: ["mount -a", "systemctl enable smartd", "smartctl -a /dev/sdX"],
    files: ["/etc/fstab", "/etc/smartd.conf"],
    paths: ["/srv/hyperhive/vms", "/var/log/smartdisk"],
    checks: ["findmnt /srv/hyperhive/vms"],
  },
  {
    id: "internal-step-08",
    title: "Step 8: Export NFS on 512rede",
    summary: "Expose shared volumes only to fabric IPs.",
    actions: ["Define NFS exports", "Restrict to 512rede subnet", "Reload exports"],
    commands: ["exportfs -ra", "showmount -e localhost", "systemctl restart nfs-server"],
    files: ["/etc/exports"],
    env: ["NFS_ALLOWED=192.168.76.0/24"],
    checks: ["showmount -e master"],
  },
  {
    id: "internal-step-09",
    title: "Step 9: Prepare assets and .env files",
    summary: "Download ISOs, create templates, and configure stacks.",
    actions: ["Download ISO images", "Create templates", "Fill .env files"],
    commands: ["curl -O https://example.local/isos/debian.iso", "virsh list --all"],
    paths: ["/srv/hyperhive/isos", "/srv/hyperhive/stacks/app"],
    files: ["/srv/hyperhive/stacks/app/.env", "/etc/hyperhive/templates/base.xml"],
    env: ["APP_ENV=production", "API_URL=https://api.local"],
    moves: ["Copy assets from /srv/hyperhive/assets to /srv/hyperhive/stacks/app"],
  },
  {
    id: "internal-step-10",
    title: "Step 10: Deploy compute",
    summary: "Bring up VMs and Docker services on shared storage.",
    actions: ["Create VM templates", "Start VM services", "Deploy Docker stacks"],
    commands: ["virt-install --name base-vm --dry-run", "docker compose up -d"],
    paths: ["/srv/hyperhive/vms", "/srv/hyperhive/stacks"],
    checks: ["docker compose ps", "virsh list --all"],
  },
  {
    id: "internal-step-11",
    title: "Step 11: Configure edge and access",
    summary: "Set Nginx routing and gated access with WireGuard + SPA.",
    actions: ["Create Nginx routes", "Attach TLS certs", "Enable WireGuard + SPA"],
    commands: ["nginx -t", "systemctl reload nginx", "wg-quick up wg0"],
    files: ["/etc/nginx/sites-available/hyperhive.conf", "/etc/wireguard/wg0.conf"],
    env: ["EDGE_DOMAIN=service.local", "WG_PORT=51820"],
    checks: ["curl -I https://service.local", "wg show"],
  },
  {
    id: "internal-step-12",
    title: "Step 12: Backups and logs",
    summary: "Configure VM backups and central logs.",
    actions: ["Create snapshot scripts", "Schedule backups", "Enable log forwarding"],
    commands: ["btrfs subvolume snapshot", "systemctl list-timers", "journalctl -u nginx"],
    files: ["/etc/hyperhive/backup.yaml", "/etc/rsyslog.d/60-hyperhive.conf"],
    paths: ["/srv/hyperhive/backups", "/srv/hyperhive/logs"],
    checks: ["ls -la /srv/hyperhive/backups", "grep -i hyperhive /var/log/syslog"],
  },
];

export default function InstallationInternalPage() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-4">
          <Link href="/installation" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Back to choices
          </Link>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Internal 512rede installation
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Dedicated fabric separated from the home LAN. The master routes and serves DHCP for 512rede.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/512rede"
              className="rounded-full border border-border/70 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
            >
              View 512rede diagram
            </Link>
            <Link
              href="/installation/external"
              className="rounded-full border border-border/70 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
            >
              Switch to external
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-[rgba(8,12,22,0.85)] p-6 shadow-[0_24px_60px_rgba(5,8,16,0.45)]">
          <div className="grid gap-4">
            {internalSteps.map((step) => (
              <InstallStepCard key={step.id} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
