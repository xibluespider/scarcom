import { signIn } from "next-auth/react";

import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";

export function useAuthOperations() {
  const handleSignIn = async (credentials) => {
    const signInParams = {
      ...credentials,
      redirect: false,
    };

    const response = await signIn("credentials", signInParams);

    if (response.error) throw new Error(response.code);
    return response;
  };
  return { handleSignIn };
}

export default function useAuthEvents() {
  const { handleSignIn } = useAuthOperations();
  const { toast } = useToast();

  const router = useRouter();

  const handleSignInFormSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const credentials = Object.fromEntries(data);

    try {
      const response = await handleSignIn(credentials);
      toast({ description: "Sign in Success !" });
      router.push("/");
    } catch (error) {
      let description = "Unknown error. Please try again later";
      if (error.message) description = error.message;
      toast({ description });
    }
  };

  return { handleSignInFormSubmit };
}
