"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<Theme>("dark");

  useEffect(() => {
    // Permanently maintain dark theme across the application
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  }, []);

  const setTheme = (_newTheme: Theme) => {
    // Dark mode is permanently fixed
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  };

  const toggleTheme = () => {
    // Dark mode is permanently fixed
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
