"use client";
import { HeaderMegaMenu } from "@/components/Header/Header";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider defaultColorScheme="light">
      {
        <>
          <HeaderMegaMenu />
          {children}
        </>
      }
    </MantineProvider>
  );
}
