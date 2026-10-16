import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus Web — Feature-Sliced Design",
  description: "Enterprise Frontend Architecture with Next.js 15 & FSD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="antialiased bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
