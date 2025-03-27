import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import usePusherChannel from "./usePusherChannel";
import { toast } from "sonner";

export default function useChannelMessageEvents(channelId) {
	const session = useSession();
	const router = useRouter();

	const [isChannelLoading, setIsChannelLoading] = useState(true);
	const [messages, setMessages] = useState([]);
	const [isMessageDeleteLoading, setIsDeleteMessageLoading] = useState(false);

	const channelName = `channel_${channelId}`;
	const { pusherRef } = usePusherChannel(channelName);

	const getInitialMessages = async () => {
		console.log("INVOKED:useChannelMessageEvents/getInitialMessages");

		try {
			const url = new URL("/api/message", window.location.origin);
			url.searchParams.append("channelId", channelId);

			const response = await fetch(url);

			if (!response.ok) {
				toast(response.message);
				router.replace("/");
				return;
			}

			const data = await response.json();
			setMessages((prev) => data.messages);
		} catch (error) {
			toast("Error. Please try again later.");
			console.error("ERROR:hooks/useChannelMessageEvents:getInitialMessages");
			router.replace("/");
		}
	};

	const sendMessageToChannel = async (messageText) => {
		console.log(messageText);

		const payload = {
			channelId,
			userId: session.data.user.id,
			message: messageText,
		};

		try {
			const response = await fetch("/api/message", {
				method: "POST",
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				toast(response.message);
				router.replace("/");
				return;
			}
		} catch (error) {
			console.error("ERROR:hooks/useChannelMessageEvents:sendMessageToChannel");
			toast("Error. Please try again later.");
			router.replace("/");
		}
	};

	const deleteChannelMessage = async (messageId) => {
		setIsDeleteMessageLoading(true);
		try {
			const response = await fetch("/api/message", {
				method: "DELETE",
				body: JSON.stringify({ messageId, channelId }),
			});

			if (!response.ok) {
				console.error("Failed to delete channel message:", response);
				toast(response.message);
				router.replace("/");
			}
		} catch (error) {
			toast("Error. Please try again later.");
			console.error("ERROR:hooks/useChannelMessageEvents:deleteChannelMessage");
			router.replace("/");
		} finally {
			setIsDeleteMessageLoading(false);
		}
	};

	const handleMessageDeleteEvent = async (messageId) => {
		console.log(messageId);

		await deleteChannelMessage(messageId);
	};

	const handleMessageFormSubmitEvent = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const messageText = formData.get("messageText");

		if (!messageText) return;
		e.target.reset();

		await sendMessageToChannel(messageText);
	};

	const addMessage = (message) => {
		console.log("useChannelMessageEvents/addMessage");

		console.log(message);

		setMessages((prev) => [...prev, message]);
	};

	const deleteMessage = ({ messageId }) => {
		console.log("useChannelMessageEvents/deleteMessage");

		console.log(messageId);

		setMessages((prevMessages) =>
			prevMessages.filter((msg) => msg.id !== messageId)
		);
	};

	useEffect(() => {
		if (!channelId) return;
		if (session.status == "loading") return;
		setIsChannelLoading((prev) => true);

		getInitialMessages();
		console.log("getInitialMessages:loaded");

		pusherRef.bind("new_message", addMessage);
		pusherRef.bind("delete_message", deleteMessage);

		setIsChannelLoading((prev) => false);
		return () => pusherRef.unsubscribe(channelId);
	}, [session.status, channelId]);

	return {
		isChannelLoading,
		messages,
		isMessageDeleteLoading,
		handleMessageDeleteEvent,
		handleMessageFormSubmitEvent,
	};
}
