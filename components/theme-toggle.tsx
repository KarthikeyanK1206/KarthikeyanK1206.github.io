"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="icon-button"
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true" className={`toggle-icon${isDark ? " toggle-icon-dark" : ""}`}>
        <Icon size={18} strokeWidth={1.8} />
      </span>
    </button>
  );
}
