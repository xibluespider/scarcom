"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
	return (
		<div className="grow flex items-center justify-center">
			<SidebarTrigger className="absolute top-1 left-1" />
			<div>about page placeholder</div>
		</div>
	);
}
