// RootLayout.tsx
"use client";
import "./globals.css";
import Header from "./components/Header";
import { ThemeProvider } from "./ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className="antialiased">
          <Header />
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
