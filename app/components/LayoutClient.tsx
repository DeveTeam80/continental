"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MenuOverlay from "./MenuOverlay";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      {children}
      <Footer />
    </>
  );
}
