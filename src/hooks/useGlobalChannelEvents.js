import { useState, useEffect } from "react";

import { useSession } from "next-auth/react";

import usePusherChannel from "./usePusherChannel";

export default function useGlobalChannelEvents() {
	const session = useSession();

	const [initialGlobalMessages, setInitialGlobalMessages] = useState([]);
	const [initialGlobalMessagesLoading, setInitialGlobalMessagesLoading] =
		useState(false);

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
		handleGlobalMessageFormSubmitEvent,
	};
}
