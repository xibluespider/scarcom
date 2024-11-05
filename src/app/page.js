"use client";

import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import {
	CircleX as ClearIcon,
	Globe as GlobeIcon,
	User as UserIcon,
	Loader2 as LoadingIcon,
} from "lucide-react";

import useSearchEvents from "@/hooks/useSearchEvents";

export default function Page() {
	const session = useSession();

	const {
		searchQuery,
		showSearchResults,
		handleSearchQueryChange,
		handleClearSearchResults,
		handleSearchFormSubmit,
	} = useSearchEvents();

	return (
		<div className="grow max-h-screen p-2">
			<div className="h-full border rounded-lg p-2 lg:max-w-[250px] flex flex-col space-y-2">
				<UserInfoCard session={session} className="border rounded-lg p-2" />

				<Button variant="outline" className="justify-start px-3">
					<div className="flex flex-row items-center justify-start space-x-3">
						<GlobeIcon size={18} />
						<div className="text-base">Global</div>
					</div>
				</Button>

				<form className="border rounded-lg" onSubmit={handleSearchFormSubmit}>
					<Input
						value={searchQuery}
						onChange={handleSearchQueryChange}
						type="text"
						name="query"
						placeholder="🔍 Search User"
						className="shrink-0"
					/>
				</form>

				<div className="grow border rounded-lg p-2 flex flex-col overflow-hidden">
					<div className={showSearchResults ? "hidden" : "p-1"}>
						Conversations
					</div>
					<div
						className={
							!showSearchResults
								? "hidden"
								: "p-1  flex justify-between items-center space-x-2"
						}
					>
						<div className="leading-none tracking-tight">Search Results</div>
						<Button
							onClick={handleClearSearchResults}
							size="icon"
							variant="ghost"
							className="h-6 w-6"
						>
							<ClearIcon />
						</Button>
					</div>

					<ScrollArea>
						<div className="flex flex-col space-y-2">
							{Array.from({ length: 15 }, (_, index) => (
								<UserCard key={index} />
							))}
						</div>
					</ScrollArea>
					{/* <div className="flex items-center justify-center grow">
						<LoadingIcon className="animate-spin" />
					</div> */}
				</div>
			</div>
		</div>
	);
}

export function UserInfoCard({ session, ...props }) {
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
							{session?.data?.user?.name}
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

export function UserCard({ ...props }) {
	return (
		<div {...props}>
			<div className="flex items-center space-x-2 break-all">
				<UserIcon className="shrink-0" />
				<div className="flex flex-col">
					<div className="font-medium leading-none tracking-tight">
						someblue
					</div>
					<div className="text-xs text-muted-foreground">
						someblue@email.com
					</div>
				</div>
			</div>
		</div>
	);
}
