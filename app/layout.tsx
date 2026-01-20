import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Employee Directory - Company ABC",
  description: "Employee Directory Management System for Company ABC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
