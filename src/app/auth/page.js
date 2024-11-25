"use client";
import { useState } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Tabs, Tab, Input, Button } from "@nextui-org/react";

import AppLogo from "../../../public/bird.jpg";
import { Eye, EyeClosed } from "lucide-react";

import useAuthFormEvents from "@/hooks/useAuthEvents";

export default function AuthPage() {
  const { handleSignInFormSubmit, register, errors, isLoading } =
    useAuthFormEvents();

  const [isVisible, setIsVisible] = useState(false);

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
                  {...register("email")}
                  errorMessage={errors.email?.message}
                  isInvalid={errors.email}
                />

                <Input
                  label="Password"
                  autoComplete="current-password"
                  variant="bordered"
                  {...register("password")}
                  errorMessage={errors.password?.message}
                  isInvalid={errors.password}
                  endContent={
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => setIsVisible((prev) => !prev)}
                    >
                      {isVisible ? <Eye /> : <EyeClosed />}
                    </Button>
                  }
                  type={isVisible ? "text" : "password"}
                />
                <Button color="primary" type="submit" isLoading={isLoading}>
                  Sign In
                </Button>
              </form>
            </div>
          </Tab>
          <Tab key="sign-up" title="Sign Up" className="p-0">
            <div className="flex flex-col space-y-5 p-0">
              <form className="flex flex-col space-y-5 mt-5 mb-3">
                <Input
                  label="Email"
                  type="email"
                  autoComplete="username"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="bordered"
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  variant="bordered"
                />
                <Button color="primary" type="submit">
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
