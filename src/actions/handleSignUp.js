"use server";

import { signIn } from "@/auth";
import { addUser, getUserByEmail } from "@/lib/db";

import { z } from "zod";

const signUpSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default async function handleSignUp(credentials) {
  const isValid = signUpSchema.safeParse(credentials);

  if (!isValid.success) {
    return {
      ok: false,
      message: isValid?.error || "Invalid credentials",
    };
  }

  const { email, password, confirmPassword } = credentials;
  let user = null;
  try {
    user = await getUserByEmail(email);
  } catch (error) {
    return {
      ok: false,
      message: "Internal server error. Please try again later",
    };
  }

  if (user)
    return {
      ok: false,
      message: "User already exists",
    };

  const hashedPassword = password;
  try {
    const dresponse = await addUser({ email, name: email, password });
  } catch (error) {
    console.error("error : handleSignUp");
    return {
      ok: false,
      message: "Internal server error. Please try again later.",
    };
  }

  return {
    ok: true,
    message: "User account created. Please sign in",
  };
}
