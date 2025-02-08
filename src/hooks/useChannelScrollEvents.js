import { useEffect } from "react";
import useScrollEvents from "./useScrollEvents";

export default function useChannelScrollEvents(messages) {
	const { containerRef, scrollToBottom, showDownIcon, scrollInfo } =
		useScrollEvents();

	const messagesChangeEffect = () => {
		if (!containerRef.current) return;
		if (showDownIcon) return;
		scrollToBottom();
	};

	useEffect(messagesChangeEffect, [messages]);

	return { containerRef, scrollToBottom, showDownIcon };
}
