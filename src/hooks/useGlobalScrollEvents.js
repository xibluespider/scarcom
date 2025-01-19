import { useEffect } from "react";
import useScrollEvents from "./useScrollEvents";

export default function useGlobalScrollEvents(
	globalMessages,
	initialGlobalMessages
) {
	const { containerRef, scrollToBottom, showDownIcon, scrollInfo } =
		useScrollEvents();

	const messagesChangeEffect = () => {
		if (!containerRef.current) return;
		if (showDownIcon) return;
		scrollToBottom();
	};

	useEffect(messagesChangeEffect, [globalMessages, initialGlobalMessages]);

	return { containerRef, scrollToBottom, showDownIcon };
}
