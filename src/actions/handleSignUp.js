"use server";

import { addUser, getUserByEmail } from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function handleSignUp(credentials) {
	const { name, email, password, confirmPassword } = credentials;

	if (password !== confirmPassword)
		return {
			ok: false,
			message: "Passwords do not match. Please sign up again",
		};

	let iuser = null;
	try {
		iuser = await getUserByEmail(email);
	} catch (error) {
		return {
			ok: false,
			message: "Internal server error. Please try again later",
		};
	}

	if (iuser)
		return {
			ok: false,
			message: "User already exists. Please sign in",
		};

	const saltRounds = parseInt(process.env.SALT_ROUNDS);
	const hashedPassword = bcrypt.hashSync(password, saltRounds);

	const new_user_credentials = {
		email,
		name,
		password: hashedPassword,
	};

	try {
		const response = await addUser(new_user_credentials);
	} catch (error) {
		return {
			ok: false,
			message: "Internal server error. Please try again later",
		};
	}

	return {
		ok: true,
		message: "User account created. Please sign in",
	};
}
