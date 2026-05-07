import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SwiftClip",
    template: "%s — SwiftClip",
  },
  description:
    "Production-ready Remotion video templates built with React & TypeScript. Free, open-source, copy-and-paste.",
  keywords: [
    "Remotion",
    "video templates",
    "React video",
    "TypeScript",
    "animation",
    "open source",
  ],
  authors: [{ name: "SwiftClip" }],
  openGraph: {
    title: "SwiftClip — React video templates",
    description:
      "Production-ready Remotion video templates built with React & TypeScript. Free, open-source, copy-and-paste.",
    url: "https://swiftclip.dev",
    siteName: "SwiftClip",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SwiftClip — React video templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SwiftClip — React video templates",
    description:
      "Production-ready Remotion video templates built with React & TypeScript. Free, open-source, copy-and-paste.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
