import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./lib/db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        if (!email || !password) throw new Error("Missing Credentials");

        const handleGetUserError = () => {
          console.log("auth/authorize/getUserByEmail : error caught");
          const message = "Internal Server error. Please try again later";
          throw new Error(message);
        };
        const iuser = await getUserByEmail(email).catch(handleGetUserError);

        if (!iuser) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, iuser.password);
        if (!isMatch) throw new Error("Invalid credentials");

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
