import Pusher from "pusher-js";

export default function usePusherChannel(channelName) {
	const options = { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER };
	const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, options);
	const pusherRef = pusher.subscribe(channelName);
	return { pusherRef };
}
