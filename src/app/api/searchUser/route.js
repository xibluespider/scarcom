import { NextResponse } from "next/server";
import { searchUser } from "@/lib/db";

export async function GET(request) {
	const url = new URL(request.url);
	const searchQuery = url.searchParams.get("searchQuery");

	try {
		let searchResponse = await searchUser(searchQuery);
		const response = {
			ok: true,
			data: searchResponse,
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
