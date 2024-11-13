import "./globals.css";

import NextArtProvider from "../components/NextArtProvider";
import { AuthSessionProvider } from "@/components/AuthSessionProvider";
import { auth } from "@/auth";

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
        </body>
      </html>
    </AuthSessionProvider>
  );
}
