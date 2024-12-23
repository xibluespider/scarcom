"use server";

import { signIn } from "@/auth";

import { isRedirectError } from "next/dist/client/components/redirect";

export default async function handleSignIn(credentials) {
	const signInParams = {
		...credentials,
		redirect: true,
		redirectTo: "/",
	};

	try {
		const response = await signIn("credentials", signInParams);
		return response;
	} catch (error) {
		if (isRedirectError(error)) throw error;

		let message = "Internal server error. Please try again later.";
		if (error.name === "InvalidSignInError") message = error.code;

		const response = {
			ok: false,
			message,
		};

		return response;
	}
}
