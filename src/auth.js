import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./lib/db";
import bcrypt from "bcryptjs";

class InvalidSignInError extends CredentialsSignin {
	constructor(message) {
		super(message);
		this.code = message;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const { email, password } = credentials;

				if (!email || !password)
					throw new InvalidSignInError("Missing Credentials");

				let iuser = null;
				try {
					iuser = await getUserByEmail(email);
				} catch (error) {
					message = "Internlal server error. Please try again later.";
					throw new InvalidSignInError(message);
				}

				if (!iuser) throw new InvalidSignInError("User not found");

				const isMatch = await bcrypt.compare(password, iuser.password);
				if (!isMatch)
					throw new InvalidSignInError("Invalid credentials");

				const { password: omitted, ...safeUser } = iuser;
				return safeUser;
			},
		}),
	],

	callbacks: {
		async jwt({ user, token }) {
			if (user) token.user = user;
			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},

	pages: {
		signIn: "/auth",
	},

	secret: process.env.AUTH_SECRET,

	logger: {
		error(e) {
			const prefix = "ERROR: auth/logger:";

			if (e.name == "InvalidSignInError") {
				console.log(`${prefix} InvalidSignInError: ${e.code}`);
			} else {
				console.log(`${prefix} UknownError`);
			}
		},
	},
});
