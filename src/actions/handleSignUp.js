"use server";

import { addUser } from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function handleSignUp(credentials) {
	const { username, email, password, confirmPassword } = credentials;

	const saltRounds = parseInt(process.env.SALT_ROUNDS);
	const hashedPassword = bcrypt.hashSync(password, saltRounds);

	const new_user_credentials = {
		username,
		email,
		password: hashedPassword,
	};

	try {
		const response = await addUser(new_user_credentials);
	} catch (error) {
		// if (error?.name !== "PostgresError") return response;
		// if (error?.severity !== "ERROR") return response;

		let message = "Internal server error. Please try again later";

		if (error?.constraint_name === "users_email_unique")
			message = "Email already exists. Please sign in";

		if (error?.constraint_name === "users_username_unique")
			message = "Username already exists.";

		const response = {
			ok: false,
			message,
		};

		return response;
	}

	return {
		ok: true,
		message: "User account created. Please sign in",
	};
}
