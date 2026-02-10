// app/fonts.ts
import { STIX_Two_Text } from "next/font/google";

export const stix = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
