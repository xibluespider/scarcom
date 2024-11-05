import "./globals.css";

import NextArtProvider from "../components/NextArtProvider";

export const metadata = {
  title: "scarcom",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextArtProvider>{children}</NextArtProvider>
      </body>
    </html>
  );
}
