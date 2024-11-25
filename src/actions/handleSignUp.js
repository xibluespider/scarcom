"use server";

import { signIn } from "@/auth";

import { isRedirectError } from "next/dist/client/components/redirect";

export default async function handleSignUp(credentials) {
  console.log(credentials);
}
