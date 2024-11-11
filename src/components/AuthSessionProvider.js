"use client";

import { useState, createContext, useContext } from "react";

const AuthSessionContext = createContext();

export const AuthSessionProvider = ({ children, isession }) => {
  const [session, setSession] = useState(isession);

  return (
    <AuthSessionContext.Provider value={{ session, setSession }}>
      {children}
    </AuthSessionContext.Provider>
  );
};

export const useAuthSession = () => {
  return useContext(AuthSessionContext);
};
