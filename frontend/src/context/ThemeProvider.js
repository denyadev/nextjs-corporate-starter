"use client";
import { useEffect } from "react";

const setThemeColors = (theme) => {
  const primary = theme?.primary || "#007bff";
  const secondary = theme?.secondary || "#6c757d";
  const radius = theme?.radius || "0.25rem";

  document.documentElement.style.setProperty("--theme-primary", primary);
  document.documentElement.style.setProperty("--theme-accent", secondary);
  document.documentElement.style.setProperty("--radius", radius);
};

export default function ThemeProvider({ children, theme }) {
  useEffect(() => {
    setThemeColors(theme);
  }, [theme]);

  return <>{children}</>;
}
