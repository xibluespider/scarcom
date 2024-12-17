"use server";

import { signIn } from "@/auth";

export default async function handleSignIn(credentials) {
  const signInParams = {
    ...credentials,
    redirect: true,
    redirectTo: "/",
  };

  const handleSignInError = (error) => {
    console.log("handleSignInError : error caught");

    return {
      ok: false,
      message: error?.message,
    };
  };

  const response = await signIn("credentials", signInParams).catch(
    handleSignInError
  );
  return response;
}
