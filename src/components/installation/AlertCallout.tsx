import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type AlertType = "info" | "warning" | "danger" | "success" | "tip";

type AlertCalloutProps = {
	type: AlertType;
	title?: string;
	children: ReactNode;
	className?: string;
};

const alertLabels: Record<AlertType, string> = {
	info: "Info",
	warning: "Warning",
	danger: "Important",
	success: "Success",
	tip: "Tip",
};

export function AlertCallout({ type, title, children, className }: AlertCalloutProps) {
	return (
		<div
			className={cn(
				"glass-panel rounded-lg border border-border/50 p-4",
				className
			)}
		>
			<div className="space-y-2">
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
					{alertLabels[type]}
				</p>
				{title && (
					<h4 className="text-sm font-semibold text-foreground">{title}</h4>
				)}
				<div className="text-sm text-muted-foreground leading-relaxed">
					{children}
				</div>
			</div>
		</div>
	);
}
