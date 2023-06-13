import { useState, useEffect, createContext } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserContextProps } from "./UserContext";
import { UserContext } from "@/context/user/UserContext";
import { redirect } from "next/dist/server/api-utils";
import { Router, useRouter } from "next/router";
import type { SignInResponse } from "next-auth/react";

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setUser(session.user);
    } else {
      setUser(null);
    }

    setLoading(false);
  }, [session]);
  const login = async (params: any) => {
    const result: SignInResponse | undefined = await signIn("credentials", {
      email: params.email,
      password: params.password,
      redirect: false,
      callbackUrl: session?.user.role === "PENGGUNA" ? "/home" : "/admin",
    });
    if (result?.ok === false) {
      return result;
    } else {
      router.push("/home");
    }
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
