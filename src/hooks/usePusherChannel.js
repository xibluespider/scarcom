import { useState, useEffect } from "react";

import Pusher from "pusher-js";

export default function usePusherChannel(channelName) {
	const [messages, setMessages] = useState([]);

	const newMessageEventEffect = (message) => {
		setMessages((prevState) => [...prevState, message]);
		console.log(messages);
	};

	const deleteMessageEventEffect = ({ messageId }) => {
		setMessages((prevMessages) =>
			prevMessages.filter((message) => message.messageId !== messageId)
		);
	};

	const pusherEffect = () => {
		const options = { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER };
		const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, options);

		const channel = pusher.subscribe(channelName);
		channel.bind("new_message", newMessageEventEffect);
		channel.bind("delete_message", deleteMessageEventEffect);

		return () => pusher.unsubscribe(channelName);
	};

	useEffect(pusherEffect, [channelName]);

	return messages;
}
