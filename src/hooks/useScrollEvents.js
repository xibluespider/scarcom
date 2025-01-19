import { useCallback, useEffect, useRef, useState } from "react";

export default function useScrollEvents() {
	const containerRef = useRef(null);
	const [showDownIcon, setShowDownIcon] = useState(false);
	const [scrollInfo, setScrollInfo] = useState({
		scrollTop: 0,
		scrollHeight: 0,
		clientHeight: 0,
		scrollTopPlusClientHeight: 0,
		scrollHeightMinusTen: 0,
		isAtBottom: false,
	});

	const scrollToBottom = () => {
		if (!containerRef.current) return;
		containerRef.current.scrollTop = containerRef.current.scrollHeight;
		// no need to set showDownIcon here. the initial handleScroll call will take care of it.
	};

	const handleScroll = useCallback(() => {
		if (!containerRef.current) return;

		const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

		const scrollTopPlusClientHeight = scrollTop + clientHeight;
		const scrollHeightMinusTen = scrollHeight - 100;
		const isAtBottom = scrollTopPlusClientHeight >= scrollHeightMinusTen;

		setScrollInfo({
			scrollTop,
			scrollHeight,
			clientHeight,
			scrollTopPlusClientHeight,
			scrollHeightMinusTen,
			isAtBottom,
		});

		setShowDownIcon(!isAtBottom);
	}, []);

	const scrollEffect = () => {
		const container = containerRef.current;
		if (!container) return;

		container.addEventListener("scroll", handleScroll);

		return () => container.removeEventListener("scroll", handleScroll);
	};

	const initialScrollToButtomEffect = () => {
		if (!containerRef.current) return;
		scrollToBottom();
		handleScroll(); // after the scroll is set to bottom, check if the scroll is at the bottom and update `showDownIcon`
	};

	useEffect(initialScrollToButtomEffect, [containerRef]);

	// to track scroll event and its properties
	useEffect(scrollEffect, [handleScroll, containerRef.current]);

	return { containerRef, scrollToBottom, showDownIcon, scrollInfo };
}
