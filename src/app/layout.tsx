import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechLocation AI — Digital Market Explorer",
  description: "Explore citizens' digital behavior and technology readiness across locations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
