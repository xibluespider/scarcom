import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/SessionProvider";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ResponsiveLayoutProvider from "@/components/ResponsiveLayoutProvider";

export const metadata = {
	title: "Scarcom",
};

export default function RootLayout({ children }) {
	return (
		<SessionProvider>
			<html lang="en" suppressHydrationWarning>
				<body>
					<ThemeProvider attribute="class" defaultTheme="dark">
						<SidebarProvider
							style={{ "--sidebar-width": "8rem" }}
							defaultOpen={false}
						>
							<AppSidebar />
							<ResponsiveLayoutProvider>{children}</ResponsiveLayoutProvider>
							<Toaster />
						</SidebarProvider>
					</ThemeProvider>
				</body>
			</html>
		</SessionProvider>
	);
}
