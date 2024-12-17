"use client";

import { Button } from "@/components/ui/button";

import { useSession } from "next-auth/react";

import useAuthEvents from "@/hooks/useAuthEvents";

export default function Page() {
  const session = useSession();

  const { handleSignOutEvent, isLoading } = useAuthEvents();

  return (
    <div>
      <div>{JSON.stringify(session)}</div>
      <Button onClick={handleSignOutEvent}>
        {isLoading ? "loading" : "sign out"}
      </Button>
    </div>
  );
}
