import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SessionProvider } from "@/components/SessionProvider";

import { AppSidebar } from "@/components/AppSidebar";

export const metadata = {
  title: "Scarcom",
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <SidebarProvider style={{ "--sidebar-width": "8rem" }}>
              <AppSidebar />
              {children}
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
