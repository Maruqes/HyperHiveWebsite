export type ArchitectureStep = {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: "storage" | "nfs" | "compute" | "edge" | "access" | "ops";
};

export const ARCHITECTURE_STEPS: ArchitectureStep[] = [
  {
    id: "layer0-storage",
    step: "Step 1",
    title: "Layer0",
    subtitle: "BTRFS / RAID",
    description: "Storage foundation with redundancy and predictable mounts.",
    icon: "storage",
  },
  {
    id: "layer1-nfs",
    step: "Step 2",
    title: "Layer1",
    subtitle: "NFS",
    description: "Exposes storage to the cluster with stable paths.",
    icon: "nfs",
  },
  {
    id: "layer2-compute",
    step: "Step 3",
    title: "Layer2",
    subtitle: "VMs / Docker",
    description: "Compute runs on shared storage for mobility and consistency.",
    icon: "compute",
  },
  {
    id: "edge-routing",
    step: "Step 4",
    title: "Layer3",
    subtitle: "Nginx",
    description: "Edge routing exposes services with controlled entry points.",
    icon: "edge",
  },
];
