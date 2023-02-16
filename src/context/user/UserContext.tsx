import { createContext, useContext, useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface UserContextProps {
  user: any | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});
