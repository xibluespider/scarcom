import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./use-toast";
import handleSignIn from "@/actions/handleSignIn";
import handleSignUp from "@/actions/handleSignUp"; // Assuming you have a sign-up handler

// Zod schema for sign-in
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Zod schema for sign-up
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

export default function useAuthEvents() {
  const { toast } = useToast();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form setup for Sign-In
  const {
    register: signInRegister,
    handleSubmit: signInHandleSubmit,
    formState: { errors: signInErrors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  // React Hook Form setup for Sign-Up
  const {
    register: signUpRegister,
    handleSubmit: signUpHandleSubmit,
    formState: { errors: signUpErrors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
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

  // Sign-up form submission handler
  const handleSignUpFormSubmit = async (credentials) => {
    setIsLoading(true);

    try {
      const response = await handleSignUp(credentials);

      const description = response?.message || "Sign-up successful!";
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
    handleSignInFormSubmit: signInHandleSubmit(handleSignInFormSubmit),
    handleSignUpFormSubmit: signUpHandleSubmit(handleSignUpFormSubmit),
    signInRegister,
    signUpRegister,
    signInErrors,
    signUpErrors,
    isLoading,
    handleSignOutEvent,
  };
}
