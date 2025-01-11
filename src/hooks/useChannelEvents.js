import { useState, useEffect, useRef } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useChannelEvents(username) {
	const [userCheckIsLoading, setIsUserCheckIsLoading] = useState(true);
	const session = useSession();
	const router = useRouter();

	const effectHasRun = useRef(false);

	const useChannelEventsEffect = () => {
		if (session.status === "loading") return;

		if (session.data?.user?.username === username) {
			router.replace("/");
			return;
		}

		if (session.status === "authenticated" && !effectHasRun.current) {
			isUserExistCheckEffect();
			effectHasRun.current = true;
		}
	};

	const isUserExistCheckEffect = async () => {
		setIsUserCheckIsLoading(true);

		console.log("invoked: isUserExistCheckEffect");

		const url = new URL("/api/isUserExist/", window.location.origin);
		url.searchParams.append("usernameQuery", username);

		let response = null;
		try {
			response = await fetch(url);

			if (!response.ok) {
				toast("Internal server error. Please try again later");
				router.replace("/");
				return;
			}

			response = await response.json();

			if (response?.data === false) {
				toast("User not found");
				router.replace("/");
				return;
			}
		} catch (error) {
			toast("Error. Please try again later");
		} finally {
			setIsUserCheckIsLoading(false);
		}
	};

	useEffect(useChannelEventsEffect, [session]);

	return { session, userCheckIsLoading };
}
