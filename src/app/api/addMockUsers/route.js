import { NextResponse } from "next/server";

import mockUsers from "@/lib/testing/mockUsers";
import handleSignUp from "@/actions/handleSignUp";

export async function addMockUser(user) {
	const credentials = {
		name: user.name,
		email: user.email,
		password: user.email,
		confirmPassword: user.email,
	};

	await handleSignUp(credentials);
}

export async function PUT() {
	try {
		for (let mockUser of mockUsers) await addMockUser(mockUser);

		const response = {
			ok: true,
			message: "users are added",
		};

		return NextResponse.json(response);
	} catch (error) {
		const response = {
			ok: false,
			message: "internal server error. please try again later.",
		};

		return NextResponse.json(response);
	}
}
