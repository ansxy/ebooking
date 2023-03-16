import { useState, useEffect, createContext } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserContextProps } from "./UserContext";
import { UserContext } from "@/context/user/UserContext";

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      setUser(session.user);
    } else {
      setUser(null);
    }

    setLoading(false);
  }, [session]);
  const login = async (params: any) => {
    await signIn("credentials", {
      email: params.email,
      password: params.password,
      callbackUrl: session?.user.role === "PENGGUNA" ? "/home" : "/admin",
    });
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
