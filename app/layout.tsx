import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Provider from "@/components/Provider";

const poppins = Outfit({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "PokéRepo",
  description:
    "Search and filter Pokémon by name or type. Discover detailed information about your favorite Pokémon.",
  keywords: [
    "Pokémon",
    "Pokedex",
    "Pokémon database",
    "Pokémon search",
    "Pokémon types",
  ],
  authors: [{ name: "Toushief Ansari" }],
  creator: "Toushief Ansari",
  publisher: "Toushief Ansari txusif@gmail.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
