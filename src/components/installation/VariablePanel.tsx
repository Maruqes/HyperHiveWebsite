"use client";

import { useState } from "react";
import { Edit2, Save } from "lucide-react";
import { cn } from "@/lib/utils";

type Variable = {
	key: string;
	value: string | string[];
	description: string;
	editable: boolean;
	isArray?: boolean;
};

type VariablePanelProps = {
	variables: Variable[];
	className?: string;
};

export function VariablePanel({ variables: initialVariables, className }: VariablePanelProps) {
	const [variables, setVariables] = useState(initialVariables);
	const [editingKey, setEditingKey] = useState<string | null>(null);
	const [editValue, setEditValue] = useState("");

	const startEdit = (variable: Variable) => {
		setEditingKey(variable.key);
		setEditValue(Array.isArray(variable.value) ? variable.value.join(", ") : variable.value);
	};

	const saveEdit = () => {
		if (editingKey) {
			const variable = variables.find((v) => v.key === editingKey);
			const newValue = variable?.isArray
				? editValue.split(",").map((s) => s.trim()).filter(Boolean)
				: editValue;
			setVariables(
				variables.map((v) =>
					v.key === editingKey ? { ...v, value: newValue } : v
				)
			);
			setEditingKey(null);
		}
	};

	return (
		<div className={cn("glass-panel rounded-xl border border-border/50 p-4 sticky top-4", className)}>
			<h3 className="text-sm font-semibold text-foreground mb-4">Variables</h3>
			<div className="space-y-3">
				{variables.map((variable) => (
					<div
						key={variable.key}
						className="p-3 rounded-lg bg-[color:var(--surface-input)] border border-border/30"
					>
						<div className="flex items-start justify-between mb-1">
							<code className="text-xs font-mono text-accent">{variable.key}</code>
							{variable.editable && editingKey !== variable.key && (
								<button
									onClick={() => startEdit(variable)}
									className="p-1 hover:bg-accent/20 rounded transition-colors"
								>
									<Edit2 className="w-3 h-3 text-muted-foreground" />
								</button>
							)}
							{editingKey === variable.key && (
								<button
									onClick={saveEdit}
									className="p-1 hover:bg-green-500/20 rounded transition-colors"
								>
									<Save className="w-3 h-3 text-green-300" />
								</button>
							)}
						</div>
						{editingKey === variable.key ? (
							<div>
								<input
									type="text"
									value={editValue}
									onChange={(e) => setEditValue(e.target.value)}
									className="w-full px-2 py-1 text-xs bg-background border border-border/50 rounded text-foreground focus:outline-none focus:border-accent"
								/>
								{variable.isArray && (
									<p className="text-xs text-muted-foreground/50 mt-1 italic">
										Separate IPs with commas
									</p>
								)}
							</div>
						) : (
							<div className="text-xs text-muted-foreground font-mono break-all">
								{Array.isArray(variable.value) ? (
									<div className="space-y-1">
										{variable.value.map((v, i) => (
											<div key={i} className="flex items-center gap-1.5">
												<span className="text-accent">•</span>
												<span>{v}</span>
											</div>
										))}
									</div>
								) : (
									variable.value
								)}
							</div>
						)}
						<p className="text-xs text-muted-foreground/70 mt-1">
							{variable.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
