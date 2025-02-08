"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
	MessageSquare as MessageIcon,
	SendHorizonal as SendIcon,
	Loader2 as LoadingIcon,
	ChevronDown as DownIcon,
} from "lucide-react";

import { VisibilityWrapper } from "@/lib/utils";

import LoadingPage from "@/app/loading";

import useChannelEvents from "@/hooks/useChannelEvents";
import useChannelMessageEvents from "@/hooks/useChannelMessageEvents";
import useGlobalScrollEvents from "@/hooks/useGlobalScrollEvents";
import ChannelMessage from "@/components/ChannelMessage";

export default function Page({ params }) {
	const { channelName } = params;

	const { isChannelIdLoading, channelId, session } =
		useChannelEvents(channelName);

	const {
		isChannelLoading,
		messages,
		isMessageDeleteLoading,
		handleMessageDeleteEvent,
		handleMessageFormSubmitEvent,
	} = useChannelMessageEvents(channelId);

	const { containerRef, scrollToBottom, showDownIcon } =
		useGlobalScrollEvents(messages);

	if (session.status === "loading" || isChannelIdLoading || isChannelLoading)
		return <LoadingPage />;

	return (
		<div className="grow flex flex-col space-y-2">
			<div className="border rounded-lg flex space-x-2 items-center p-2.5 justify-between md:justify-end md:p-3">
				<SidebarTrigger className="md:hidden" />
				<div className="flex space-x-2 items-center">
					<MessageIcon size={18} className="" />
					<div>{channelName}</div>
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
							<ChannelMessage
								key={index}
								channelName={channelName}
								payload={payload}
								session={session}
								onDelete={() => handleMessageDeleteEvent(payload.id)}
								isDeleteLoading={isMessageDeleteLoading}
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
				onSubmit={handleMessageFormSubmitEvent}
				className="flex items-center space-x-1"
			>
				<Input name="messageText" />
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
