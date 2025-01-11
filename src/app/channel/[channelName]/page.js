"use client";

import LoadingPage from "@/app/loading";

import useChannelEvents from "@/hooks/useChannelEvents";

export default function Page({ params }) {
	const { session, userCheckIsLoading } = useChannelEvents(params.channelName);

	if (session.status == "loading") return <LoadingPage />;
	if (userCheckIsLoading) return <LoadingPage />;

	return (
		<div className="m-2 grow border rounded-lg flex flex-col items-center justify-center">
			<div>
				<div className="text-xl">ChannelName: {params.channelName}</div>
				<div>{JSON.stringify(userCheckIsLoading)}</div>
			</div>
		</div>
	);
}
