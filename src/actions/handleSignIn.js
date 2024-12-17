"use server";

import { signIn } from "@/auth";

import { isRedirectError } from "next/dist/client/components/redirect";

export default async function handleSignIn(credentials) {
  const signInParams = {
    ...credentials,
    redirect: true,
    redirectTo: "/",
  };

  const handleSignInError = (error) => {
    console.log("handleSignInError : error caught");

    if (isRedirectError(error)) throw error;

    return {
      ok: false,
      message:
        error?.cause?.err?.message ||
        "Internal server error. Please try again later.",
    };
  };

  const response = await signIn("credentials", signInParams).catch(
    handleSignInError
  );
  return response;
}
