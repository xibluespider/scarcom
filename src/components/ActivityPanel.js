"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "./ui/scroll-area";

import {
	Globe as GlobeIcon,
	CircleX as ClearIcon,
	User as UserIcon,
	Loader2 as LoadingIcon,
} from "lucide-react";

import { VisibilityWrapper } from "@/lib/utils";

import UserInfoCard from "./UserInfoCard";

import useSearchEvents from "@/hooks/useSearchEvents";

export default function ActivityPanel() {
	const session = useSession();

	const {
		searchQuery,
		showSearchResults,
		searchResults,
		handleSearchQueryChange,
		handleClearSearchResults,
		handleSearchUserFormSubmit,
		searchResultsIsLoading,
	} = useSearchEvents();

	return (
		<div className="min-w-[250px] grow flex flex-col space-y-2">
			<UserInfoCard session={session} className="border rounded-lg p-2" />

			<Button variant="outline" className="justify-start px-3" asChild>
				<Link href="/global">
					<div className="flex flex-row items-center justify-start space-x-3">
						<GlobeIcon size={18} />
						<div className="text-base">Global</div>
					</div>
				</Link>
			</Button>

			<form className="border rounded-lg" onSubmit={handleSearchUserFormSubmit}>
				<Input
					value={searchQuery}
					onChange={handleSearchQueryChange}
					type="text"
					name="searchQuery"
					placeholder="🔍 Search User"
					className="shrink-0"
				/>
			</form>

			<div className="grow border rounded-lg flex flex-col space-y-2 px-1 overflow-hidden">
				<VisibilityWrapper isHide={showSearchResults || searchResultsIsLoading}>
					<div className="py-2 px-1 mx-auto">🚧 Conversations 🚧</div>
				</VisibilityWrapper>

				<VisibilityWrapper isHide={!showSearchResults}>
					<div className="p-1 flex justify-between items-center space-x-2">
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
				</VisibilityWrapper>

				<VisibilityWrapper isHide={!searchResultsIsLoading}>
					<div className="grow flex items-center justify-center">
						<LoadingIcon className="animate-spin" />
					</div>
				</VisibilityWrapper>

				<VisibilityWrapper
					isHide={!showSearchResults || searchResultsIsLoading}
				>
					<VisibilityWrapper isHide={!searchResults.length}>
						<ScrollArea className="h-full">
							<div className="flex flex-col space-y-3 py-2">
								{searchResults?.map((user, index) => (
									<UserCard key={index} user={user} />
								))}
							</div>
						</ScrollArea>
					</VisibilityWrapper>

					<VisibilityWrapper isHide={searchResults.length}>
						<div className="mx-auto">No users found.</div>
					</VisibilityWrapper>
				</VisibilityWrapper>
			</div>
		</div>
	);
}

export function UserCard({ user }) {
	return (
		<Button
			variant="ghost"
			size="lg"
			className="justify-start [&_svg]:size-5 p-2"
			asChild
		>
			<Link className="flex grow space-x-2" href={`/channel/${user?.username}`}>
				<UserIcon className="shrink-0" />
				<div className="flex flex-col">
					<div className="font-medium leading-none tracking-tight">
						{user?.username}
					</div>
					<div className="text-xs text-muted-foreground">{user?.email}</div>
				</div>
			</Link>
		</Button>
	);
}
