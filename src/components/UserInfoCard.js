"use client";

import { Skeleton } from "./ui/skeleton";
import { SidebarTrigger } from "./ui/sidebar";

import { User as UserIcon } from "lucide-react";

export default function UserInfoCard({ session, ...props }) {
	if (session.status === "loading")
		return (
			<div {...props}>
				<div className="p-1 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<UserIcon className="shrink-0" />
						<div className="flex flex-col space-y-1 break-all">
							<Skeleton className="h-[10px] w-[60px]" />
							<Skeleton className="h-[10px] w-[120px]" />
						</div>
					</div>
					<SidebarTrigger className="md:hidden" />
				</div>
			</div>
		);

	return (
		<div {...props}>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2 break-all">
					<UserIcon className="shrink-0" />
					<div className="flex flex-col">
						<div className="font-medium	leading-none tracking-tight">
							{session?.data?.user?.username}
						</div>
						<div className="text-xs text-muted-foreground">
							{session?.data?.user?.email}
						</div>
					</div>
				</div>
				<SidebarTrigger />
			</div>
		</div>
	);
}
