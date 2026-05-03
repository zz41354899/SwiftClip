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
    url: "https://github.com/zz41354899/SwiftClip",
    siteName: "SwiftClip",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "SwiftClip — React video templates",
    description:
      "Production-ready Remotion video templates built with React & TypeScript. Free, open-source, copy-and-paste.",
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
