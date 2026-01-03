"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import type { ArchitectureStep } from "@/components/architecture/architecture-data";

type StepperProps = {
  steps: ArchitectureStep[];
  activeStep: number;
  onActiveChange: (index: number) => void;
};

export function Stepper({ steps, activeStep, onActiveChange }: StepperProps) {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const indexMap = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const mostVisible = visible.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];
        const index = indexMap.get(mostVisible.target);
        if (index !== undefined) {
          onActiveChange(index);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-20% 0px -45% 0px",
      }
    );

    stepRefs.current.forEach((element, index) => {
      if (!element) return;
      indexMap.set(element, index);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [onActiveChange, steps.length]);

  return (
    <div className="flex flex-col gap-10">
      {steps.map((step, index) => {
        const isActive = index === activeStep;

        return (
          <div
            key={step.id}
            ref={(element) => {
              stepRefs.current[index] = element;
            }}
            className="min-h-[45vh] scroll-mt-28"
          >
            <div
              className={cn(
                "border-l-2 pl-5 transition-all duration-300 hover:border-accent/70 hover:text-foreground",
                isActive
                  ? "border-accent text-foreground"
                  : "border-border/60 text-muted-foreground"
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {step.step}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.subtitle}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
