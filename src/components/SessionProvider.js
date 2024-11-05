"use client";

import { SessionProvider as AuthSessionProvider } from "next-auth/react";

export const SessionProvider = ({ children }) => {
  return (
    <AuthSessionProvider
      refetchOnWindowFocus={false}
      // refetchInterval={0}
      refetchWhenOffline={false}
    >
      {children}
    </AuthSessionProvider>
  );
};
