import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game Design Bootstrapper",
  description: "A basic Next.js starter app with shadcn/UI and Tailwind CSS",
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
