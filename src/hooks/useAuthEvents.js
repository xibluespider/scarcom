import { useState } from "react";

import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import handleSignUp from "@/actions/handleSignUp";

import { signUpSchema } from "@/lib/zod-schema";

export default function useAuthEvents() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: signUpRegister,
    handleSubmit: signUpHandleSubmit,
    reset,
    formState: { errors: signUpErrors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUpFormSubmit = async (credentials) => {
    setIsLoading((prev) => true);

    const response = await handleSignUp(credentials);

    if (response.ok) reset();

    toast(response.message);

    setIsLoading((prev) => false);
  };

  return {
    handleSignUpFormSubmit: signUpHandleSubmit(handleSignUpFormSubmit),
    signUpRegister,
    signUpErrors,
    isLoading,
  };
}
