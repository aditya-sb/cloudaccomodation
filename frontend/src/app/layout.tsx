import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import ServerLayout from "./ServerLayout";

export const metadata: Metadata = {
  title: "Cloud Accommodation",
  description: "Find your perfect stay.",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ServerLayout>
          <ClientLayout>{children}</ClientLayout>
        </ServerLayout>
      </body>
    </html>
  );
}
