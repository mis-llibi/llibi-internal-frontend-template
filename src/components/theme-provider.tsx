"use client";

import * as React from "react";

export type AccentTheme =
  | "default"
  | "theme-slate"
  | "theme-violet"
  | "theme-blue"
  | "theme-rose"
  | "theme-orange";

export type FontFamily =
  | "font-geist"
  | "font-outfit"
  | "font-lora"
  | "font-playfair"
  | "font-mono"
  | "font-roboto";

export type FontSize = "size-sm" | "size-md" | "size-lg";

export type Radius =
  | "radius-none"
  | "radius-sm"
  | "radius-md"
  | "radius-lg"
  | "radius-xl";

export type ThemeColorConfig = {
  name: string;
  primary: string;
  primaryLight: string;
  secondary: string;
  gradientFrom: string;
};

export const THEME_PALETTES: Record<AccentTheme, ThemeColorConfig> = {
  default: {
    name: "Corporate Blue",
    primary: "#2563eb",
    primaryLight: "rgba(37, 99, 235, 0.15)",
    secondary: "#38bdf8",
    gradientFrom: "rgba(37, 99, 235, 0.35)",
  },
  "theme-blue": {
    name: "Corporate Blue",
    primary: "#2563eb",
    primaryLight: "rgba(37, 99, 235, 0.15)",
    secondary: "#38bdf8",
    gradientFrom: "rgba(37, 99, 235, 0.35)",
  },
  "theme-slate": {
    name: "Slate",
    primary: "#475569",
    primaryLight: "rgba(71, 85, 105, 0.15)",
    secondary: "#94a3b8",
    gradientFrom: "rgba(71, 85, 105, 0.35)",
  },
  "theme-violet": {
    name: "Violet",
    primary: "#7c3aed",
    primaryLight: "rgba(124, 58, 237, 0.15)",
    secondary: "#a78bfa",
    gradientFrom: "rgba(124, 58, 237, 0.35)",
  },
  "theme-rose": {
    name: "Rose",
    primary: "#e11d48",
    primaryLight: "rgba(225, 29, 72, 0.15)",
    secondary: "#fb7185",
    gradientFrom: "rgba(225, 29, 72, 0.35)",
  },
  "theme-orange": {
    name: "Orange",
    primary: "#ea580c",
    primaryLight: "rgba(234, 88, 12, 0.15)",
    secondary: "#fb923c",
    gradientFrom: "rgba(234, 88, 12, 0.35)",
  },
};

type ThemeContextType = {
  theme: AccentTheme;
  fontFamily: FontFamily;
  fontSize: FontSize;
  radius: Radius;
  themeColors: ThemeColorConfig;
  setTheme: (theme: AccentTheme) => void;
  setFontFamily: (font: FontFamily) => void;
  setFontSize: (size: FontSize) => void;
  setRadius: (radius: Radius) => void;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<AccentTheme>("theme-blue");
  const [fontFamily, setFontFamilyState] = React.useState<FontFamily>("font-geist");
  const [fontSize, setFontSizeState] = React.useState<FontSize>("size-lg");
  const [radius, setRadiusState] = React.useState<Radius>("radius-sm");

  // Load theme settings on mount
  React.useEffect(() => {
    try {
      const savedTheme = (localStorage.getItem("app-theme") || "theme-blue") as AccentTheme;
      const savedFont = (localStorage.getItem("app-font-family") || "font-geist") as FontFamily;
      const savedSize = (localStorage.getItem("app-font-size") || "size-lg") as FontSize;
      const savedRadius = (localStorage.getItem("app-radius") || "radius-sm") as Radius;

      // Browser storage is read after SSR to avoid hydration mismatches.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(savedTheme);
      setFontFamilyState(savedFont);
      setFontSizeState(savedSize);
      setRadiusState(savedRadius);

      const root = document.documentElement;

      // Update classes
      root.classList.remove(
        "theme-slate",
        "theme-violet",
        "theme-blue",
        "theme-rose",
        "theme-orange",
      );
      if (savedTheme !== "default") {
        root.classList.add(savedTheme);
      } else {
        root.classList.add("theme-blue");
      }

      root.classList.remove(
        "font-geist",
        "font-outfit",
        "font-lora",
        "font-playfair",
        "font-mono",
        "font-roboto",
      );
      root.classList.add(savedFont);

      root.classList.remove("size-sm", "size-md", "size-lg");
      root.classList.add(savedSize);

      root.classList.remove(
        "radius-none",
        "radius-sm",
        "radius-md",
        "radius-lg",
        "radius-xl",
      );
      root.classList.add(savedRadius);
    } catch (e) {
      console.error("Failed to load theme settings", e);
    }
  }, []);

  const setTheme = React.useCallback((newTheme: AccentTheme) => {
    try {
      setThemeState(newTheme);
      localStorage.setItem("app-theme", newTheme);
      const root = document.documentElement;
      root.classList.remove(
        "theme-slate",
        "theme-violet",
        "theme-blue",
        "theme-rose",
        "theme-orange",
      );
      if (newTheme !== "default") {
        root.classList.add(newTheme);
      } else {
        root.classList.add("theme-blue");
      }
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  }, []);

  const setFontFamily = React.useCallback((newFont: FontFamily) => {
    try {
      setFontFamilyState(newFont);
      localStorage.setItem("app-font-family", newFont);
      const root = document.documentElement;
      root.classList.remove(
        "font-geist",
        "font-outfit",
        "font-lora",
        "font-playfair",
        "font-mono",
        "font-roboto",
      );
      root.classList.add(newFont);
    } catch (e) {
      console.error("Failed to save font family", e);
    }
  }, []);

  const setFontSize = React.useCallback((newSize: FontSize) => {
    try {
      setFontSizeState(newSize);
      localStorage.setItem("app-font-size", newSize);
      const root = document.documentElement;
      root.classList.remove("size-sm", "size-md", "size-lg");
      root.classList.add(newSize);
    } catch (e) {
      console.error("Failed to save font size", e);
    }
  }, []);

  const setRadius = React.useCallback((newRadius: Radius) => {
    try {
      setRadiusState(newRadius);
      localStorage.setItem("app-radius", newRadius);
      const root = document.documentElement;
      root.classList.remove(
        "radius-none",
        "radius-sm",
        "radius-md",
        "radius-lg",
        "radius-xl",
      );
      root.classList.add(newRadius);
    } catch (e) {
      console.error("Failed to save border radius", e);
    }
  }, []);

  const themeColors = THEME_PALETTES[theme] || THEME_PALETTES["theme-blue"];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        fontFamily,
        fontSize,
        radius,
        themeColors,
        setTheme,
        setFontFamily,
        setFontSize,
        setRadius,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
