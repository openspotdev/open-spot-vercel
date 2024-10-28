import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "OS Action Sports",
  description:
    "Welcome to OS Action Sport, your premier destination for all things rollerblading and running! As a vibrant community organization and school, we promote active lifestyles through engaging programs, expert coaching, and thrilling events. Join us to elevate your skills, connect with fellow enthusiasts, and embrace the excitement of action sports!",
  openGraph: {
    title: "OS Action Sports",
    description: "Discover and join exciting action sports events with OS",
    siteName: "OS Action Sports",
    type: "website",
    url: "https://www.osactionsports.com", // Replace with your actual URL
    images: [
      {
        url: "/We.Are.Diffrent.jpg",
        width: 600, // Replace with the actual width of your image
        height: 310, // Replace with the actual height of your image
        alt: "We Are Different - OS Action Sports",
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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
