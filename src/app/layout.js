import "./globals.css";

import NextArtProvider from "../components/NextArtProvider";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";
import { auth } from "@/auth";

import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "scarcom",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <AuthSessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body>
          <NextArtProvider>{children}</NextArtProvider>
          <Toaster />
        </body>
      </html>
    </AuthSessionProvider>
  );
}
