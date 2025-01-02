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

		const response = await handleSignUp(credentials);

		if (response.ok) reset();

		toast(response.message);

		setIsLoading((prev) => false);
	};

	const handleSignInFormSubmit = async (credentials) => {
		setIsLoading((prev) => true);

		const response = await handleSignIn(credentials);

		// only incase of failure, response has ok attribute.
		if (!response?.ok) if (response?.message) toast(response.message);

		update();
		setIsLoading((prev) => false);
	};

	const handleSignOutEvent = async (event) => {
		event.preventDefault();
		setIsLoading((prev) => true);

		const handleSignOutError = (error) => {
			console.log("useAuthEvents/handleSignOutEvent : error caught ");

			const message = "error in signing out. please try again later.";
			toast(message);

			setIsLoading((prev) => false);
		};
		await signOut().catch(handleSignOutError);

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
