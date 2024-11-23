"use client";

import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@nextui-org/react";
import { LogOut } from "lucide-react";

import AppLogo from "../../public/bird.jpg";

export default function Header() {
  const session = useSession();

  if (session.status == "unauthenticated") return null;

  return (
    <div className="flex items-center justify-between px-3 py-2">
      <Link
        href={"/"}
        className="flex items-center space-x-2 hover:underline hover:underline-offset-4"
      >
        <Image
          src={AppLogo}
          alt="app-logo"
          className="max-w-[30px] rounded-lg"
        />
        <div>Scarcom</div>
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          className="hover:underline hover:underline-offset-4"
          href={"/about"}
        >
          About
        </Link>
        <Button size="sm" isIconOnly color="primary" onClick={signOut}>
          <LogOut size={12} color="black" />
        </Button>
      </div>
    </div>
  );
}
