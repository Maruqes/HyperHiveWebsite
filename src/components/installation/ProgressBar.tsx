"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
	id: string;
	label: string;
	status: "completed" | "active" | "pending";
};

type ProgressBarProps = {
	steps: Step[];
	className?: string;
};

export function ProgressBar({ steps, className }: ProgressBarProps) {
	return (
		<div className={cn("w-full", className)}>
			<div className="flex items-center justify-between">
				{steps.map((step, index) => (
					<div key={step.id} className="flex items-center flex-1">
						<div className="flex flex-col items-center relative">
							<div
								className={cn(
									"w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
									step.status === "completed" && "bg-foreground border-foreground",
									step.status === "active" && "border-accent text-foreground",
									step.status === "pending" && "bg-background border-border/50"
								)}
							>
								{step.status === "completed" ? (
									<Check className="w-5 h-5 text-background" />
								) : (
									<span
										className={cn(
											"text-sm font-semibold",
											step.status === "active" && "text-foreground",
											step.status === "pending" && "text-muted-foreground"
										)}
									>
										{index + 1}
									</span>
								)}
							</div>
							<span
								className={cn(
									"mt-2 text-xs font-medium whitespace-nowrap",
									step.status === "active" && "text-foreground",
									step.status === "completed" && "text-foreground",
									step.status === "pending" && "text-muted-foreground"
								)}
							>
								{step.label}
							</span>
						</div>
						{index < steps.length - 1 && (
							<div className="flex-1 h-0.5 mx-2 -mt-8">
								<div
									className={cn(
										"h-full transition-all",
										step.status === "completed" ? "bg-foreground/60" : "bg-border/30"
									)}
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
