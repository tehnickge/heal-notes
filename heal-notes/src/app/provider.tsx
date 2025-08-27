"use client";
import { HeaderMegaMenu } from "@/components/Header/Header";
import {
  createTheme,
  CSSVariablesResolver,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  /** 🎨 Цвета */
  colors: {
    primary: [
      "#6c63ff",
      "#6c63ff",
      "#6c63ff",
      "#6c63ff",
      "#6c63ff",
      "#6c63ff",
      "#6c63ff",
      "#6c63ff",
      "#6c63ff",
      "#6c63ff",
    ],
    secondary: [
      "#a0aec0",
      "#a0aec0",
      "#a0aec0",
      "#a0aec0",
      "#a0aec0",
      "#a0aec0",
      "#a0aec0",
      "#a0aec0",
      "#a0aec0",
      "#a0aec0",
    ],
    success: [
      "#81e6d9",
      "#81e6d9",
      "#81e6d9",
      "#81e6d9",
      "#81e6d9",
      "#81e6d9",
      "#81e6d9",
      "#81e6d9",
      "#81e6d9",
      "#81e6d9",
    ],
    danger: [
      "#f56565",
      "#f56565",
      "#f56565",
      "#f56565",
      "#f56565",
      "#f56565",
      "#f56565",
      "#f56565",
      "#f56565",
      "#f56565",
    ],

    pastelPink: Array(10).fill("#fed7e2") as [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ],
    pastelLavender: Array(10).fill("#e9d8fd") as [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ],
    pastelPeach: Array(10).fill("#ffe5d9") as [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ],
    pastelMint: Array(10).fill("#d1fae5") as [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ],
    pastelBlue: Array(10).fill("#bee3f8") as [
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string,
      string
    ],
  },

  /** 🌈 Основные настройки */
  primaryColor: "primary",

  /** 📝 Типографика */
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Inter, sans-serif",
  },

  /** 📐 Отступы */
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },

  /** 🔲 Радиусы */
  radius: {
    xs: "0.125rem", // 2px
    sm: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    xxl: "1rem", // 16px
  },

  /** 📱 Брейкпоинты */
  breakpoints: {
    xs: "30em", // 480px
    sm: "48em", // 768px
    md: "62em", // 992px
    lg: "75em", // 1200px
    xl: "90em", // 1440px
  },
});

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-color-body": "#f7fafc",
    "--mantine-color-text": "#2d3748",
    "--mantine-color-text-secondary": "#718096",
    "--mantine-color-border": "#cbd5e0",
    "--mantine-shadow-sm": "0 1px 2px rgba(0,0,0,0.05)",
  },
  light: {},
  dark: {
    "--mantine-color-body": "#121212",
    "--mantine-color-text": "#f7fafc",
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
      <MantineProvider
        defaultColorScheme="light"
        theme={theme}
        withCssVariables
        cssVariablesResolver={resolver}
      >
        <>
          <HeaderMegaMenu />
          {children}
        </>
      </MantineProvider>
    </QueryClientProvider>
  );
}
