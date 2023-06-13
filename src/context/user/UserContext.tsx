import { SignInResponse } from "next-auth/react";
import { createContext } from "react";

export interface UserContextProps {
  user: any | null;
  loading: boolean;
  login: (params: any) => Promise<SignInResponse | void>;
  logout: () => Promise<void>;
}
export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
  login: async () => {},
  logout: async () => {},
});
