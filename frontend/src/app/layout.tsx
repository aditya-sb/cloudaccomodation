// RootLayout.tsx
"use client";
import "./globals.css";
import { ThemeProvider } from "./ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
