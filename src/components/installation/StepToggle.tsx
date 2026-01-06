"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StepToggleProps = {
	stepId: string;
	label?: string;
	className?: string;
};

export function StepToggle({ label = "I completed this step", className }: StepToggleProps) {
	const [completed, setCompleted] = useState(false);

	return (
		<button
			onClick={() => setCompleted(!completed)}
			className={cn(
				"inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
				completed
					? "bg-green-500/20 border-green-500/50 text-green-300"
					: "bg-background border-border/50 text-muted-foreground hover:border-accent/50",
				className
			)}
		>
			<div
				className={cn(
					"w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
					completed ? "bg-green-500 border-green-500" : "border-border/50"
				)}
			>
				{completed && <Check className="w-3 h-3 text-white" />}
			</div>
			<span className="text-sm font-medium">{label}</span>
		</button>
	);
}
