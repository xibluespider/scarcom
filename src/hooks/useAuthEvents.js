import { useState } from "react";

import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import handleSignUp from "@/actions/handleSignUp";
import handleSignIn from "@/actions/handleSignIn";

import { signUpSchema, signInSchema } from "@/lib/zod-schema";

import { useSession, signOut } from "next-auth/react";

export default function useAuthEvents() {
	const { update } = useSession();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register: signUpRegister,
		handleSubmit: signUpHandleSubmit,
		reset,
		formState: { errors: signUpErrors },
	} = useForm({
		resolver: zodResolver(signUpSchema),
	});

	const {
		register: signInRegister,
		handleSubmit: signInHandleSubmit,
		formState: { errors: signInErrors },
	} = useForm({
		resolver: zodResolver(signInSchema),
	});

	const handleSignUpFormSubmit = async (credentials) => {
		setIsLoading((prev) => true);

		let response = null;
		try {
			response = await handleSignUp(credentials);
		} catch (error) {
			toast("Error. Please try again later.");

			setIsLoading((prev) => false);
			return;
		}

		if (response.ok) reset();

		toast(response.message);

		setIsLoading((prev) => false);
	};

	const handleSignInFormSubmit = async (credentials) => {
		setIsLoading((prev) => true);

		let response = null;
		try {
			response = await handleSignIn(credentials);
		} catch (error) {
			toast("Error. Please try again later.");
			setIsLoading((prev) => false);
			return;
		}

		// only incase of failure, response has ok attribute.
		if (!response?.ok) if (response?.message) toast(response.message);

		update();
		setIsLoading((prev) => false);
	};

	const handleSignOutEvent = async (event) => {
		event.preventDefault();
		setIsLoading((prev) => true);

		try {
			await signOut();
		} catch (error) {
			toast("Error. Please try again later");
		}

		setIsLoading((prev) => false);
	};

	return {
		handleSignUpFormSubmit: signUpHandleSubmit(handleSignUpFormSubmit),
		signUpRegister,
		signUpErrors,

		handleSignInFormSubmit: signInHandleSubmit(handleSignInFormSubmit),
		signInRegister,
		signInErrors,

		handleSignOutEvent,

		isLoading,
	};
}
