"use client";

import { Tabs, Tab, Input, Button } from "@nextui-org/react";

import Image from "next/image";

import AppLogo from "../../../public/bird.jpg";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-[400px] grow min-w-[300px] min-h-[450px] p-3">
        <div className="flex space-x-2 items-center m-2">
          <Image
            src={AppLogo}
            alt="app-logo"
            className="max-w-[50px] rounded-large"
          />
          <div className="text-2xl grow flex items-center justify-between">
            <div>Scarcom</div>
            <Button isIconOnly color="primary" variant="bordered" size="md">
              ℹ
            </Button>
          </div>
        </div>
        <Tabs aria-label="Options" fullWidth defaultSelectedKey={"sign-in"}>
          <Tab key="sign-in" title="Sign In" className="p-0">
            <div className="flex flex-col space-y-5  p-0">
              <div className="flex flex-col space-y-5 mt-5 mb-3">
                <Input label="Email" variant="bordered" />
                <Input label="Password" variant="bordered" />
                <Button color="primary">Sign In</Button>
              </div>
            </div>
          </Tab>
          <Tab key="sign-up" title="Sign Up" className="p-0">
            <div className="flex flex-col space-y-5  p-0">
              <div className="flex flex-col space-y-5 mt-5 mb-3">
                <Input label="Email" variant="bordered" />
                <Input label="Password" variant="bordered" />
                <Input label="Confirm Password" variant="bordered" />
                <Button color="primary">Sign Up</Button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
