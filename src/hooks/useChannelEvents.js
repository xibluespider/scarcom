import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const fetchChannelId = async (username, channelName) => {
	const url = new URL("/api/channel", window.location.origin);
	url.searchParams.append("username", username);
	url.searchParams.append("channelName", channelName);

	const response = await fetch(url);
	const data = await response.json();
	return data;
};

export default function useChannelEvents(channelName) {
	const router = useRouter();

	const session = useSession();

	const [channelId, setChannelId] = useState("");
	const [isChannelLoading, setIsChannelLoading] = useState(true);

	const channelEffect = async () => {
		if (session.status == "loading") return;

		const username = session.data.user.username;

		if (username == channelName) {
			router.replace("/");
			return;
		}

		try {
			const response = await fetchChannelId(username, channelName);

			if (!response.ok) {
				let message = "Internal server error. Please try again later.";
				message = response?.message ? response.message : message;

				toast(message);
				router.replace("/");

				return;
			}

			setChannelId((prev) => response.channelId);
			setIsChannelLoading((prev) => false);
		} catch (error) {
			toast("Error. Please try again later");
			router.replace("/");
			return;
		}
	};

	useEffect(() => {
		channelEffect();
	}, [session.status, channelName]);

	return {
		isChannelIdLoading: isChannelLoading,
		channelId,
		session,
	};
}
