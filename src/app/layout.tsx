import type { Metadata } from "next";
import "./globals.css";
import BaseLayout from "@/components/templates/BaseLayout";

export const metadata: Metadata = {
  title: "BOTI | The Spatial Web Ecosystem",
  description: "Experience the web in 3D. No headset required. Built for the world the web became.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className="antialiased">
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
