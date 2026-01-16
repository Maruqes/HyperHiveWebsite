"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: SectionProps) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <motion.section
      id={id}
      className={cn("py-16 sm:py-24", className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:gap-12 sm:px-6">
        {(eyebrow || title || description) && (
          <div className={cn("flex max-w-2xl flex-col gap-4", alignment)}>
            {eyebrow ? (
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="text-base text-muted-foreground sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
