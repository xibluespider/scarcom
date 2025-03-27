import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import usePusherChannel from "./usePusherChannel";

export default function useGlobalChannelEvents() {
	const channelName = "global_channel";

	const session = useSession();
	const router = useRouter();

	const [isChannelLoading, setIsChannelLoading] = useState(true);
	const [messages, setMessages] = useState([]);

	const [isMessageDeleteLoading, setIsDeleteMessageLoading] = useState(false);

	const { pusherRef } = usePusherChannel("global_channel");

	const getInitialMessages = async () => {
		console.log("INVOKED:getInitialMessages");

		try {
			const response = await fetch("/api/globalChannel");

			if (!response.ok) {
				toast(response.message);
				router.replace("/");
				return;
			}

			const data = await response.json();
			setMessages((prev) => data.messages);
		} catch (error) {
			toast("Error. Please try again later.");
			console.error("ERROR:hooks/useGlobalChannelEvents:getGlobalMessages");
		}
	};

	const sendMessageToGlobal = async (message) => {
		console.log(message);
		const payload = {
			userId: session.data.user.id,
			username: session.data.user.username,
			message: message,
		};

		const params = {
			body: JSON.stringify(payload),
			method: "POST",
		};

		try {
			const response = await fetch("/api/globalChannel", params);
			if (!response.ok) {
				toast(response.message);
				return;
			}
		} catch (error) {
			console.error("ERROR:hooks/useGlobalChannelEvents:sendMessageToGlobal");
			toast("Error. Please try again later.");
		}
	};
	const deleteGlobalMessage = async (messageId) => {
		setIsDeleteMessageLoading(true);
		try {
			const response = await fetch("/api/globalChannel", {
				method: "DELETE",
				body: JSON.stringify({ messageId }),
			});

			if (!response.ok) {
				console.error("Failed to delete global message:", response);
				toast(response.message);
			} else {
			}
		} catch (error) {
			toast("Error. Please try again later.");
			console.error("ERROR:hooks/useGlobalChannelEvents:deleteGlobalMessage");
		} finally {
			setIsDeleteMessageLoading(false);
		}
	};

	const handleGlobalMessageDeleteEvent = async (messageId) => {
		console.log(messageId);
		await deleteGlobalMessage(messageId);
	};

	const handleGlobalMessageFormSubmitEvent = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const globalMessage = formData.get("globalMessage");

		if (!globalMessage) return;
		e.target.reset();

		await sendMessageToGlobal(globalMessage);
	};

	const addMessage = (message) => {
		console.log("INVOKED:addMessage");
		console.log(message);
		setMessages((prev) => [...prev, message]);
	};

	const deleteMessage = ({ messageId }) => {
		console.log("INVOKED:deleteMessage");
		console.log(messageId);
		setMessages((prevMessages) =>
			prevMessages.filter((msg) => msg.messageId !== messageId)
		);
	};

	useEffect(() => {
		if (session.status == "loading") return;
		setIsChannelLoading((prev) => true);

		getInitialMessages();
		console.log("getInitialMessages:loaded");

		pusherRef.bind("new_message", addMessage);
		pusherRef.bind("delete_message", deleteMessage);

		setIsChannelLoading((prev) => false);
		return () => pusherRef.unsubscribe(channelName);
	}, [session.status]);

	return {
		isChannelLoading,
		messages,
		isMessageDeleteLoading,
		handleGlobalMessageDeleteEvent,
		handleGlobalMessageFormSubmitEvent,
	};
}
