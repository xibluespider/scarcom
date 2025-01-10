import * as db from "@/lib/db";
import { pusher } from "@/lib/pusherConfig";

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

	try {
		const data = {
			username,
			message,
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
			userId,
			message,
		};

		await db.addMessageToGlobal(data);
	} catch (error) {
		console.log("ERROR:api/globalChannel:POST:addMessageToGlobal");

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
