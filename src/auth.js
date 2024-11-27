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

        let iuser;
        try {
          iuser = await getUserByEmail(email);
        } catch (error) {
          console.error("DatabaseError");

          const message = "Internal server error. Please try again later";
          throw new AuthCredentialsError(message);
        }

        if (!iuser) throw new AuthCredentialsError("User not found");

        if (iuser.password !== password)
          throw new AuthCredentialsError("Invalid credentials");

        const { password: omitted, ...safeUser } = iuser;
        return safeUser;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  secret: process.env.AUTH_SECRET,
});
