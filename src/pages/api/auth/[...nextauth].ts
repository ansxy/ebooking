/* eslint-disable import/no-anonymous-default-export */
import NextAuth from "next-auth";
import bycrpt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";
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
            include: {
              balance: true,
            },
          });
          if (!user) {
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
            const secret = process.env.NEXTAUTH_SECRET;
            const accessToken = jwt.sign(
              {
                user: {
                  role: user.role,
                  id: user.id,
                  email: user.email,
                },
                exp: Math.floor(Date.now() / 1000) + 60 * 60,
              },
              secret as string
            );
            return {
              accessToken: accessToken,
              email: user.email,
              role: user.role,
              name: user.name,
              id: user.id,
              balance: user.balance?.amount,
            };
          }

          return null;
        } catch (error) {
          return error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && user) {
        token.accessToken = user.accessToken;
        token.role = user?.role;
        token.balance = user.balance;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.balance = token.balance;
      session.user.role = token.role;
      return session;
    },
  },
});