import "./globals.css";

import NextArtProvider from "../components/NextArtProvider";

import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "scarcom",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextArtProvider>{children}</NextArtProvider>
          <Toaster />
      </body>
    </html>
  );
}
