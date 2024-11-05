"use client";

import { NextUIProvider } from "@nextui-org/react";

export default function NextArtProvider({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
