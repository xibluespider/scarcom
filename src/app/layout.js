import "./globals.css";

import NextArtProvider from "../components/NextArtProvider";

import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/components/SessionProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "scarcom",
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Header/>
          <NextArtProvider>{children}</NextArtProvider>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
