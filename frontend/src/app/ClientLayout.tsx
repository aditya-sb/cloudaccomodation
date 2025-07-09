"use client";

import { store } from "./redux/store";
import { ThemeProvider } from "./ThemeContext";
import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react";
import AuthSessionHandler from "./auth/AuthSessionHandler";
import { Toaster } from "react-hot-toast";

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
            <Toaster position="top-right" />
          </AuthSessionHandler>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}