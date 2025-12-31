import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "2016 Land Rover LR4 HSE For Sale | Private Sale",
  description: "2016 Land Rover LR4 HSE - Supercharged V6, 4WD, One Owner, Meticulously Maintained. Legendary capability meets refined luxury.",
  keywords: ["Land Rover", "LR4", "2016", "HSE", "For Sale", "SUV", "4WD", "Discovery"],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "2016 Land Rover LR4 HSE For Sale",
    description: "Legendary capability meets refined luxury. One owner, meticulously maintained.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
