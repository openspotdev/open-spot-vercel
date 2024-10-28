import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "OS Action Sports",
  description:
    "Welcome to OS Action Sport, your premier destination for all things rollerblading and running! As a vibrant community organization and school, we promote active lifestyles through engaging programs, expert coaching, and thrilling events.",
  openGraph: {
    title: "OS Action Sports",
    description: "Discover and join exciting action sports events with OS",
    siteName: "OS Action Sports",
    type: "website",
    url: "https://www.osactionsports.com",
    images: [
      {
        url: "https://www.osactionsports.com/We.Are.Diffrent.jpg",
        width: 600,
        height: 310,
        alt: "We Are Different - OS Action Sports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OS Action Sports",
    description: "Discover and join exciting action sports events with OS",
    images: ["https://www.osactionsports.com/We.Are.Diffrent.jpg"],
  },
  icons: {
    icon: [
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
