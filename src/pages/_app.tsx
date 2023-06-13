import UserProvider from "@/context/user/UserProvider";
import Navbar from "@/layouts/navbar";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = useState(Boolean);
  const router = useRouter();
  useEffect(() => {
    setState(window.location.pathname === "/login" ? true : false);
  }, []);
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <UserProvider>
          <Navbar />
          <Component {...pageProps} />;
        </UserProvider>
      </SessionProvider>
    </>
  );
}
