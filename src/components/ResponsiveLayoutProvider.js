"use client";

import { usePathname } from "next/navigation";

import { cn, VisibilityWrapper } from "@/lib/utils";

import ActivityPanel from "./ActivityPanel";
import { useSession } from "next-auth/react";

export default function ResponsiveLayoutProvider({ children }) {
	const session = useSession();
	const pathname = usePathname();

	let activityPanelResponsive = "";
	let pageResponsive = "";

	if (pathname === "/auth" || pathname == "/about") {
		activityPanelResponsive = "hidden";
		pageResponsive = "grow flex";
	}

	if (pathname === "/") {
		activityPanelResponsive = "grow flex lg:max-w-[250px]";
		pageResponsive = "hidden lg:grow lg:flex";
	}

	if (!["/", "/about", "/auth"].includes(pathname)) {
		activityPanelResponsive = "hidden lg:grow lg:flex lg:max-w-[250px]";
		pageResponsive = "grow flex";
	}

	return (
		<div className="grow flex gap-2 max-h-screen p-2">
			<VisibilityWrapper isHide={session.status !== "authenticated"}>
				<div className={cn(activityPanelResponsive)}>
					<ActivityPanel />
				</div>
			</VisibilityWrapper>
			<div className={cn(pageResponsive)}>{children}</div>
		</div>
	);
}
