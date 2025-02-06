import * as db from "@/lib/db";

export async function GET(request) {
	console.log("api/channel:GET:invoked");

	const { searchParams } = new URL(request.url);
	const username1 = searchParams.get("username");
	const username2 = searchParams.get("channelName");

	if (!username1 || !username2) {
		return Response.json({
			ok: false,
			message:
				"Both username and channelName are required as query parameters.",
		});
	}

	try {
		const channelId = await db.getCommonChannel(username1, username2);

		return Response.json({
			ok: true,
			channelId: channelId,
		});
	} catch (error) {
		console.error("ERROR: api/channel:GET");

		return Response.json({
			ok: false,
			message: error.message || "Internal server error.",
		});
	}
}

export async function DELETE(request) {
	console.log("api/channel:DELETE:invoked");

	try {
		const { channelId } = await request.json();

		if (!channelId) {
			return Response.json({
				ok: false,
				message: "channelId is required",
			});
		}

		await db.deleteChannel(channelId);

		return Response.json({
			ok: true,
			message: "Channel deleted.",
		});
	} catch (error) {
		console.error("ERROR: api/channel:DELETE");

		return Response.json({
			ok: false,
			message: "Internal server error. Could not delete the channel.",
		});
	}
}
