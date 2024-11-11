import "./globals.css";

import NextArtProvider from "../components/NextArtProvider";
import AuthSessionProvider from "@/components/AuthSessionProvider";

export const metadata = {
  title: "scarcom",
};

export default function RootLayout({ children }) {
  return (
    <AuthSessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <NextArtProvider>{children}</NextArtProvider>
        </body>
      </html>
    </AuthSessionProvider>
  );
}
