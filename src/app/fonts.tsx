import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const gillSans = localFont({
  src: [
    {
      path: "./fonts/gill-sans-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/gill-sans-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/gill-sans-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gill-sans",
});
