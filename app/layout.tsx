import type { Metadata } from "next";
import "./globals.css";
import { stix } from "./fonts";
import LayoutClient from "./components/LayoutClient";

export const metadata: Metadata = {
  title: "Heritage Horizon",
  description:
    "Crafting timeless developments rooted in integrity, legacy, and thoughtful design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={stix.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
