import NextAuth from "next-auth";
import bycrpt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import { decode, encode } from "next-auth/jwt";
import async from "./signin";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!user) {
            console.log("usertidak ada");
            return null;
          }
          const valid = await bycrpt.compare(
            credentials.password,
            user.password
          );
          if (!valid) {
            return null;
          }
          if (user) {
            return { ...user };
          }
          return null;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sigin",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log(token, account);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
});
