import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UTYCC Project Show 2026",
  description: "University of Technology, Yatanarpon Cyber City Project Exhibition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}