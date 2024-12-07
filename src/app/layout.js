import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: "Scarcom",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
