"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

export default function NextArtProvider({ children }) {
  const session = useSession();

  if (session.status == "loading") return <Loading />;

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
