import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./lib/db";
import AuthCredentialsError from "./lib/AuthCredentialsError";

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
          throw new AuthCredentialsError("Missing Credentials");

        try {
          let user = await getUserByEmail(email);

          if (!user) {
            const message = "User not found";
            throw new AuthCredentialsError(message);
          }

          if (user.password !== password) {
            const message = "Invalid credentials";
            throw new AuthCredentialsError(message);
          }

          const { password: omitted, ...safeUser } = user;
          return safeUser;
        } catch (error) {
          const message = "Internal server error. Please try again later";
          throw new AuthCredentialsError(message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  secret: process.env.AUTH_SECRET,
});
