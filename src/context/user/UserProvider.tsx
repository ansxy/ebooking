import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserContext } from "./UserContext";

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();
  console.log(session);
  useEffect(() => {
    if (session) {
      setUser(session.user);
    } else {
      setUser(null);
    }

    setLoading(false);
  }, [session]);

  const login = async () => {
    await signIn();
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
