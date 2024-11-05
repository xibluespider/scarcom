import { NextResponse } from "next/server";

export async function GET() {
	const response = {
		ok: true,
		message: "hello world",
	};
	return NextResponse.json(response);
}
