import NextAuth, { Account, DefaultSession, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: Account.accessToken;
  }
}

declare module "next-auth" {
  interface User {
    role: String;
    accessToken: String;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: Account.userId;
    };
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: Account.userId;
//     accessToken?: Account.accessToken;
//   }
// }
