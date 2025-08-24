import { HeaderMegaMenu } from "@/components/Header/Header";
import "./globals.css";
import RootProvider from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderMegaMenu />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
