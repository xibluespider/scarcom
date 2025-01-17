import * as db from "@/lib/db";
import { pusher } from "@/lib/pusherConfig";

import { v4 as uuidv4 } from "uuid";

export async function GET() {
	let dbr = "api/globalChannel:GET:invoked";

	try {
		dbr = await db.getGlobalMessages();
	} catch (error) {
		console.log("ERROR:api/globalChannel:GET:getGlobalMessages");

		const response = {
			ok: false,
			message: "Internal server error. Please try again later.",
		};

		return Response.json(response);
	}

	const response = {
		ok: true,
		message: "api/globalChannel:pingpong",
		messages: dbr,
	};

	return Response.json(response);
}

export async function POST(request) {
	console.log("api/globalChannel:POST:invoked");

	const payload = await request.json();
	const { userId, username, message } = payload;

	const messageId = uuidv4();

	try {
		const data = {
			messageId,
			message,
			username,
		};

		await pusher.trigger("global_channel", "new_message", data);
	} catch (error) {
		console.log("ERROR:api/globalChannel:POST:pusherTrigger");

		const response = {
			ok: false,
			message: "Internal server error. Please try again later",
		};

		return Response.json(response);
	}

	try {
		const data = {
			messageId,
			message,
			userId,
			isDeleted: false,
		};

		await db.addMessageToGlobal(data);
	} catch (error) {
		console.log("ERROR:api/globalChannel:POST:addMessageToGlobal");
		console.log(error);
		const response = {
			ok: false,
			message: "Internal server error. Please try again later",
		};

		return Response.json(response);
	}

	const response = {
		ok: true,
		message: "api/globalChannel:pingpong",
	};

	return Response.json(response);
}

export async function DELETE(request) {
	console.log("api/globalChannel:DELETE:invoked");

	const { messageId } = await request.json();

	if (!messageId) {
		return Response.json({
			ok: false,
			message: "messageId is required",
		});
	}

	try {
		await pusher.trigger("global_channel", "delete_message", { messageId });
	} catch (error) {
		console.error("ERROR:api/globalChannel:DELETE:pusherTrigger", error);

		return Response.json({
			ok: false,
			message: "Internal server error. Could not trigger delete message event.",
		});
	}

	try {
		await db.deleteGlobalMessage(messageId);
	} catch (error) {
		console.error("ERROR:api/globalChannel:DELETE:deleteMessageFromGlobal");

		return Response.json({
			ok: false,
			message: "Internal server error. Could not delete the message.",
		});
	}

	return Response.json({
		ok: true,
		message: "Message deleted successfully",
	});
}
