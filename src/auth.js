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

        const handleGetUserError = () => {
          console.log("auth/authorize/getUserByEmail : error caught");
          const message = "Internal Server error. Please try again later";
          throw new AuthCredentialsError(message);
        };
        const iuser = await getUserByEmail(email).catch(handleGetUserError);

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
