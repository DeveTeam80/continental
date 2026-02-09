import type { Metadata } from "next";
import "./globals.css";
// import "./joy.css"; // Assuming joy.css is needed globally or imported elsewhere

export const metadata: Metadata = {
  title: "Heritage Horizon",
  description: "Crafting timeless developments rooted in integrity, legacy, and thoughtful design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Fonts and styles are now handled in globals.css */}
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
