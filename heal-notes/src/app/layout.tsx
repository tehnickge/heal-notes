import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import RootProvider from "./provider";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
