import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CalloutProps = {
  title?: string;
  description?: ReactNode;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

export function Callout({
  title,
  description,
  icon,
  className,
  children,
}: CalloutProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl border border-border/80 p-6 shadow-[0_18px_38px_var(--shadow-soft)]",
        className
      )}
    >
      {children ? (
        children
      ) : (
        <div className="flex items-start gap-4">
          {icon ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-[color:var(--surface-elevated-stronger)] text-accent">
              {icon}
            </div>
          ) : null}
          <div className="flex flex-col gap-2">
            {title ? (
              <p className="text-base font-semibold text-foreground">{title}</p>
            ) : null}
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
