import { useState } from "react";

import { signOut, useSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "./use-toast";

import handleSignIn from "@/actions/handleSignIn";

// Zod schema for sign-in validation
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default function useAuthEvents() {
  const { toast } = useToast();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  // Sign-in form submission handler
  const handleSignInFormSubmit = async (credentials) => {
    setIsLoading(true);

    try {
      const response = await handleSignIn(credentials);

      if (!response) update();

      const description = response?.message || "Sign-in successful!";
      toast({ description });
    } catch (error) {
      const description = "Unknown error. Please try again later.";
      toast({ description });
    } finally {
      setIsLoading(false);
    }
  };

  // Sign-out event handler
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

  return {
    handleSignInFormSubmit: handleSubmit(handleSignInFormSubmit),
    register,
    errors,
    isLoading,
    handleSignOutEvent,
  };
}
