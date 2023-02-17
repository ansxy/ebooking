import { SessionProvider } from "next-auth/react";
import React from "react";
import UserProvider from "../../context/user/UserProvider";

const Index: React.FC<any> = () => {
  return (
    <SessionProvider>
      <UserProvider>
        <></>
      </UserProvider>
    </SessionProvider>
  );
};

export default Index;
