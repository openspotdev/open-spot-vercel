import type { Metadata } from "next";
import { Providers } from "./providers";
import { LanguageProvider } from "./languageContext";

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Open Spot",
  description:
    "Welcome to Open Spot, your premier destination for all things rollerblading and running! As a vibrant community organization and school, we promote active lifestyles through engaging programs, expert coaching, and thrilling events. Join us to elevate your skills, connect with fellow enthusiasts, and embrace the excitement of action sports!",
  openGraph: {
    title: "Open Spot",
    description:
      "Discover and join exciting action sports events with Open Spot",
    siteName: "Open Spot",
    type: "website",
    url: "https://www.openspot.com", // Replace with your actual URL
    images: [
      {
        url: "/favicon_io/android-chrome-512x512.png",
        width: 1200, // Replace with the actual width of your image
        height: 630, // Replace with the actual height of your image
        alt: "We Are Different - Open Spot",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon_io/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_io/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_io/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LanguageProvider>{children}</LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
