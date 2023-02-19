import { SessionProvider, signOut } from "next-auth/react";
import UserProvider from "../../context/user/UserProvider";
import React from "react";
import Splash from "./components/splash.home";
import { useState } from "react";

const Index: React.FC<any> = () => {
  const [isOpen, setIsOpen] = useState<Boolean | null>(false);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <section className="h-96 w-full bg-gradient-to-b from-blue-500 to-blue-300 relative">
          {/* <Splash /> */}
        </section>
        <section className="w-[55%] relative" onClick={() => setIsOpen(true)}>
          <div className="w-full h-[25rem] bg-white absolute -top-14 z-40 drop-shadow-lg rounded-md"></div>
        </section>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Index;
