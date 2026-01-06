"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Section = {
	id: string;
	label: string;
	number: number;
};

type ScrollProgressBarProps = {
	sections?: Section[];
	className?: string;
};

export function ScrollProgressBar({ sections, className }: ScrollProgressBarProps) {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [activeSection, setActiveSection] = useState<string | null>(null);

	useEffect(() => {
		const calculateScrollProgress = () => {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop = window.scrollY;

			// Calculate the maximum scrollable height
			const scrollableHeight = documentHeight - windowHeight;

			// Calculate the progress percentage
			const progress = scrollableHeight > 0
				? (scrollTop / scrollableHeight) * 100
				: 0;

			setScrollProgress(Math.min(100, Math.max(0, progress)));

			// Find active section if sections are provided
			if (sections && sections.length > 0) {
				let currentSection: string | null = null;

				// Check each section to see if it's in view
				for (let i = sections.length - 1; i >= 0; i--) {
					const section = sections[i];
					const element = document.getElementById(section.id);

					if (element) {
						const rect = element.getBoundingClientRect();
						// Section is active if its top is above the middle of the viewport
						if (rect.top <= windowHeight / 2) {
							currentSection = section.id;
							break;
						}
					}
				}

				setActiveSection(currentSection);
			}
		};

		// Calculate on mount
		calculateScrollProgress();

		// Add scroll event listener
		window.addEventListener("scroll", calculateScrollProgress, { passive: true });
		window.addEventListener("resize", calculateScrollProgress, { passive: true });

		return () => {
			window.removeEventListener("scroll", calculateScrollProgress);
			window.removeEventListener("resize", calculateScrollProgress);
		};
	}, [sections]);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	// If sections are provided, render section navigator
	if (sections && sections.length > 0) {
		return (
			<div
				className={cn(
					"fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block",
					className
				)}
			>
				<div className="flex flex-col items-end gap-3">
					{sections.map((section, index) => {
						const isActive = activeSection === section.id;
						const isPassed = sections.findIndex(s => s.id === activeSection) > index;

						return (
							<button
								key={section.id}
								onClick={() => scrollToSection(section.id)}
								className="group flex items-center gap-3 transition-all"
							>
								{/* Label - appears on hover */}
								<span
									className={cn(
										"text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap",
										isActive && "text-accent",
										isPassed && "text-foreground/70",
										!isActive && !isPassed && "text-muted-foreground"
									)}
								>
									{section.label}
								</span>

								{/* Dot indicator */}
								<div className="flex items-center justify-center">
									<div
										className={cn(
											"rounded-full transition-all duration-300",
											isActive && "w-3 h-3 bg-accent shadow-[0_0_12px_rgba(var(--accent-rgb),0.8)]",
											isPassed && "w-2 h-2 bg-foreground/70",
											!isActive && !isPassed && "w-2 h-2 bg-border/50 group-hover:bg-accent/50"
										)}
									/>
								</div>
							</button>
						);
					})}

					{/* Progress Percentage */}
					<div className="mt-3 text-xs font-semibold text-muted-foreground tabular-nums">
						{Math.round(scrollProgress)}%
					</div>
				</div>
			</div>
		);
	}

	// Default progress bar without sections
	return (
		<div
			className={cn(
				"fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block",
				className
			)}
		>
			<div className="flex flex-col items-center gap-3">
				{/* Progress Bar Container */}
				<div className="relative h-64 w-1 rounded-full bg-border/30">
					{/* Progress Fill */}
					<div
						className="absolute bottom-0 left-0 w-full rounded-full bg-gradient-to-t from-accent to-accent/60 transition-all duration-150 ease-out"
						style={{ height: `${scrollProgress}%` }}
					/>

					{/* Glowing indicator at the top of progress */}
					<div
						className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(var(--accent-rgb),0.8)] transition-all duration-150 ease-out"
						style={{
							bottom: `${scrollProgress}%`,
							opacity: scrollProgress > 0 ? 1 : 0
						}}
					/>
				</div>

				{/* Progress Percentage */}
				<div className="text-xs font-semibold text-muted-foreground tabular-nums">
					{Math.round(scrollProgress)}%
				</div>
			</div>
		</div>
	);
}
