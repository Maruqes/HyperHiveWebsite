"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
	code: string;
	language?: string;
	title?: string;
	className?: string;
};

export function CodeBlock({ code, title, className }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div
			className={cn(
				"glass-panel relative overflow-hidden rounded-lg border border-border/50",
				className
			)}
		>
			{title && (
				<div className="border-b border-border/50 bg-[color:var(--surface-overlay-soft)] px-4 py-2 text-xs font-medium text-muted-foreground">
					{title}
				</div>
			)}
			<div className="relative">
				<pre className="p-4 overflow-x-auto text-sm">
					<code className="text-foreground font-mono">{code}</code>
				</pre>
				<button
					onClick={handleCopy}
					className="absolute right-2 top-2 rounded-md border border-border/50 bg-[color:var(--surface-input-strong)] p-2 transition-colors hover:bg-[color:var(--surface-input-hover)]"
					aria-label="Copy code"
				>
					{copied ? (
						<Check className="h-4 w-4 text-green-300" />
					) : (
						<Copy className="h-4 w-4 text-muted-foreground" />
					)}
				</button>
			</div>
		</div>
	);
}
