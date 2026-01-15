import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type IconBadgeProps = HTMLAttributes<HTMLDivElement>;

export function IconBadge({ className, ...props }: IconBadgeProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-[color:var(--surface-elevated-strong)] text-accent",
        className
      )}
      {...props}
    />
  );
}
