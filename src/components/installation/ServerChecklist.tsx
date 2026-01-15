"use client";

import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Server = {
	id: string;
	name: string;
	completed: boolean;
};

type ServerChecklistProps = {
	title: string;
	description?: string;
	className?: string;
};

export function ServerChecklist({ title, description, className }: ServerChecklistProps) {
	const [servers, setServers] = useState<Server[]>([
		{ id: "1", name: "Server A", completed: false },
		{ id: "2", name: "Server B", completed: false },
		{ id: "3", name: "Server C", completed: false },
	]);

	const addServer = () => {
		const newId = String(servers.length + 1);
		const letter = String.fromCharCode(65 + servers.length); // A, B, C, D...
		setServers([...servers, { id: newId, name: `Server ${letter}`, completed: false }]);
	};

	const removeServer = (id: string) => {
		if (servers.length > 1) {
			setServers(servers.filter((s) => s.id !== id));
		}
	};

	const toggleServer = (id: string) => {
		setServers(
			servers.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
		);
	};

	const completedCount = servers.filter((s) => s.completed).length;

	return (
		<div className={cn("glass-panel rounded-xl border border-border/50 p-6", className)}>
			<div className="flex items-start justify-between mb-4">
				<div>
					<h3 className="text-lg font-semibold text-foreground">{title}</h3>
					{description && (
						<p className="text-sm text-muted-foreground mt-1">{description}</p>
					)}
				</div>
				<div className="text-sm font-medium text-muted-foreground">
					{completedCount}/{servers.length}
				</div>
			</div>

			<div className="space-y-2">
				{servers.map((server) => (
					<div
						key={server.id}
						className="flex items-center gap-3 p-3 rounded-lg bg-[color:var(--surface-input)] border border-border/30"
					>
						<button
							onClick={() => toggleServer(server.id)}
							className={cn(
								"w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
								server.completed
									? "bg-green-500 border-green-500"
									: "border-border/50 hover:border-accent"
							)}
						>
							{server.completed && <Check className="w-3 h-3 text-white" />}
						</button>
						<span
							className={cn(
								"flex-1 text-sm",
								server.completed ? "text-muted-foreground line-through" : "text-foreground"
							)}
						>
							{server.name}
						</span>
						{servers.length > 1 && (
							<button
								onClick={() => removeServer(server.id)}
								className="p-1 rounded hover:bg-red-500/20 transition-colors"
							>
								<X className="w-4 h-4 text-red-400" />
							</button>
						)}
					</div>
				))}
			</div>

			<button
				onClick={addServer}
				className="mt-4 w-full py-2 px-4 rounded-lg border border-dashed border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors flex items-center justify-center gap-2"
			>
				<Plus className="w-4 h-4" />
				Add Server
			</button>
		</div>
	);
}
