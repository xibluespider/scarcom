import { useState } from "react";

import { signOut, useSession } from "next-auth/react";

import { useToast } from "./use-toast";

import handleSignIn from "@/actions/handleSignIn";

export default function useAuthEvents() {
  const { toast } = useToast();
  const { update } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const handleSignInFormSubmit = async (event) => {
    setIsLoading((prev) => true);
    event.preventDefault();

    const data = new FormData(event.target);
    const credentials = Object.fromEntries(data);

    try {
      const response = await handleSignIn(credentials);

      if (!response) update();

      let description = "sign in success";
      if (response?.message) description = response.message;
      toast({ description });
    } catch (error) {
      let description = "unknown error, please try again later.";
      toast({ description });
    }
    setIsLoading((prev) => false);
  };

  const handleSignOutEvent = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSignInFormSubmit, isLoading, handleSignOutEvent };
}
