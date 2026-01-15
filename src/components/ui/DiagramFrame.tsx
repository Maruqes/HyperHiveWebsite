import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type DiagramFrameProps = {
  title?: string;
  description?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function DiagramFrame({
  title,
  description,
  className,
  children,
}: DiagramFrameProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl border border-border/80 p-6 shadow-[0_24px_48px_var(--shadow-strong)]",
        className
      )}
    >
      {(title || description) && (
        <div className="flex flex-col gap-2">
          {title ? (
            <p className="font-display text-lg font-semibold text-foreground">
              {title}
            </p>
          ) : null}
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      )}
      <div className="mt-6 grid gap-4">{children}</div>
    </div>
  );
}
