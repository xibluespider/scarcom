"use client";

import { useSession } from "next-auth/react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
	Globe as GlobeIcon,
	SendHorizonal as SendIcon,
	Loader2 as LoadingIcon,
	ChevronDown as DownIcon,
} from "lucide-react";

import LoadingPage from "@/app/loading";

import Message from "@/components/Message";
import { VisibilityWrapper } from "@/lib/utils";

import useGlobalChannelEvents from "@/hooks/useGlobalChannelEvents";
import useChannelScrollEvents from "@/hooks/useChannelScrollEvents";

export default function Page() {
	const session = useSession();

	const {
		isChannelLoading,
		messages,
		isMessageDeleteLoading,
		handleGlobalMessageDeleteEvent,
		handleGlobalMessageFormSubmitEvent,
	} = useGlobalChannelEvents();

	const { containerRef, scrollToBottom, showDownIcon } =
		useChannelScrollEvents(messages);

	if (session.status === "loading" || isChannelLoading) return <LoadingPage />;

	return (
		<div className="grow flex flex-col space-y-2">
			<div className="border rounded-lg  flex space-x-2 items-center p-2.5 justify-between md:justify-end md:p-3">
				<SidebarTrigger className="md:hidden" />
				<div className="flex space-x-2 items-center">
					<GlobeIcon size={18} className="" />
					<div>Global</div>
				</div>
			</div>

			<VisibilityWrapper isHide={!isChannelLoading}>
				<div className="border rounded-lg p-1 grow flex items-center justify-center">
					<LoadingIcon className="animate-spin size-10" />
				</div>
			</VisibilityWrapper>

			<VisibilityWrapper isHide={isChannelLoading}>
				<ScrollArea
					className="h-full p-1 border rounded-lg"
					viewportRef={containerRef}
				>
					<div className="flex flex-col space-y-2 px-0.5">
						{messages?.map((payload, index) => (
							<Message
								key={index}
								payload={payload}
								onDelete={() =>
									handleGlobalMessageDeleteEvent(payload.messageId)
								}
								isDeleteLoading={isMessageDeleteLoading}
								session={session}
							/>
						))}
					</div>

					<VisibilityWrapper isHide={!showDownIcon}>
						<Button
							className="absolute right-3 bottom-2"
							size="icon"
							variant="outline"
							onClick={scrollToBottom}
						>
							<DownIcon />
						</Button>
					</VisibilityWrapper>
				</ScrollArea>
			</VisibilityWrapper>

			<form
				onSubmit={handleGlobalMessageFormSubmitEvent}
				className="flex items-center space-x-1"
			>
				<Input name="globalMessage" />
				<Button
					type="submit"
					size="icon"
					variant="ghost"
					className="[&_svg]:size-5"
				>
					<SendIcon />
				</Button>
			</form>
		</div>
	);
}
