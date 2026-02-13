import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./components/LayoutClient";

export const metadata: Metadata = {
  title: "Continental Group | Driven By Values",
  description:
    "Crafting timeless developments rooted in integrity, legacy, and thoughtful design.",
};

import Preloader from "./components/Preloader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
