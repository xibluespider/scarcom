import "./globals.css";

import NextArtProvider from "../components/NextArtProvider";

import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/SessionProvider";

export const metadata = {
  title: "scarcom",
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <NextArtProvider>{children}</NextArtProvider>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
