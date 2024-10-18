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
  description: "PokéRepo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {/* <Container> */}
        <Provider>{children}</Provider>
        {/* </Container> */}
      </body>
    </html>
  );
}
