"use client";

export default function Page({ params }) {
	return (
		<div className="grow border rounded-lg flex flex-col items-center justify-center">
			<div>
				<div className="text-xl">ChannelName: {params.channelName}</div>
			</div>
		</div>
	);
}
