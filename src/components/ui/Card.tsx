import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl border border-border/80 p-6 shadow-[0_20px_40px_var(--shadow-medium)]",
        className
      )}
      {...props}
    />
  );
}
