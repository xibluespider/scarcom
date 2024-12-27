"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import ActivityPanel from "./ActivityPanel";

export default function ResponsiveLayoutProvider({ children }) {
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
		<div className="grow flex">
			<div className={cn(activityPanelResponsive)}>
				<ActivityPanel />
			</div>
			<div className={cn(pageResponsive)}>{children}</div>
		</div>
	);
}
