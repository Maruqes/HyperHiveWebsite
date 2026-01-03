import Link from "next/link";

import { InstallStepCard } from "@/components/installation/InstallStepCard";
import type { InstallStep } from "@/components/installation/InstallStepCard";

const externalSteps: InstallStep[] = [
  {
    id: "external-step-01",
    title: "Step 1: Plan the LAN install",
    summary: "All nodes connect to the home router. No separate fabric.",
    actions: [
      "Reserve static IPs on the home router",
      "Define hostnames and DNS entries",
      "Confirm gateway and subnet",
    ],
    commands: ["ip addr show", "ping -c 3 router.local", "resolvectl status"],
    files: ["/etc/hosts", "/etc/resolv.conf"],
    env: ["LAN_SUBNET=192.168.1.0/24", "LAN_GW=192.168.1.1"],
    notes: "The master does not run DHCP in this mode.",
  },
  {
    id: "external-step-02",
    title: "Step 2: Node network config",
    summary: "Configure node NICs and confirm LAN reachability.",
    actions: ["Set static IPs or DHCP reservations", "Confirm DNS resolution"],
    commands: ["ip link", "ping -c 3 master.local", "nslookup master.local"],
    paths: ["/etc/netplan", "/etc/network"],
    checks: ["All nodes reach each other on the LAN"],
  },
  {
    id: "external-step-03",
    title: "Step 3: Install base OS",
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
    id: "external-step-04",
    title: "Step 4: Create BTRFS volumes",
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
    id: "external-step-05",
    title: "Step 5: Auto-mounts and disk health",
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
    id: "external-step-06",
    title: "Step 6: Export NFS on the LAN",
    summary: "Expose shared volumes to node IPs on the LAN.",
    actions: ["Define NFS exports", "Restrict to LAN subnet", "Reload exports"],
    commands: ["exportfs -ra", "showmount -e localhost", "systemctl restart nfs-server"],
    files: ["/etc/exports"],
    env: ["NFS_ALLOWED=192.168.1.0/24"],
    checks: ["showmount -e master"],
  },
  {
    id: "external-step-07",
    title: "Step 7: Prepare assets and .env files",
    summary: "Download ISOs, create templates, and configure stacks.",
    actions: ["Download ISO images", "Create templates", "Fill .env files"],
    commands: ["curl -O https://example.local/isos/debian.iso", "virsh list --all"],
    paths: ["/srv/hyperhive/isos", "/srv/hyperhive/stacks/app"],
    files: ["/srv/hyperhive/stacks/app/.env", "/etc/hyperhive/templates/base.xml"],
    env: ["APP_ENV=production", "API_URL=https://api.local"],
    moves: ["Copy assets from /srv/hyperhive/assets to /srv/hyperhive/stacks/app"],
  },
  {
    id: "external-step-08",
    title: "Step 8: Deploy compute",
    summary: "Bring up VMs and Docker services on shared storage.",
    actions: ["Create VM templates", "Start VM services", "Deploy Docker stacks"],
    commands: ["virt-install --name base-vm --dry-run", "docker compose up -d"],
    paths: ["/srv/hyperhive/vms", "/srv/hyperhive/stacks"],
    checks: ["docker compose ps", "virsh list --all"],
  },
  {
    id: "external-step-09",
    title: "Step 9: Configure Nginx edge",
    summary: "Set routing rules and attach TLS certificates.",
    actions: ["Create Nginx routes", "Attach TLS certs", "Reload Nginx"],
    commands: ["nginx -t", "systemctl reload nginx", "certbot certificates"],
    files: ["/etc/nginx/sites-available/hyperhive.conf", "/etc/letsencrypt/live"],
    env: ["EDGE_DOMAIN=service.local"],
    checks: ["curl -I https://service.local"],
  },
  {
    id: "external-step-10",
    title: "Step 10: Secure access",
    summary: "Use WireGuard + SPA to gate entry even on the LAN.",
    actions: ["Generate keys", "Create SPA rule", "Test access from a client"],
    commands: ["wg genkey | tee /etc/wireguard/privatekey", "wg-quick up wg0", "spa-client --send"],
    paths: ["/etc/wireguard", "/etc/hyperhive/spa"],
    files: ["/etc/wireguard/wg0.conf", "/etc/hyperhive/spa/config.yaml"],
    env: ["WG_PORT=51820", "SPA_WINDOW=30s"],
    checks: ["wg show"],
  },
  {
    id: "external-step-11",
    title: "Step 11: Backups and logs",
    summary: "Configure VM backups and central logs.",
    actions: ["Create snapshot scripts", "Schedule backups", "Enable log forwarding"],
    commands: ["btrfs subvolume snapshot", "systemctl list-timers", "journalctl -u nginx"],
    files: ["/etc/hyperhive/backup.yaml", "/etc/rsyslog.d/60-hyperhive.conf"],
    paths: ["/srv/hyperhive/backups", "/srv/hyperhive/logs"],
    checks: ["ls -la /srv/hyperhive/backups", "grep -i hyperhive /var/log/syslog"],
  },
];

export default function InstallationExternalPage() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="flex flex-col gap-4">
          <Link
            href="/installation"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Back to choices
          </Link>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            External LAN installation
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            All servers connect to the home router via ethernet. No separate fabric or DHCP on the master.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/installation/internal"
              className="rounded-full border border-border/70 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
            >
              Switch to internal
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-border/70 bg-[rgba(8,12,22,0.85)] p-6 shadow-[0_24px_60px_rgba(5,8,16,0.45)]">
          <div className="grid gap-4">
            {externalSteps.map((step) => (
              <InstallStepCard key={step.id} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
