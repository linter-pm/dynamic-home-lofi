import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Serve — Dynamic Home (Lo-fi)",
  description:
    "Your personalized governance dashboard. Week-by-week context for elected officials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gp-bg-subtle text-gp-text min-h-screen">
        {children}
      </body>
    </html>
  );
}
