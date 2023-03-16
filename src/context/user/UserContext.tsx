import { createContext } from "react";

export interface UserContextProps {
  user: any | null;
  loading: boolean;
  login: (params: any) => Promise<void>;
  logout: () => Promise<void>;
}
export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
  login: async () => {},
  logout: async () => {},
});
