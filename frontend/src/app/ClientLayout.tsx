"use client";

import { store } from "./redux/store";
import { ThemeProvider } from "./ThemeContext";
import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react";
import AuthSessionHandler from "./auth/AuthSessionHandler";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider>
          <AuthSessionHandler>
            {children}
          </AuthSessionHandler>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
} 