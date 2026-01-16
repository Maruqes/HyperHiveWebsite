"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const THEME_KEY = "hyperhive-theme";

type Theme = "dark" | "light";

const isTheme = (value: string | null): value is Theme =>
  value === "dark" || value === "light";

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
};

type ThemeToggleProps = {
  variant?: "floating" | "inline";
  className?: string;
};

export function ThemeToggle({ variant = "floating", className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const next = isTheme(stored) ? stored : "dark";
    setTheme(next);
    applyTheme(next);
  }, []);

  const handleToggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
      return next;
    });
  };

  const isDark = theme === "dark";
  const isFloating = variant === "floating";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={!isDark}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/80 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition",
        isFloating
          ? "fixed bottom-4 right-4 z-40 hidden bg-[color:var(--surface-elevated-strong)] px-4 py-2 shadow-[0_12px_30px_var(--shadow-soft)] backdrop-blur hover:border-accent/70 hover:shadow-[0_16px_36px_var(--shadow-medium)] sm:bottom-6 sm:right-6 lg:inline-flex"
          : "w-full justify-between bg-[color:var(--surface-elevated)] px-5 py-3 shadow-[0_12px_30px_var(--shadow-soft)] hover:border-accent/70",
        className
      )}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--surface-accent-subtle)] text-accent">
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </span>
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
