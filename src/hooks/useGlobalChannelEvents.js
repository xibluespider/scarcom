import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import usePusherChannel from "./usePusherChannel";

export default function useGlobalChannelEvents() {
	const session = useSession();

	const [initialGlobalMessages, setInitialGlobalMessages] = useState([]);
	const [initialGlobalMessagesLoading, setInitialGlobalMessagesLoading] =
		useState(false);
	const [deleteMessageLoading, setDeleteMessageLoading] = useState(false);

	const channelName = "global_channel";
	let globalMessages = [];
	globalMessages = usePusherChannel(channelName);

	const getGlobalMessages = async () => {
		setInitialGlobalMessagesLoading((prev) => true);

		try {
			const response = await fetch("/api/globalChannel");

			if (!response.ok) {
				toast(response.message);

				setInitialGlobalMessagesLoading((prev) => false);
				return;
			}

			const data = await response.json();
			setInitialGlobalMessages((prev) => data.messages);
		} catch (error) {
			console.error("ERROR:hooks/useGlobalChannelEvents:getGlobalMessages");

			toast("Error. Please try again later.");
		}

		setInitialGlobalMessagesLoading((prev) => false);
	};

	const sendMessageToGlobal = async (message) => {
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
		setDeleteMessageLoading(true);
		try {
			const response = await fetch("/api/globalChannel", {
				method: "DELETE",
				body: JSON.stringify({ messageId }),
			});

			if (!response.ok) {
				console.error("Failed to delete global message:", response);
				toast(response.message);
			} else {
				setInitialGlobalMessages((prevMessages) =>
					prevMessages.filter((msg) => msg.messageId !== messageId)
				);
			}
		} catch (error) {
			console.error("ERROR:hooks/useGlobalChannelEvents:deleteGlobalMessage");
			toast("Error. Please try again later.");
		} finally {
			setDeleteMessageLoading(false);
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

	useEffect(() => {
		getGlobalMessages();
	}, []);

	return {
		initialGlobalMessagesLoading,
		initialGlobalMessages,
		globalMessages,
		deleteMessageLoading,
		handleGlobalMessageFormSubmitEvent,
		handleGlobalMessageDeleteEvent,
	};
}
