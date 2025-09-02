"use client";
import { HeaderMegaMenu } from "@/components/Header/Header";
import {
  createTheme,
  CSSVariablesResolver,
  MantineProvider,
} from "@mantine/core";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  primaryColor: "primary",

  colors: {
    primary: [
      "#f2f0ff",
      "#dcd6ff",
      "#c0b6ff",
      "#a395ff",
      "#8674ff",
      "#6c63ff", // основной
      "#524ccc",
      "#3b3799",
      "#252466",
      "#121133",
    ],
    secondary: [
      "#f8f9fa",
      "#edf2f7",
      "#e2e8f0",
      "#cbd5e0",
      "#a0aec0",
      "#718096",
      "#4a5568",
      "#2d3748",
      "#1a202c",
      "#171923",
    ],
    success: [
      "#e6fffa",
      "#b2f5ea",
      "#81e6d9",
      "#4fd1c5",
      "#38b2ac",
      "#319795",
      "#2c7a7b",
      "#285e61",
      "#234e52",
      "#1d4044",
    ],
    danger: [
      "#fff5f5",
      "#fed7d7",
      "#feb2b2",
      "#fc8181",
      "#f56565",
      "#e53e3e",
      "#c53030",
      "#9b2c2c",
      "#822727",
      "#63171b",
    ],
    pastelPink: [
      "#fff5f7",
      "#fed7e2", // базовый
      "#fbb6ce",
      "#f687b3",
      "#ed64a6",
      "#d53f8c",
      "#b83280",
      "#97266d",
      "#702459",
      "#521b41",
    ],
    pastelLavender: [
      "#faf5ff",
      "#e9d8fd", // базовый
      "#d6bcfa",
      "#b794f4",
      "#9f7aea",
      "#805ad5",
      "#6b46c1",
      "#553c9a",
      "#44337a",
      "#322659",
    ],
    pastelPeach: [
      "#fffaf0",
      "#ffe5d9", // базовый
      "#fed7c3",
      "#fbbf9d",
      "#f6ad55",
      "#ed8936",
      "#dd6b20",
      "#c05621",
      "#9c4221",
      "#7b341e",
    ],
    pastelMint: [
      "#f0fff4",
      "#d1fae5", // базовый
      "#a7f3d0",
      "#6ee7b7",
      "#34d399",
      "#10b981",
      "#059669",
      "#047857",
      "#065f46",
      "#064e3b",
    ],
    pastelBlue: [
      "#ebf8ff",
      "#bee3f8", // базовый
      "#90cdf4",
      "#63b3ed",
      "#4299e1",
      "#3182ce",
      "#2b6cb0",
      "#2c5282",
      "#2a4365",
      "#1A365D",
    ],
  },

  radius: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    xxl: "1rem",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  breakpoints: {
    xs: "480px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
    xl: "1440px",
  },

  // 👇 сюда кладём то, чего нет в стандартном API Mantine
  other: {
    text: {
      primary: "#2d3748",
      secondary: "#718096",
    },
    background: {
      base: "#f7fafc",
      alt: "#e2e8f0",
      dark: "#afb4bbff",
    },
    shadows: {
      light: "rgba(0, 0, 0, 0.05)",
    },
    borders: {
      light: "#cbd5e0",
    },
  },
});
// Создаем экземпляр QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Количество попыток при ошибке
    },
  },
});

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="light" theme={theme}>
        <HeaderMegaMenu />
        {children}
      </MantineProvider>
    </QueryClientProvider>
  );
}
