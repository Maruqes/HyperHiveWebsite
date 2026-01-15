"use client";

import { useState } from "react";

import { DiagramSVG } from "@/components/architecture/DiagramSVG";
import { ARCHITECTURE_STEPS } from "@/components/architecture/architecture-data";
import { Stepper } from "@/components/architecture/Stepper";

export function ArchitectureScroller() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <Stepper
        steps={ARCHITECTURE_STEPS}
        activeStep={activeStep}
        onActiveChange={setActiveStep}
      />
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="glass-panel rounded-2xl border border-border/80 p-6 shadow-[0_18px_38px_var(--shadow-soft)]">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Layer stack
            </p>
            <DiagramSVG activeStep={activeStep} />
          </div>
        </div>
      </div>
    </div>
  );
}
