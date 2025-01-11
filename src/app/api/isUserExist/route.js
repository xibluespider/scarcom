import { NextResponse } from "next/server";
import { getUserByUsername } from "@/lib/db";

export async function GET(request) {
	console.log("[INVOKED]:api/isUserExist:GET");

	const url = new URL(request.url);
	const usernameQuery = url.searchParams.get("usernameQuery");

	try {
		let user = await getUserByUsername(usernameQuery);

		if (!user) user = false;

		const response = {
			ok: true,
			data: true,
		};

		return NextResponse.json(response);
	} catch (error) {
		const response = {
			ok: false,
			message: "Internal server error. Please try again later.",
		};

		return NextResponse.json(response);
	}
}
