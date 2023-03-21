import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { user } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: { secret: process.env.NEXTAUTH_SECRET },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password", placeholder: "Passwrod" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as { username: string; password: string };
        const result = await user.compare(username, password);

        if (result.status && result.user) {
          return { name: result.user.username, email: result.user.email } as any;
        } else return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
