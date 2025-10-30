import { Fira_Code, Inter, Poppins } from "next/font/google";

export const inter = Inter({
  weight: "variable",
  subsets: ["latin"],
});

export const poppins = Poppins({
  weight: ["100", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const firacode = Fira_Code({
  weight: "variable",
});
