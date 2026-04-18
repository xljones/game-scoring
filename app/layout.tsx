import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game Scoring",
  description: "Game scoring app",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Game Scoring",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="safe-area-inset">{children}</body>
    </html>
  );
}
