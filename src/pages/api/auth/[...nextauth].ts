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
    maxAge: 10000,
    // updateAge: 0,
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (account && user) {
        token.accessToken = user.accessToken;
        token.role = user?.role;
      }
      return token;
    },
  },
});

// import { NextAuthOptions } from "next-auth";
// import { NextApiRequest, NextApiResponse } from "next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";
// import NextAuth from "next-auth/next";
// type NextAuthOptionsCallback = (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => NextAuthOptions;

// const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
//   return {
//     providers: [
//       CredentialsProvider({
//         credentials: {
//           email: { label: "Email", type: "text" },
//           password: { label: "Password", type: "password" },
//         },
//         async authorize(credentials) {
//           try {
//             const response = await axios.post(
//               "http://localhost:3000/api/auth/singin",
//               {
//                 email: credentials?.email,
//                 password: credentials?.password,
//               }
//             );
//             const cookies = response.headers["Set-cookie"];
//             console.log(cookies);
//             res.setHeader("Set-Cookie", cookies);
//             return {
//               email: response.data.user.email,
//               role: response.data.user.role,
//               name: response.data.user.name,
//               id: response.data.user.id,
//             };
//           } catch (error) {
//             console.log(error);
//           }
//         },
//       }),
//     ],
//     pages: {
//       signIn: "/login",
//     },
//     jwt: {
//       maxAge: 60 * 60 * 24 * 30,
//       secret: process.env.NEXTAUTH_SECRET,
//     },
//     callbacks: {
//       async jwt({ token, account, user, profile }) {
//         if (account) {
//           token.accessToken = account.access_token;
//           token.role = user?.role;
//         }
//         return token;
//       },
//       async session({ session, user, token }) {
//         session.accessToken = token.accessToken;
//         session.user.id = token.sub;
//         return session;
//       },
//     },
//   };
// };
// export default (req: NextApiRequest, res: NextApiResponse) => {
//   return NextAuth(req, res, nextAuthOptions(req, res));
// };
