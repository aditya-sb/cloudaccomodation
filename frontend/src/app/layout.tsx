// RootLayout.tsx
"use client";
import "./globals.css";
import { store } from "./redux/store";
import { ThemeProvider } from "./ThemeContext";
import { Provider } from 'react-redux';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider >
      <Provider store={store}>
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
      </Provider>
    </ThemeProvider>
  );
}
