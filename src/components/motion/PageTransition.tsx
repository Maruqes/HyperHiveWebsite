"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const transition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      className={cn("min-h-full", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
