import type { Metadata } from "next";
import { Providers } from "./providers";

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
  title: "Olympico Action Sports",
  description:
    "Welcome to Olympico Action Sport, your premier destination for all things rollerblading and running! As a vibrant community organization and school, we promote active lifestyles through engaging programs, expert coaching, and thrilling events. Join us to elevate your skills, connect with fellow enthusiasts, and embrace the excitement of action sports!",
  openGraph: {
    title: "Olympico Action Sports",
    description:
      "Discover and join exciting action sports events with Olympico",
    siteName: "Olympico Action Sports",
    type: "website",
    url: "https://www.olympicoactionsports.com", // Replace with your actual URL
    images: [
      {
        url: "/We.Are.Diffrent.jpg",
        width: 1200, // Replace with the actual width of your image
        height: 630, // Replace with the actual height of your image
        alt: "We Are Different - Olympico Action Sports",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
