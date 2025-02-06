import * as db from "@/lib/db";
import { pusher } from "@/lib/pusherConfig";

export async function GET(request) {
	const url = new URL(request.url);
	const channelId = url.searchParams.get("channelId");

	if (!channelId) {
		return Response.json({
			ok: false,
			message: "Missing channelId",
		});
	}

	try {
		const messages = await db.getMessages(channelId);

		return Response.json({ ok: true, messages });
	} catch (error) {
		console.error("GET Messages Error:", error);
		return Response.json({
			ok: false,
			message: "Failed to fetch messages",
		});
	}
}

export async function POST(request) {
	const { channelId, userId, message } = await request.json();

	try {
		const newMessage = await db.createMessage(channelId, userId, message);

		await pusher.trigger(`channel_${channelId}`, "new_message", {
			...newMessage,
			username: newMessage.username,
		});

		return Response.json({ ok: true });
	} catch (error) {
		console.error("POST Message Error:", error);
		return Response.json({
			ok: false,
			message: "Message send failed",
		});
	}
}

export async function DELETE(request) {
	const { messageId, channelId } = await request.json();

	try {
		await db.deleteMessage(messageId);
		await pusher.trigger(`channel_${channelId}`, "delete_message", {
			messageId,
		});
		return Response.json({ ok: true });
	} catch (error) {
		console.error("DELETE Message Error:", error);
		return Response.json({
			ok: false,
			message: "Message deletion failed",
		});
	}
}
