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
          throw new AuthCredentialsError("Missing credentials");

        const users = await getUserByEmail(email);
        if (!users || users.length === 0)
          throw new AuthCredentialsError("User not found");

        const [user] = users;
        if (user.password !== password)
          throw new AuthCredentialsError("Invalid credentials");

        const { password: omitted, ...safeUser } = user;
        return safeUser;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  secret: process.env.AUTH_SECRET,
});
