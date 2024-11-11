import { signIn } from "next-auth/react";

export function useAuthOperations() {
  const handleSignIn = async (credentials) => {
    console.log("useAuth : handleSignIn invoked");

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

export default function useAuthFormEvents() {
  const { handleSignIn } = useAuthOperations();

  const handleSignInFormSubmit = async (event) => {
    event.preventDefault();

    console.log("handleSignInForm invoked");

    const data = new FormData(event.target);
    const credentials = Object.fromEntries(data);
    console.log(credentials);

    // try {
    //   const response = await handleSignIn(credentials);
    //   console.log("useAuthFormsEvents > handleSignInForm : no error");
    //   console.log(response);
    // } catch (error) {
    //   console.log("useAuthFormsEvents > handleSignInForm : error");
    //   console.log(error);
    // }
  };

  return { handleSignInFormSubmit };
}
