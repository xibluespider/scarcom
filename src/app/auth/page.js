"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Tabs, Tab, Input, Button } from "@nextui-org/react";
import AppLogo from "../../../public/bird.jpg";
import { Eye, EyeClosed } from "lucide-react";
import useAuthFormEvents from "@/hooks/useAuthEvents";

export default function AuthPage() {
  const {
    handleSignInFormSubmit,
    handleSignUpFormSubmit,
    signInRegister,
    signUpRegister,
    signInErrors,
    signUpErrors,
    isLoading,
  } = useAuthFormEvents();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const session = useSession();
  if (session.status === "authenticated") return null;

  return (
    <div className="grow flex justify-center items-center">
      <div className="max-w-[400px] grow min-w-[300px] min-h-[450px] p-3">
        <div className="flex space-x-2 items-center m-2">
          <Image
            src={AppLogo}
            alt="app-logo"
            className="max-w-[50px] rounded-large"
          />
          <div className="text-2xl">Scarcom</div>
        </div>
        <Tabs aria-label="Options" fullWidth defaultSelectedKey={"sign-in"}>
          <Tab key="sign-in" title="Sign In" className="p-0">
            <div className="flex flex-col space-y-5 p-0">
              <form
                onSubmit={handleSignInFormSubmit}
                method="post"
                className="flex flex-col space-y-5 mt-5 mb-3"
              >
                <Input
                  label="Email"
                  type="email"
                  autoComplete="username"
                  variant="bordered"
                  {...signInRegister("email")}
                  errorMessage={signInErrors.email?.message}
                  isInvalid={signInErrors.email}
                />
                <Input
                  label="Password"
                  autoComplete="current-password"
                  variant="bordered"
                  {...signInRegister("password")}
                  errorMessage={signInErrors.password?.message}
                  isInvalid={signInErrors.password}
                  endContent={
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                    >
                      {isPasswordVisible ? <Eye /> : <EyeClosed />}
                    </Button>
                  }
                  type={isPasswordVisible ? "text" : "password"}
                />
                <Button color="primary" type="submit" isLoading={isLoading}>
                  Sign In
                </Button>
              </form>
            </div>
          </Tab>

          <Tab key="sign-up" title="Sign Up" className="p-0">
            <div className="flex flex-col space-y-5 p-0">
              <form
                onSubmit={handleSignUpFormSubmit}
                method="post"
                className="flex flex-col space-y-5 mt-5 mb-3"
              >
                <Input
                  label="Email"
                  type="email"
                  autoComplete="username"
                  variant="bordered"
                  {...signUpRegister("email")}
                  errorMessage={signUpErrors.email?.message}
                  isInvalid={signUpErrors.email}
                />
                <Input
                  label="Password"
                  autoComplete="current-password"
                  variant="bordered"
                  {...signUpRegister("password")}
                  errorMessage={signUpErrors.password?.message}
                  isInvalid={signUpErrors.password}
                  endContent={
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                    >
                      {isPasswordVisible ? <Eye /> : <EyeClosed />}
                    </Button>
                  }
                  type={isPasswordVisible ? "text" : "password"}
                />
                <Input
                  label="Confirm Password"
                  autoComplete="current-password"
                  variant="bordered"
                  {...signUpRegister("confirmPassword")}
                  errorMessage={signUpErrors.confirmPassword?.message}
                  isInvalid={signUpErrors.confirmPassword}
                  endContent={
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() =>
                        setIsConfirmPasswordVisible((prev) => !prev)
                      }
                    >
                      {isConfirmPasswordVisible ? <Eye /> : <EyeClosed />}
                    </Button>
                  }
                  type={isConfirmPasswordVisible ? "text" : "password"}
                />
                <Button color="primary" type="submit" isLoading={isLoading}>
                  Sign Up
                </Button>
              </form>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
